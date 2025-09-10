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
  getImageUrl,
  hero,
  newHero,
  setNewHero,
  onBgSelect
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-1 gap-4 text-left">
            <div>
              <div className="text-sm font-medium mb-1">Small Title</div>
              <div className="bg-white/20 rounded-lg px-3 py-2">{hero?.titleSmall || '...'}</div>
            </div>
            <div>
              <div className="text-sm font-medium mb-1">Large Title</div>
              <div className="bg-white/20 rounded-lg px-3 py-2">{hero?.titleLarge || '...'}</div>
            </div>
            <div>
              <div className="text-sm font-medium mb-1">Subtitle</div>
              <div className="bg-white/20 rounded-lg px-3 py-2 line-clamp-2">{hero?.subtitle || '...'}</div>
            </div>
          </div>
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
                className="w-60 h-24 object-cover rounded-lg border-2 border-white" 
              />
            </div>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hero Texts */}
        <div className="grid gap-4">
          <div className="sm:col-span-2">
            <label className="block font-semibold text-gray-700 mb-2">Small Title</label>
            <input
              type="text"
              value={newHero.titleSmall}
              onChange={e => setNewHero(prev => ({ ...prev, titleSmall: e.target.value }))}
              placeholder="DREAM PLOTS/FLOTS/VILLAS"
              className="w-full py-3 px-4 rounded-xl border border-gray-300 text-base focus:ring-2 focus:ring-[#003A80] focus:border-transparent transition-all"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block font-semibold text-gray-700 mb-2">Large Title</label>
            <input
              type="text"
              value={newHero.titleLarge}
              onChange={e => setNewHero(prev => ({ ...prev, titleLarge: e.target.value }))}
              placeholder="FOR SALE"
              className="w-full py-3 px-4 rounded-xl border border-gray-300 text-base focus:ring-2 focus:ring-[#003A80] focus:border-transparent transition-all"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block font-semibold text-gray-700 mb-2">Subtitle</label>
            <input
              type="text"
              value={newHero.subtitle}
              onChange={e => setNewHero(prev => ({ ...prev, subtitle: e.target.value }))}
              placeholder="We Deliver Only excellence and aim to exceed expectations in everything we do."
              className="w-full py-3 px-4 rounded-xl border border-gray-300 text-base focus:ring-2 focus:ring-[#003A80] focus:border-transparent transition-all"
            />
          </div>
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Update Offer</label>
          <div className="relative">
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={newOffer.replace(/%/g, '')}
              onChange={e => {
                const numericValue = e.target.value;
                // Only allow numbers and one decimal point
                if (numericValue === '' || (!isNaN(numericValue) && parseFloat(numericValue) >= 0)) {
                  setNewOffer(numericValue);
                }
              }}
              onBlur={e => {
                const value = e.target.value;
                if (value && !isNaN(value) && parseFloat(value) > 0) {
                  setNewOffer(value + '%');
                }
              }}
              placeholder="Enter percentage"
              className="w-full py-3 px-4 pr-8 rounded-xl border border-gray-300 text-base focus:ring-2 focus:ring-[#003A80] focus:border-transparent transition-all appearance-none"
              inputMode="numeric"
              pattern="[0-9]*"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-gray-500 text-base font-medium">%</span>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Enter a number between 0-100. The % symbol will be added automatically.
          </div>
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

        <div>
          <label className="block font-semibold text-gray-700 mb-2">Upload Background Image</label>
          <input
            type="file"
            accept=".png,.jpg,.jpeg"
            onChange={onBgSelect}
            className="w-full py-3 px-4 rounded-xl border border-gray-300 text-base focus:ring-2 focus:ring-[#003A80] focus:border-transparent transition-all"
          />
          <div className="text-xs text-gray-500 mt-2">This image appears behind the enquiry form.</div>
        </div>
        
        <button 
          type="submit" 
          disabled={loading || uploadLoading} 
          className="w-full bg-gradient-to-r from-[#130cb7] to-[#aa08a4] text-white border-none py-4 rounded-xl font-bold text-lg cursor-pointer disabled:opacity-60 hover:shadow-lg transition-all"
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
