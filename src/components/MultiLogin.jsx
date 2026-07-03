import { useNavigate } from 'react-router-dom';

export default function MultiLogin() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#071024', color: '#e6eef8' }}>
      <div style={{ width: 980, display: 'flex', gap: 24 }}>
        <div style={{ flex: 1, padding: 28, borderRadius: 20, background: '#08263a' }}>
          <h2 style={{ fontSize: 22, marginBottom: 12 }}>Login As Student</h2>
          <p style={{ opacity: 0.8 }}>Access the student portal.</p>
          <button style={{ marginTop: 24, padding: '10px 16px', borderRadius: 12, background: '#06b6d4', color: '#042027', fontWeight: 700 }} onClick={() => navigate('/login/student')}>Login As Student</button>
        </div>

        <div style={{ flex: 1, padding: 28, borderRadius: 20, background: '#08263a' }}>
          <h2 style={{ fontSize: 22, marginBottom: 12 }}>Login As Teacher</h2>
          <p style={{ opacity: 0.8 }}>Access the teacher panel.</p>
          <button style={{ marginTop: 24, padding: '10px 16px', borderRadius: 12, background: '#06b6d4', color: '#042027', fontWeight: 700 }} onClick={() => navigate('/login/teacher')}>Login As Teacher</button>
        </div>

        <div style={{ width: 300, padding: 28, borderRadius: 20, background: '#06202d' }}>
          <h2 style={{ fontSize: 20, marginBottom: 12 }}>Create Account</h2>
          <p style={{ opacity: 0.8 }}>Register new users (admin only via Firestore in production).</p>
          <button style={{ marginTop: 24, padding: '10px 16px', borderRadius: 12, background: '#10b981', color: '#042027', fontWeight: 700 }} onClick={() => navigate('/create-account')}>Create Account</button>
        </div>
      </div>
    </div>
  );
}
