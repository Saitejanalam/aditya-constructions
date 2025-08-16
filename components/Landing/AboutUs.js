import { useEffect, useState } from 'react';

const AboutUs = () => {
  const [aboutUsData, setAboutUsData] = useState({
    youtubeVideoId: 'n8yx0nWBF_8',
    description: 'Sri Aditya Developers, the leading developers in Andhra Pradesh & Telangana, was founded in 2010 at Kakinada E.G by Satish (Managing Director). Sri Aditya Developers has started its journey with the aim of providing excellent services to all the customers approaching our ventures. Thus we have completed a number of challenging projects successfully with full commitment.'
  });
  const [loading, setLoading] = useState(true);
  const apiBase = process.env.NEXT_PUBLIC_BACKEND_URL || '';

  useEffect(() => {
    fetch(`${apiBase}/api/home/offer`)
      .then(res => res.json())
      .then(data => {
        if (data.aboutUs) {
          setAboutUsData(data.aboutUs);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching AboutUs data:', err);
        setLoading(false);
      });
  }, [apiBase]);

  if (loading) {
    return (
      <section className="py-16 px-4 max-w-[1200px] mx-auto">
        <div className="flex flex-wrap items-center gap-8 justify-center">
          <div className="w-[560px] h-[315px] bg-gray-200 rounded-2xl animate-pulse"></div>
          <div className="flex-1 min-w-[300px]">
            <div className="h-8 bg-gray-200 rounded mb-4 animate-pulse"></div>
            <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 max-w-[1200px] mx-auto">
      <div className="flex flex-wrap items-center gap-8 justify-center">
        {/* YouTube iframe with dynamic video ID */}
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/n8yx0nWBF_8?si=nA3lKn3Xzd-gU8DW&rel=0"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          autoPlay
          className="rounded-2xl"
        ></iframe>

        {/* Text Content */}
        <div className="flex-1 min-w-[300px]">
          <h2 className="text-3xl text-[#003366] mb-4 font-bold">About Our Company</h2>
          <p className="text-xl text-gray-600">
            {aboutUsData.description}
          </p>
          <a
            href="#"
            className="inline-block mt-6 py-3 px-8 text-lg font-medium text-white bg-gradient-to-r from-[#2e00ff] to-[#a11cf2] rounded-[15px] no-underline"
          >
            Read More
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
