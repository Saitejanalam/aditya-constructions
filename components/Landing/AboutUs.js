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
        {/* Video Section */}
        <div style={{ flex: "1 1 400px" }}>
          <video
            width="100%"
            controls
            poster="/about-thumbnail.jpg" // optional: provide a fallback thumbnail
            style={{
              borderRadius: "30px",
              objectFit: "cover",
              width: "100%",
              height: "100%",
              maxHeight: "320px",
            }}
          >
            <source src="https://youtu.be/n8yx0nWBF_8?si=-6W6aSkgcprKU8tP" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Text Content */}
        <div style={{ flex: "1 1 500px" }}>
          <h2 style={{ fontSize: "2rem", color: "#003366", marginBottom: "1rem" }}>
            About Our Company
          </h2>
          <p style={{ fontSize: "1.05rem", lineHeight: "1.8", color: "#555" }}>
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
