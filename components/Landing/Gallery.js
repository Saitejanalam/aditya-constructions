const Gallery = () => {
  return (
    <section className="py-16 px-4 text-center relative">
      <h2 className="text-2xl font-semibold text-[#062c3e] mb-8">
        Milestones we've reached <br /> in our journey
      </h2>
      <img
        src="/gallery.png"
        alt="Milestones Timeline"
        className="w-full h-auto max-w-[1200px] mx-auto block"
      />
    </section>
  );
};

export default Gallery;
