import { useEffect, useState } from 'react';
import withAuth from '../../components/withAuth';

function AdminHomeCMS() {
  const [offer, setOffer] = useState('');
  const [imageUrl, setImageUrl] = useState('/nandhaGokulam.png');
  const [newOffer, setNewOffer] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const apiBase = process.env.NEXT_PUBLIC_BACKEND_URL || '';
  
  // Helper function to get the correct image URL
  const getImageUrl = (url) => {
    if (!url) return '/nandhaGokulam.png';
    if (url.startsWith('http')) return url; // Full URL
    if (url.startsWith('/uploads/')) {
      // For uploaded images, use the backend server URL
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001';
      return `${backendUrl}${url}`;
    }
    return url; // Default image or other relative paths
  };

  // Fetch current offer and image
  useEffect(() => {
    fetch(`${apiBase}/api/home/offer`)
      .then(res => res.json())
      .then(data => {
        setOffer(data.offer || '');
        setImageUrl(data.imageUrl || '/nandhaGokulam.png');
      });
  }, [apiBase]);

  // Handle image upload
  const handleImageUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    if (!validTypes.includes(file.type)) {
      setMessage('Only PNG, JPG, and JPEG files are allowed!');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage('File size must be less than 5MB!');
      return;
    }

    setSelectedFile(file);
    setMessage('');
  };

  // Handle offer and image update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      // If there's a selected file, upload it first
      if (selectedFile) {
        const formData = new FormData();
        formData.append('image', selectedFile);
        
        const uploadRes = await fetch(`${apiBase}/api/home/upload-image`, {
          method: 'POST',
          body: formData
        });
        
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) {
          setMessage(uploadData.error || 'Failed to upload image');
          setLoading(false);
          return;
        }
        
        // Update the image URL with the uploaded image
        setImageUrl(uploadData.imageUrl);
        setSelectedFile(null);
      }

      // Update offer if provided
      if (newOffer && newOffer !== offer) {
        const res = await fetch(`${apiBase}/api/home/offer`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ offer: newOffer })
        });
        const data = await res.json();
        if (res.ok) {
          setOffer(data.offer);
        } else {
          setMessage(data.error || 'Failed to update offer');
          setLoading(false);
          return;
        }
      }

      setMessage('Home section updated successfully!');
      setNewOffer('');
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
        
        {/* Current Values Display */}
        <div className="my-8 p-6 bg-gradient-to-r from-[#130cb7] to-[#aa08a4] text-white rounded-2xl text-center">
          <div className="text-lg font-semibold mb-4">Current Values</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium">Offer</div>
              <div className="text-2xl font-bold text-yellow-400">{offer ? offer : '...'}</div>
            </div>
            <div>
              <div className="text-sm font-medium">Image</div>
                              <div className="text-xs break-all">
                  <img src={getImageUrl(imageUrl)} alt="Image" className="w-100 h-20 object-cover rounded" />
                </div>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="font-medium">Update Offer</label>
            <input
              type="text"
              value={newOffer}
              onChange={e => setNewOffer(e.target.value)}
              placeholder="e.g. 40%"
              className="py-3 px-4 rounded-lg border border-gray-300 text-base w-full mt-1"
            />
          </div>
          
          <div>
            <label className="font-medium">Upload New Image</label>
            <input
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={handleImageUpload}
              className="py-3 px-4 rounded-lg border border-gray-300 text-base w-full mt-1"
            />
            <div className="text-xs text-gray-500 mt-1">
              Only PNG, JPG, and JPEG files are allowed. Max size: 5MB.
            </div>
            {selectedFile && (
              <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-sm text-green-800">
                  Selected: {selectedFile.name}
                </div>
                <div className="text-xs text-green-600">
                  Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </div>
              </div>
            )}
          </div>
          
          <button type="submit" disabled={loading || uploadLoading} className="bg-[#003A80] text-white border-none py-3 rounded-lg font-bold text-base cursor-pointer disabled:opacity-60">
            {loading ? 'Updating...' : 'Update Home Section'}
          </button>
          {message && <div className={`mt-3 ${message.includes('updated') ? 'text-green-600' : 'text-red-600'}`}>{message}</div>}
        </form>
      </div>
    </div>
  );
}

export default withAuth(AdminHomeCMS);
