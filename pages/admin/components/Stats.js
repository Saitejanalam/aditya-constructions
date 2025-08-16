const Stats = ({ offer, imageUrl, aboutUs }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Home Section Stats */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium">Home Section</p>
            <p className="text-2xl font-bold">{offer || 'Not Set'}</p>
          </div>
          <div className="text-3xl">🏠</div>
        </div>
        <div className="mt-4 text-blue-100 text-sm">
          {imageUrl && imageUrl !== '/nandhaGokulam.png' ? 'Custom Image Set' : 'Default Image'}
        </div>
      </div>

      {/* About Us Stats */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm font-medium">About Us</p>
            <p className="text-lg font-bold">
              {aboutUs.description ? `${aboutUs.description.substring(0, 30)}...` : 'Not Set'}
            </p>
          </div>
          <div className="text-3xl">ℹ️</div>
        </div>
        <div className="mt-4 text-purple-100 text-sm">
          {aboutUs.description ? 'Description Updated' : 'No Description'}
        </div>
      </div>

      {/* System Stats */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm font-medium">System Status</p>
            <p className="text-2xl font-bold">Active</p>
          </div>
          <div className="text-3xl">✅</div>
        </div>
        <div className="mt-4 text-green-100 text-sm">
          All systems operational
        </div>
      </div>
    </div>
  );
};

export default Stats;
