import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function RedirectNotice({ to, message }) {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate(to, { replace: true }), 350);
    return () => clearTimeout(timer);
  }, [navigate, to]);

  return (
    <div className="page-shell">
      <div className="page-shell-card">
        <p>{message}</p>
        <small>Redirecting you to the login page...</small>
      </div>
    </div>
  );
}

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="page-shell">
        <div className="page-shell-card">
          <p>Checking access…</p>
          <small>Loading your portal.</small>
        </div>
      </div>
    );
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return (
      <RedirectNotice
        to="/login"
        message="You must be signed in with the correct role to view this page."
      />
    );
  }

  return children;
}
