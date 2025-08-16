import { useEffect, useState } from 'react';

const Home = () => {
  const [offer, setOffer] = useState('');
  const [imageUrl, setImageUrl] = useState('/nandhaGokulam.png');
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

  useEffect(() => {
    fetch(`${apiBase}/api/home/offer`)
      .then(res => res.json())
      .then(data => {
        setOffer(data.offer || '');
        setImageUrl(data.imageUrl || '/nandhaGokulam.png');
      });
  }, [apiBase]);

  return (
    <section>
      <img
        src="/logo-full.png"
        alt="Sri Aditya Developers Logo"
        className="w-[300px]"
      />

      <div
        className="relative flex flex-nowrap gap-8 justify-between items-stretch w-full px-8 text-center bg-[url('/home-bg.png')] bg-cover bg-center overflow-hidden"
      >
        {/* Background overlay for opacity/blur */}
        <div className="absolute inset-0 backdrop-blur-[2px] z-0" />

        {/* Left Section */}
        <div className="relative z-10 flex-1 min-w-[300px] flex flex-col justify-center">
          <h2 className="text-[#003A80] text-3xl mb-2 font-semibold">DREAM PLOTS/FLOTS/VILLAS</h2>
          <h1 className="text-[#003A80] text-5xl font-bold mb-4">FOR SALE</h1>
          <p className="text-base text-[#333] mb-8">
            We Deliver Only excellence and aim to exceed expectations in everything we do.
          </p>

          {/* Offer Card */}
          <div className="bg-gradient-to-r from-[#130cb7] to-[#aa08a4] text-white rounded-2xl flex items-center p-6 gap-6 w-fit self-center">
            <div className="font-semibold">
              <div className="text-base">Best Offer</div>
              <div className="text-2xl font-bold text-yellow-400">{offer ? offer : '...'} OFF</div>
              <div className="text-base">This Month</div>
            </div>
            <div className="bg-white rounded-xl p-2">
              <img
                src={getImageUrl(imageUrl)}
                alt="Nanda Gokulam"
                className="w-40 block"
                onError={(e) => {
                  e.target.src = '/nandhaGokulam.png';
                }}
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative z-10 flex-1 min-w-[300px] flex justify-center items-center rounded-2xl">
          <div className="bg-white/80 p-8 rounded-2xl shadow-lg backdrop-blur-sm border border-dashed border-[#333] max-w-[400px] w-full">
            <h3 className="text-[#003A80] mb-4 text-xl font-bold text-center">ENQUIRY FORM</h3>
            <form className="flex flex-col gap-4">
              <input type="text" placeholder="Name" className={inputStyle} />
              <input type="text" placeholder="Phone Number" className={inputStyle} />
              <input type="email" placeholder="Email Address" className={inputStyle} />
              <textarea placeholder="Message" rows={3} className={inputStyle + ' resize-none'} />
              <button
                type="submit"
                className="bg-gray-700 text-white border-none py-3 rounded-lg cursor-pointer font-bold text-base w-[100px] mx-auto"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const inputStyle =
  "py-3 px-4 rounded-lg border border-gray-300 text-base w-full";

export default Home;
