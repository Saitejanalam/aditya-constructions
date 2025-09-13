import { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';

const Home = () => {
  const [offer, setOffer] = useState('');
  const [imageUrl, setImageUrl] = useState('/nandhaGokulam.png');
  const [hero, setHero] = useState({
    titleSmall: 'DREAM PLOTS/FLOTS/VILLAS',
    titleLarge: 'FOR SALE',
    subtitle: 'We Deliver Only excellence and aim to exceed expectations in everything we do.'
  });
  const [homeBackgroundUrl, setHomeBackgroundUrl] = useState('/home-bg-h.png');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
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

  const isDefaultImage = (url) => {
    if (!url) return true;
    return url === '/nandhaGokulam.png' || (typeof url === 'string' && url.endsWith('/nandhaGokulam.png'));
  };

  // EmailJS configuration (dummy credentials - replace with your actual values)
  const EMAILJS_SERVICE_ID = 'service_abc123';
  const EMAILJS_TEMPLATE_ID = 'template_xyz789';
  const EMAILJS_PUBLIC_KEY = 'user_public_key_123';

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setSubmitMessage('Please fill in all required fields');
      setTimeout(() => setSubmitMessage(''), 5000);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitMessage('Please enter a valid email address');
      setTimeout(() => setSubmitMessage(''), 5000);
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone_number: formData.phone,
        message: formData.message,
        to_email: 'phanitech2020@gmail.com',
        company_name: 'Sri Aditya Developers'
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      if (response.status === 200) {
        setSubmitMessage('Thank you! Your enquiry has been sent successfully.');
        setFormData({ name: '', phone: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitMessage('Sorry, there was an error sending your enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(''), 5000);
    }
  };

  useEffect(() => {
    fetch(`${apiBase}/api/home/offer`)
      .then(res => res.json())
      .then(data => {
        setOffer(data.offer || '');
        setImageUrl(data.imageUrl || '/nandhaGokulam.png');
        if (data.homeBackgroundUrl) setHomeBackgroundUrl(data.homeBackgroundUrl);
        if (data.hero) setHero(data.hero);
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
        className="relative flex flex-nowrap gap-8 justify-between items-stretch w-full px-8 text-center "
      >
        {/* Background overlay for opacity/blur */}
        <div className="absolute inset-0 backdrop-blur-[2px] z-0" />

        {/* Left Section */}
        <div className="relative z-10 flex-1 min-w-[300px] flex flex-col justify-center">
          <h2 className="text-[#003A80] text-3xl mb-2 font-semibold">{hero.titleSmall}</h2>
          <h1 className="text-[#003A80] text-5xl font-bold mb-4">{hero.titleLarge}</h1>
          <p className="text-base text-[#333] mb-8">{hero.subtitle}</p>

          {/* Offer Card */}
          <div className="bg-gradient-to-r from-[#130cb7] to-[#aa08a4] text-white rounded-2xl flex items-center p-6 gap-6 w-fit self-center">
            <div className="font-semibold">
              <div className="text-base">Best Offer</div>
              <div className="text-2xl font-bold text-yellow-400">{offer ? offer : '...'} OFF</div>
              <div className="text-base">This Month</div>
            </div>
            <div className="p-2 relative">
              {isDefaultImage(imageUrl) && (
                <div className="absolute -top-2 -left-2 bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-md shadow-sm">
                  Default image
                </div>
              )}
              <img
                src={getImageUrl(imageUrl)}
                alt="Nanda Gokulam"
                className="w-40 block rounded-[10px]"
                onError={(e) => {
                  e.target.src = '/nandhaGokulam.png';
                }}
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative z-10 flex-1 min-w-[300px] flex justify-center items-center rounded-2xl bg-cover bg-center overflow-hidden"
          style={{ backgroundImage: `url(${getImageUrl(homeBackgroundUrl)})` }}
        >
          <div className="bg-white/80 p-8 rounded-2xl shadow-lg backdrop-blur-sm border border-dashed border-[#333] max-w-[400px] w-full">
            <h3 className="text-[#003A80] mb-4 text-xl font-bold text-center">ENQUIRY FORM</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name *" 
                className={inputStyle}
                required
              />
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number *" 
                className={inputStyle}
                required
              />
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address *" 
                className={inputStyle}
                required
              />
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Message" 
                rows={3} 
                className={inputStyle + ' resize-none'} 
              />
              
              {submitMessage && (
                <div className={`p-3 rounded-lg text-center text-sm font-medium ${
                  submitMessage.includes('successfully') || submitMessage.includes('Thank you')
                    ? 'bg-green-100 text-green-800 border border-green-200'
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  {submitMessage}
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gray-700 hover:bg-gray-800'
                } text-white border-none py-3 rounded-lg cursor-pointer font-bold text-base w-[100px] mx-auto transition-colors`}
              >
                {isSubmitting ? 'Sending...' : 'Submit'}
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
