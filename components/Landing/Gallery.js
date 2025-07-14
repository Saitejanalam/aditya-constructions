const Gallery = () => {

  return (
    <section
      style={{
        padding: "4rem 1rem",
        textAlign: "center",
        position: "relative",
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: 600,
          color: "#062c3e",
        }}
      >
        Milestones we've reached <br /> in our journey
      </h2>

       <img
        src="/gallery.png"
        alt="Milestones Timeline"
        style={{
          width: "100%",
          height: "auto",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "block",
        }}
      />

    </section>
  );
};

export default Gallery;
