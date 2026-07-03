import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import useFormFields from '../hooks/useFormFields.js';
import schoolHallway from '../school_hallway.png';
import logo from '../st_michaels_crest.png';

export default function LoginScreen() {
  const navigate = useNavigate();
  const { role: routeRole } = useParams();
  const { user, signIn } = useAuth();

  useEffect(() => {
    if (user) {
      navigate(`/${user.role}`, { replace: true });
    }
  }, [user, navigate]);
  const { fields, handleChange } = useFormFields({ userId: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [mode, setMode] = useState(routeRole || 'student');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (routeRole) setMode(routeRole);
  }, [routeRole]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const user = await signIn({ userId: fields.userId, password: fields.password, role: mode });
      navigate(`/${user.role}`, { replace: true });
    } catch (err) {
      setError(err.message || 'Incorrect username or password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page-container" style={{ backgroundImage: `url(${schoolHallway})` }}>
      {/* Top Header */}
      <header className="login-header">
        <div className="login-header-left">
          <img src={logo} alt="St. Michael's School Logo" className="login-logo" />
          <span className="login-school-name">ST. MICHAEL'S SCHOOL</span>
        </div>
        <div className="login-header-right">
          <h2 className="login-portal-title">SCHOOL PORTAL</h2>
          <div className="login-header-links">
            <a href="#about" style={{ color: '#123e72', textDecoration: 'none' }}>About</a>
            <span>|</span>
            <a href="#contact" style={{ color: '#123e72', textDecoration: 'none' }}>Contact</a>
          </div>
        </div>
      </header>

      {/* Main Login Card */}
      <div className="login-card">
        <h1 className="login-card-title">LOGIN TO YOUR PORTAL</h1>
        
        <form onSubmit={handleSubmit}>
          {/* Username / ID */}
          <div className="login-field-group">
            <label className="login-label" htmlFor="userId">USERNAME / ID</label>
            <div className="login-input-wrapper">
              <svg className="login-input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <input
                id="userId"
                name="userId"
                value={fields.userId}
                onChange={handleChange}
                placeholder="Enter your assigned ID..."
                required
                className="login-input"
              />
            </div>
          </div>

          {/* Password */}
          <div className="login-field-group">
            <label className="login-label" htmlFor="password">PASSWORD</label>
            <div className="login-input-wrapper">
              <svg className="login-input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={fields.password}
                onChange={handleChange}
                placeholder="Enter your password..."
                required
                className="login-input"
              />
              <button
                type="button"
                className="login-input-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Options: Remember Me & Forgot Password */}
          <div className="login-options-row">
            <label className="login-remember-me">
              <input type="checkbox" className="login-checkbox" />
              REMEMBER ME
            </label>
            <a href="#forgot" className="login-forgot-link">Forgot Password?</a>
          </div>

          {/* Role selector (Radio Buttons) */}
          <div className="login-role-row">
            <label className="login-role-option">
              <input
                type="radio"
                name="role"
                value="student"
                checked={mode === 'student'}
                onChange={() => setMode('student')}
                className="login-hidden-radio"
              />
              <span className="login-radio-circle">
                <span className="login-radio-inner"></span>
              </span>
              Login as Student
            </label>

            <label className="login-role-option">
              <input
                type="radio"
                name="role"
                value="teacher"
                checked={mode === 'teacher'}
                onChange={() => setMode('teacher')}
                className="login-hidden-radio"
              />
              <span className="login-radio-circle">
                <span className="login-radio-inner"></span>
              </span>
              Login as Teacher
            </label>

            <label className="login-role-option">
              <input
                type="radio"
                name="role"
                value="admin"
                checked={mode === 'admin'}
                onChange={() => setMode('admin')}
                className="login-hidden-radio"
              />
              <span className="login-radio-circle">
                <span className="login-radio-inner"></span>
              </span>
              Login as Admin
            </label>
          </div>

          {/* Submit Button */}
          <button className="login-submit-btn" type="submit" disabled={submitting}>
            {submitting ? 'SIGNING IN...' : 'SIGN IN'}
            <span className="login-submit-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </span>
          </button>

          {error && <div style={{ color: '#ef4444', marginTop: 14, textAlign: 'center', fontWeight: 600, fontSize: 13 }}>{error}</div>}
        </form>

        {/* Footer info */}
        <div className="login-card-footer">
          <div className="login-footer-help">
            Need help? <a href="#contact" className="login-footer-link">Contact Admin</a>
            {' | '}
            <span style={{ cursor: 'pointer' }} className="login-footer-link" onClick={() => navigate('/create-account')}>Create Account</span>
          </div>
          <div className="login-version">Version 1.2</div>
        </div>
      </div>
    </div>
  );
}
