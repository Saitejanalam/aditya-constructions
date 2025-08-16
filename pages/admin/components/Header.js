const Header = ({ onLogout }) => {
  return (
    <nav className="w-full h-20 bg-gradient-to-r from-[#130cb7] to-[#aa08a4] flex items-center justify-between px-8 shadow-lg mb-8">
      <div className="flex items-center">
        <img src="/logo-full.png" alt="Logo" className="h-12 mr-4" />
        <div>
          <h1 className="text-white text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-white/80 text-sm">Content Management System</p>
        </div>
      </div>
      <button
        onClick={onLogout}
        className="flex items-center bg-white/10 hover:bg-white/20 text-white font-semibold text-base cursor-pointer gap-3 p-3 rounded-xl transition-all"
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16 17 21 12 16 7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
        Logout
      </button>
    </nav>
  );
};

export default Header;
