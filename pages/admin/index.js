import { useEffect, useState } from 'react';
import withAuth from '../../components/withAuth';

function AdminHomeCMS() {
  const [offer, setOffer] = useState('');
  const [newOffer, setNewOffer] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || '';

  // Fetch current offer
  useEffect(() => {
    fetch(`${apiBase}/api/home/offer`)
      .then(res => res.json())
      .then(data => setOffer(data.offer || ''));
  }, [apiBase]);

  // Handle offer update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`${apiBase}/api/home/offer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ offer: newOffer })
      });
      const data = await res.json();
      if (res.ok) {
        setOffer(data.offer);
        setMessage('Offer updated!');
        setNewOffer('');
      } else {
        setMessage(data.error || 'Failed to update offer');
      }
    } catch (err) {
      setMessage('Server error');
    }
    setLoading(false);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6fa' }}>
      {/* Navbar */}
      <nav style={{
        width: '100%',
        height: 64,
        background: 'linear-gradient(90deg, #130cb7 0%, #aa08a4 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        boxShadow: '0 2px 8px #0001',
        marginBottom: 32,
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo-full.png" alt="Logo" style={{ height: 40, marginRight: 12 }} />
        </div>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'none',
            border: 'none',
            color: 'white',
            fontWeight: 600,
            fontSize: 16,
            cursor: 'pointer',
            gap: 8,
            padding: 8,
          }}
        >
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Logout
        </button>
      </nav>

      {/* Home Section Card */}
      <div style={{ maxWidth: 500, margin: '2rem auto', padding: 24, background: '#f9f9f9', borderRadius: 16, boxShadow: '0 2px 8px #0001' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#003A80', textAlign: 'left', flex: 1 }}>Home Section</div>
        </div>
        <div style={{ margin: '2rem 0', padding: 24, background: 'linear-gradient(to right, #130cb7, #aa08a4)', color: 'white', borderRadius: 16, textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Current Offer</div>
          <div style={{ fontSize: 32, fontWeight: 'bold', color: '#FFD700', margin: '1rem 0' }}>{offer ? offer : '...'}</div>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <label style={{ fontWeight: 500 }}>Update Offer</label>
          <input
            type="text"
            value={newOffer}
            onChange={e => setNewOffer(e.target.value)}
            placeholder="e.g. 40%"
            style={{ padding: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }}
            required
          />
          <button type="submit" disabled={loading} style={{ background: '#003A80', color: 'white', border: 'none', padding: 12, borderRadius: 8, fontWeight: 'bold', fontSize: 16, cursor: 'pointer' }}>
            {loading ? 'Updating...' : 'Update Offer'}
          </button>
          {message && <div style={{ marginTop: 12, color: message.includes('updated') ? 'green' : 'red' }}>{message}</div>}
        </form>
      </div>
    </div>
  );
}

export default withAuth(AdminHomeCMS);
