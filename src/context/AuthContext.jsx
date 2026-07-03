import { createContext, useContext, useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase.js';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);
const LOCAL_USERS_KEY = 'schoolAppLocalUsers';
const CURRENT_USER_KEY = 'schoolAppCurrentUser';

const defaultLocalUsers = {
  'demo-student': { userId: 'demo-student', name: 'Demo Student', password: 'demo', role: 'student' },
  'demo-teacher': { userId: 'demo-teacher', name: 'Demo Teacher', password: 'demo', role: 'teacher' },
  'admin': { userId: 'admin', name: 'Admin Administrator', password: 'admin', role: 'admin' },
};

const loadLocalUsers = () => {
  try {
    const raw = window.localStorage.getItem(LOCAL_USERS_KEY);
    return raw ? JSON.parse(raw) : { ...defaultLocalUsers };
  } catch {
    return { ...defaultLocalUsers };
  }
};

const saveLocalUsers = (users) => {
  try {
    window.localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
  } catch {
    // ignore
  }
};

const loadCurrentUser = () => {
  try {
    const raw = window.localStorage.getItem(CURRENT_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const saveCurrentUser = (user) => {
  try {
    if (user) {
      window.localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(CURRENT_USER_KEY);
    }
  } catch {
    // ignore
  }
};

const getLocalUser = (userId) => {
  const users = loadLocalUsers();
  return users[userId] || null;
};

const isFirestoreOfflineError = (err) => {
  const message = String(err?.message || '').toLowerCase();
  const code = String(err?.code || '').toLowerCase();
  return (
    message.includes('client is offline') ||
    message.includes('failed to get document') ||
    message.includes('offline') ||
    code.includes('unavailable') ||
    code.includes('failed-precondition') ||
    code.includes('offline')
  );
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadCurrentUser());
  const [loading] = useState(false);  // localStorage is sync — no delay needed
  const [localUsers, setLocalUsers] = useState(loadLocalUsers());
  const navigate = useNavigate();

  const persistLocalUsers = (nextUsers) => {
    setLocalUsers(nextUsers);
    saveLocalUsers(nextUsers);
  };

  const signIn = async ({ userId, password, role = 'teacher' }) => {
    const trimmedUserId = String(userId || '').trim();
    const trimmedPassword = String(password || '').trim();
    const normalizedRole = String(role || '').trim();

    const localUser = getLocalUser(trimmedUserId);

    if (!localUser) {
      throw new Error('Incorrect username or password.');
    }

    if (String(localUser.password || '') !== trimmedPassword) {
      throw new Error('Incorrect username or password.');
    }

    if (normalizedRole && normalizedRole !== String(localUser.role || '').trim()) {
      throw new Error('Selected login role does not match the account role.');
    }

    const nextUser = {
      userId: localUser.userId,
      name: localUser.name,
      role: localUser.role,
    };

    setUser(nextUser);
    saveCurrentUser(nextUser);

    // Sync with Firestore in the background (non-blocking)
    const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
    if (isOnline) {
      getDoc(doc(db, 'users', trimmedUserId))
        .then((userDoc) => {
          if (userDoc.exists()) {
            const data = userDoc.data();
            const synced = { userId: data.userId, name: data.name, role: data.role };
            setUser(synced);
            saveCurrentUser(synced);
          }
        })
        .catch(() => { /* ignore offline / network errors */ });
    }

    return nextUser;
  };

  // Demo sign-in for local/demo usage (bypasses Firestore)
  const signInDemo = async ({ role }) => {
    const demoUser = {
      userId: role === 'student' ? 'demo-student' : 'demo-teacher',
      name: role === 'student' ? 'Demo Student' : 'Demo Teacher',
      role,
    };
    setUser(demoUser);
    saveCurrentUser(demoUser);
    return demoUser;
  };

  const signOut = () => {
    setUser(null);
    saveCurrentUser(null);
    navigate('/login', { replace: true });
  };

  const createUser = async ({ userId, name, password, role }) => {
    const normalizedUserId = String(userId || '').trim();
    const normalizedName = String(name || '').trim();
    const normalizedPassword = String(password || '').trim();
    const normalizedRole = String(role || 'student').trim();

    if (!normalizedUserId || !normalizedName || !normalizedPassword) {
      throw new Error('Please fill in all required fields.');
    }

    const latestUsers = loadLocalUsers();
    const existingUserKey = Object.keys(latestUsers).find(key => key.toLowerCase() === normalizedUserId.toLowerCase());
    if (existingUserKey) {
      throw new Error(`User ID "${normalizedUserId}" already exists.`);
    }

    const newUser = {
      userId: normalizedUserId,
      name: normalizedName,
      password: normalizedPassword,
      role: normalizedRole,
    };

    const nextUsers = {
      ...latestUsers,
      [normalizedUserId]: newUser,
    };
    persistLocalUsers(nextUsers);

    try {
      const userRef = doc(db, 'users', normalizedUserId);
      await setDoc(userRef, newUser);
    } catch (err) {
      if (isFirestoreOfflineError(err)) {
        console.warn('Firestore offline — saved account locally only.');
      } else {
        throw err;
      }
    }

    return { userId: normalizedUserId, name: normalizedName, role: normalizedRole };
  };

  const deleteUser = async (userId) => {
    const trimmedUserId = String(userId || '').trim();
    if (!trimmedUserId) return false;

    const currentUsers = loadLocalUsers();
    if (!currentUsers[trimmedUserId]) return false;

    const nextUsers = { ...currentUsers };
    delete nextUsers[trimmedUserId];
    persistLocalUsers(nextUsers);

    if (user?.userId === trimmedUserId) {
      setUser(null);
      saveCurrentUser(null);
    }

    try {
      await deleteDoc(doc(db, 'users', trimmedUserId));
    } catch (err) {
      if (!isFirestoreOfflineError(err)) {
        console.warn('Could not remove Firestore account:', err);
      }
    }

    return true;
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signInDemo, signOut, createUser, deleteUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
