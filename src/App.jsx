import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import LoginScreen from './components/LoginScreen.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import TeacherPanel from './components/TeacherPanel.jsx';
import StudentView from './components/StudentView.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import MultiLogin from './components/MultiLogin.jsx';
import CreateAccount from './components/CreateAccount.jsx';

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to={`/${user.role}`} replace /> : <Navigate to="/login" replace />} />
      <Route path="/login/:role?" element={<LoginScreen />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route
        path="/admin"
        element={<ProtectedRoute allowedRoles={[ 'admin' ]}><AdminDashboard /></ProtectedRoute>}
      />
      <Route
        path="/teacher"
        element={<ProtectedRoute allowedRoles={[ 'teacher' ]}><TeacherPanel /></ProtectedRoute>}
      />
      <Route path="/teachers" element={<Navigate to="/teacher" replace />} />
      <Route
        path="/student"
        element={<ProtectedRoute allowedRoles={[ 'student' ]}><StudentView /></ProtectedRoute>}
      />
      <Route path="/students" element={<Navigate to="/student" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
