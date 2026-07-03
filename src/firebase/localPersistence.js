const readLocal = (key, fallback) => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const writeLocal = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage errors
  }
};

export const LOCAL_USERS_KEY = 'schoolAppLocalUsers';
export const LOCAL_RESULTS_KEY = 'schoolAppLocalResults';

const defaultLocalUsers = {
  'demo-student': { userId: 'demo-student', name: 'Demo Student', password: 'demo', role: 'student' },
  'demo-teacher': { userId: 'demo-teacher', name: 'Demo Teacher', password: 'demo', role: 'teacher' },
};

export const getLocalUsers = () => readLocal(LOCAL_USERS_KEY, { ...defaultLocalUsers });
export const saveLocalUsers = (users) => writeLocal(LOCAL_USERS_KEY, users);

export const getLocalResults = () => readLocal(LOCAL_RESULTS_KEY, {});
export const saveLocalResults = (results) => writeLocal(LOCAL_RESULTS_KEY, results);
