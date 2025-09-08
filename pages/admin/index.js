import { useEffect, useState } from 'react';
import withAuth from '../../components/withAuth';
import Header from './components/Header';
import Stats from './components/Stats';
import HomeSection from './components/HomeSection';
import AboutUsSection from './components/AboutUsSection';
import ProjectsSection from './components/ProjectsSection';

function AdminHomeCMS() {
  const [offer, setOffer] = useState('');
  const [imageUrl, setImageUrl] = useState('/nandhaGokulam.png');
  const [aboutUs, setAboutUs] = useState({
    description: 'Sri Aditya Developers, the leading developers in Andhra Pradesh & Telangana, was founded in 2010 at Kakinada E.G by Satish (Managing Director). Sri Aditya Developers has started its journey with the aim of providing excellent services to all the customers approaching our ventures. Thus we have completed a number of challenging projects successfully with full commitment.'
  });
  const [newOffer, setNewOffer] = useState('');
  const [newAboutUs, setNewAboutUs] = useState({
    description: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [homeMessage, setHomeMessage] = useState('');
  const [aboutUsMessage, setAboutUsMessage] = useState('');
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

  // Fetch current offer, image, and aboutUs data
  useEffect(() => {
    fetch(`${apiBase}/api/home/offer`)
      .then(res => res.json())
      .then(data => {
        setOffer(data.offer || '');
        setImageUrl(data.imageUrl || '/nandhaGokulam.png');
        if (data.aboutUs) {
          setAboutUs(data.aboutUs);
          setNewAboutUs({
            description: data.aboutUs.description || ''
          });
        }
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
      setHomeMessage('Only PNG, JPG, and JPEG files are allowed!');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setHomeMessage('File size must be less than 5MB!');
      return;
    }

    setSelectedFile(file);
    setHomeMessage('');
  };

  // Handle home section update (offer and image)
  const handleHomeUpdate = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    setLoading(true);
    setHomeMessage('');

    try {
      let hasUpdates = false;
      let updateMessages = [];

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
          setHomeMessage(uploadData.error || 'Failed to upload image');
          setLoading(false);
          return;
        }

        // Update the image URL with the uploaded image
        setImageUrl(uploadData.imageUrl);
        setSelectedFile(null);
        hasUpdates = true;
        updateMessages.push('image');
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
          hasUpdates = true;
          updateMessages.push('offer');
        } else {
          setHomeMessage(data.error || 'Failed to update offer');
          setLoading(false);
          return;
        }
      }

      if (hasUpdates) {
        const message = updateMessages.length === 1 
          ? `Home section ${updateMessages[0]} updated successfully!`
          : `Home section ${updateMessages.join(' and ')} updated successfully!`;
        setHomeMessage(message);
        setNewOffer('');
      } else {
        setHomeMessage('No changes detected. Please make changes before updating.');
      }
    } catch (err) {
      setHomeMessage('Server error occurred while updating home section');
    }
    setLoading(false);
  };

  // Handle about us section update
  const handleAboutUsUpdate = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    setLoading(true);
    setAboutUsMessage('');

    try {
      // Update aboutUs if provided
      if (newAboutUs.description && newAboutUs.description !== aboutUs.description) {
        const res = await fetch(`${apiBase}/api/home/offer`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            aboutUs: {
              description: newAboutUs.description || aboutUs.description
            }
          })
        });
        const data = await res.json();
        if (res.ok) {
          setAboutUs(data.aboutUs);
          setAboutUsMessage('About Us section description updated successfully!');
          setNewAboutUs({
            description: data.aboutUs.description
          });
        } else {
          setAboutUsMessage(data.error || 'Failed to update About Us section');
          setLoading(false);
          return;
        }
      } else {
        setAboutUsMessage('No changes detected. Please make changes before updating.');
      }
    } catch (err) {
      setAboutUsMessage('Server error occurred while updating About Us section');
    }
    setLoading(false);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <Header onLogout={handleLogout} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6">
        {/* Stats Overview */}
        <Stats offer={offer} imageUrl={imageUrl} aboutUs={aboutUs} />

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Home Section */}
          <HomeSection
            offer={offer}
            imageUrl={imageUrl}
            newOffer={newOffer}
            setNewOffer={setNewOffer}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            loading={loading}
            uploadLoading={uploadLoading}
            message={homeMessage}
            onUpdate={handleHomeUpdate}
            getImageUrl={getImageUrl}
          />

          {/* About Us Section */}
          <AboutUsSection
            aboutUs={aboutUs}
            newAboutUs={newAboutUs}
            setNewAboutUs={setNewAboutUs}
            loading={loading}
            message={aboutUsMessage}
            onUpdate={handleAboutUsUpdate}
          />
        </div>

        {/* Projects Section */}
        <ProjectsSection />
      </div>
    </div>
  );
}

export default withAuth(AdminHomeCMS);
