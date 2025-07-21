// pages/login.js
import { useRouter } from 'next/router';
import { useState } from 'react';

const EyeIcon = ({ open }) => (
  open ? (
    <svg height="22" width="22" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="block">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg height="22" width="22" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="block">
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#130cb7] to-[#aa08a4]">
      <div className="bg-white p-10 rounded-2xl shadow-2xl min-w-[540px] flex flex-col items-center">
        <img src="/logo-full.png" alt="Logo" className="w-[420px] mb-6" />
        <h1 className="text-[#003A80] mb-6 text-2xl font-bold tracking-wide">Admin Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full py-3 px-4 mb-4 rounded-lg border border-gray-300 text-base outline-none transition-colors"
        />
        <div className="relative w-full mb-6">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-3 px-4 rounded-lg border border-gray-300 text-base outline-none transition-colors pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-none border-none p-0 m-0 cursor-pointer outline-none h-7 w-7 flex items-center justify-center"
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <EyeIcon open={showPassword} />
          </button>
        </div>
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full bg-gradient-to-r from-[#130cb7] to-[#aa08a4] text-white border-none py-3 rounded-lg font-bold text-lg cursor-pointer shadow-md tracking-wide mb-2 transition-opacity ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <div className="text-red-600 mt-3 font-semibold">{error}</div>}
      </div>
    </div>
  );
};

export default LoginPage;
