const AboutUsSection = ({ 
  aboutUs, 
  newAboutUs, 
  setNewAboutUs, 
  loading, 
  message, 
  onUpdate 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center mb-6">
        <div className="text-2xl font-bold text-[#003A80] flex-1">ℹ️ About Us Section</div>
        <div className="text-sm text-gray-500">Manage company information</div>
      </div>
      
      {/* Current Values Display */}
      <div className="mb-8 p-6 bg-gradient-to-r from-[#130cb7] to-[#aa08a4] text-white rounded-2xl">
        <div className="text-lg font-semibold mb-4 text-center">Current Values</div>
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-sm font-medium mb-2">Current Description</div>
            <div className="text-sm max-h-32 overflow-y-auto bg-white/20 p-3 rounded-lg">
              {aboutUs.description || 'No description set'}
            </div>
          </div>
        </div>
      </div>
      
      <form onSubmit={onUpdate} className="space-y-6">
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Update Description</label>
          <textarea
            value={newAboutUs.description}
            onChange={e => setNewAboutUs(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Enter company description..."
            rows={6}
            className="w-full py-3 px-4 rounded-xl border border-gray-300 text-base focus:ring-2 focus:ring-[#003A80] focus:border-transparent transition-all resize-none"
          />
          <div className="text-xs text-gray-500 mt-2">
            Update the company description that appears in the About Us section
          </div>
        </div>
        
        <button 
          type="submit" 
          disabled={loading} 
          className="w-full bg-gradient-to-r from-[#003A80] to-[#130cb7] text-white border-none py-4 rounded-xl font-bold text-lg cursor-pointer disabled:opacity-60 hover:shadow-lg transition-all"
        >
          {loading ? '🔄 Updating...' : '💾 Update About Us Section'}
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

export default AboutUsSection;
