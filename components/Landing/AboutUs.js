const AboutUs = () => {
  return (
    <section
      style={{
        padding: "4rem 1rem",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "2rem",
          justifyContent: "center",
        }}
      >
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
          autoplay
          style={{
            borderRadius: "16px",
          }}
        ></iframe>

        {/* Text Content */}
        <div style={{ flex: "1 1 500px" }}>
          <h2 style={{ fontSize: "2.2rem", color: "#003366", marginBottom: "1rem", fontWeight: "bold" }}>
            About Our Company
          </h2>
          <p style={{ fontSize: "1.3rem", color: "#555" }}>
            Sri Aditya Developers, the leading developers in Andhra Pradesh & Telangana,
            was founded in 2010 at Kakinada E.G by Satish (Managing Director). Sri Aditya
            Developers has started its journey with the aim of providing excellent
            services to all the customers approaching our ventures. Thus we have completed
            a number of challenging projects successfully with full commitment.
          </p>
          <a
            href="#"
            style={{
              display: "inline-block",
              marginTop: "1.5rem",
              padding: "0.75rem 2rem",
              fontSize: "1.1rem",
              fontWeight: "500",
              color: "#fff",
              background: "linear-gradient(to right, #2e00ff, #a11cf2)",
              borderRadius: "15px",
              textDecoration: "none",
            }}
          >
            Read More
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
