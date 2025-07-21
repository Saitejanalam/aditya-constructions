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
    <div className="min-h-screen bg-[#f4f6fa]">
      {/* Navbar */}
      <nav className="w-full h-16 bg-gradient-to-r from-[#130cb7] to-[#aa08a4] flex items-center justify-between px-8 shadow-md mb-8">
        <div className="flex items-center">
          <img src="/logo-full.png" alt="Logo" className="h-10 mr-3" />
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center bg-none border-none text-white font-semibold text-base cursor-pointer gap-2 p-2 hover:opacity-80"
        >
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Logout
        </button>
      </nav>

      {/* Home Section Card */}
      <div className="max-w-lg mx-auto p-6 bg-[#f9f9f9] rounded-2xl shadow-md">
        <div className="flex items-center mb-4">
          <div className="text-2xl font-bold text-[#003A80] text-left flex-1">Home Section</div>
        </div>
        <div className="my-8 p-6 bg-gradient-to-r from-[#130cb7] to-[#aa08a4] text-white rounded-2xl text-center">
          <div className="text-lg font-semibold">Current Offer</div>
          <div className="text-3xl font-bold text-yellow-400 my-4">{offer ? offer : '...'}</div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="font-medium">Update Offer</label>
          <input
            type="text"
            value={newOffer}
            onChange={e => setNewOffer(e.target.value)}
            placeholder="e.g. 40%"
            className="py-3 px-4 rounded-lg border border-gray-300 text-base w-full"
            required
          />
          <button type="submit" disabled={loading} className="bg-[#003A80] text-white border-none py-3 rounded-lg font-bold text-base cursor-pointer disabled:opacity-60">
            {loading ? 'Updating...' : 'Update Offer'}
          </button>
          {message && <div className={`mt-3 ${message.includes('updated') ? 'text-green-600' : 'text-red-600'}`}>{message}</div>}
        </form>
      </div>
    </div>
  );
}

export default withAuth(AdminHomeCMS);
