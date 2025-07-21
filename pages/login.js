// pages/login.js
import { useRouter } from 'next/router';
import { useState } from 'react';

const EyeIcon = ({ open }) => (
  open ? (
    <svg height="22" width="22" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg height="22" width="22" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.81 21.81 0 0 1 5.06-6.06"/>
      <path d="M1 1l22 22"/>
      <path d="M9.53 9.53A3 3 0 0 0 12 15a3 3 0 0 0 2.47-5.47"/>
    </svg>
  )
);

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || '';

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${apiBase}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('authToken', 'dummy-token'); // In real apps, use JWT
        router.push('/admin');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Server error');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(120deg, #130cb7 0%, #aa08a4 100%)',
    }}>
      <div style={{
        background: '#fff',
        padding: '2.5rem 2rem',
        borderRadius: 16,
        boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
        minWidth: 540,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <img src="/logo-full.png" alt="Logo" style={{ width: 420, marginBottom: 24 }} />
        <h1 style={{ color: '#003A80', marginBottom: 24, fontSize: 28, fontWeight: 700, letterSpacing: 1 }}>Admin Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '0.9rem',
            marginBottom: 18,
            borderRadius: 8,
            border: '1px solid #ccc',
            fontSize: 16,
            outline: 'none',
            transition: 'border 0.2s',
          }}
        />
        <div style={{ position: 'relative', width: '100%', marginBottom: 24 }}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '0.9rem',
              borderRadius: 8,
              border: '1px solid #ccc',
              fontSize: 16,
              outline: 'none',
              transition: 'border 0.2s',
              paddingRight: 40,
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            style={{
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              padding: 0,
              margin: 0,
              cursor: 'pointer',
              outline: 'none',
              height: 28,
              width: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <EyeIcon open={showPassword} />
          </button>
        </div>
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: '100%',
            background: 'linear-gradient(90deg, #130cb7 0%, #aa08a4 100%)',
            color: 'white',
            border: 'none',
            padding: '0.9rem',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 18,
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 2px 8px #0002',
            letterSpacing: 1,
            marginBottom: 8,
            transition: 'background 0.2s',
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <div style={{ color: 'red', marginTop: 12, fontWeight: 500 }}>{error}</div>}
      </div>
    </div>
  );
};

export default LoginPage;
