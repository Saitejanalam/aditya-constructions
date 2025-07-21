const AboutUs = () => {
  return (
    <section className="py-16 px-4 max-w-[1200px] mx-auto">
      <div className="flex flex-wrap items-center gap-8 justify-center">
        {/* YouTube iframe with rel=0 to prevent suggested videos */}
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
            Sri Aditya Developers, the leading developers in Andhra Pradesh & Telangana,
            was founded in 2010 at Kakinada E.G by Satish (Managing Director). Sri Aditya
            Developers has started its journey with the aim of providing excellent
            services to all the customers approaching our ventures. Thus we have completed
            a number of challenging projects successfully with full commitment.
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
