import { useState } from 'react';

const HomeSection = ({ 
  offer, 
  imageUrl, 
  newOffer, 
  setNewOffer, 
  selectedFile, 
  setSelectedFile, 
  loading, 
  uploadLoading, 
  message, 
  onUpdate, 
  getImageUrl 
}) => {
  const [localSelectedFile, setLocalSelectedFile] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e?.target?.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    if (!validTypes.includes(file.type)) {
      return 'Only PNG, JPG, and JPEG files are allowed!';
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return 'File size must be less than 5MB!';
    }

    setLocalSelectedFile(file);
    setSelectedFile(file);
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = await handleImageUpload(e);
    if (error) {
      return error;
    }
    onUpdate();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center mb-6">
        <div className="text-2xl font-bold text-[#003A80] flex-1">🏠 Home Section</div>
        <div className="text-sm text-gray-500">Manage promotional content</div>
      </div>
      
      {/* Current Values Display */}
      <div className="mb-8 p-6 bg-gradient-to-r from-[#130cb7] to-[#aa08a4] text-white rounded-2xl">
        <div className="text-lg font-semibold mb-4 text-center">Current Values</div>
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-sm font-medium mb-2">Current Offer</div>
            <div className="text-3xl font-bold text-yellow-400">{offer || '...'}</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium mb-2">Current Image</div>
            <div className="flex justify-center">
              <img 
                src={getImageUrl(imageUrl)} 
                alt="Current" 
                className="w-24 h-24 object-cover rounded-lg border-2 border-white" 
              />
            </div>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Update Offer</label>
          <input
            type="text"
            value={newOffer}
            onChange={e => setNewOffer(e.target.value)}
            placeholder="e.g. 40% OFF"
            className="w-full py-3 px-4 rounded-xl border border-gray-300 text-base focus:ring-2 focus:ring-[#003A80] focus:border-transparent transition-all"
          />
        </div>
        
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Upload New Image</label>
          <input
            type="file"
            accept=".png,.jpg,.jpeg"
            onChange={handleImageUpload}
            className="w-full py-3 px-4 rounded-xl border border-gray-300 text-base focus:ring-2 focus:ring-[#003A80] focus:border-transparent transition-all"
          />
          <div className="text-xs text-gray-500 mt-2">
            Only PNG, JPG, and JPEG files are allowed. Max size: 5MB.
          </div>
          {localSelectedFile && (
            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="text-sm text-green-800 font-medium">
                Selected: {localSelectedFile.name}
              </div>
              <div className="text-xs text-green-600">
                Size: {(localSelectedFile.size / 1024 / 1024).toFixed(2)} MB
              </div>
            </div>
          )}
        </div>
        
        <button 
          type="submit" 
          disabled={loading || uploadLoading} 
          className="w-full bg-gradient-to-r from-[#003A80] to-[#130cb7] text-white border-none py-4 rounded-xl font-bold text-lg cursor-pointer disabled:opacity-60 hover:shadow-lg transition-all"
        >
          {loading ? '🔄 Updating...' : '💾 Update Home Section'}
        </button>
        
        {message && (
          <div className={`mt-4 p-3 rounded-lg text-center font-medium ${
            message.includes('successfully') || message.includes('updated') 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default HomeSection;
