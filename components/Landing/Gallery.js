import { useEffect, useState } from 'react';

const Gallery = () => {
  const [galleryImage, setGalleryImage] = useState('/gallery.png');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryImage = async () => {
      try {
        const apiBase = process.env.NEXT_PUBLIC_BACKEND_URL || '';
        const response = await fetch(`${apiBase}/api/home/gallery`);
        const data = await response.json();
        
        if (response.ok && data.galleryImage) {
          setGalleryImage(data.galleryImage);
        }
      } catch (error) {
        console.error('Error fetching gallery image:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImage();
  }, []);

  const getImageUrl = (url) => {
    if (!url) return '/gallery.png';
    if (url.startsWith('http')) return url;
    if (url.startsWith('/uploads/')) {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001';
      return `${backendUrl}${url}`;
    }
    return url;
  };

  return (
    <section className="py-16 px-4 text-center relative">
      <h2 className="text-2xl font-semibold text-[#062c3e] mb-8">
        Milestones we've reached <br /> in our journey
      </h2>
      {loading ? (
        <div className="w-full h-64 bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
          <span className="text-gray-500">Loading gallery...</span>
        </div>
      ) : (
        <img
          src={getImageUrl(galleryImage)}
          alt="Milestones Timeline"
          className="w-full h-auto max-w-[1200px] mx-auto block"
        />
      )}
    </section>
  );
};

export default Gallery;
