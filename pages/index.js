import { useRef, useState } from "react";
import Head from "next/head";

export default function HomePage() {
  const homeRef = useRef(null);
  const projectRef = useRef(null);
  const locationRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const [activeSection, setActiveSection] = useState("Home");

  const scrollToSection = (ref, label) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(label);
  };

  const primaryColor = "#003A80";
  const accentColor = "#F5B041";

  const navStyle = {
    backgroundColor: primaryColor,
    padding: "0.8rem 2rem",
    color: "white",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const logoStyle = {
    height: "48px",
    width: "48px",
    borderRadius: "50%",
    objectFit: "cover",
    backgroundColor: "white",
    padding: "2px",
  };

  const ulStyle = {
    display: "flex",
    listStyle: "none",
    alignItems: "center",
    margin: 0,
    padding: 0,
  };

  const liBaseStyle = {
    cursor: "pointer",
    fontWeight: 500,
    fontSize: "0.9rem",
    padding: "0.4rem 0.6rem",
    borderRadius: "20px",
    transition: "all 0.2s ease",
  };

  const getLiStyle = (label) => ({
    ...liBaseStyle,
    backgroundColor: activeSection === label ? accentColor : "transparent",
    color: activeSection === label ? primaryColor : "white",
  });

  const sectionStyle = {
    padding: "5rem 1rem",
    maxWidth: "900px",
    margin: "0 auto",
    borderRadius: "18px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
    marginBottom: "2rem",
    background: "white",
    display: "flex",
    alignItems: "center",
    gap: "2rem",
  };

  const sectionAltStyle = {
    ...sectionStyle,
    background: "#f9f9f9",
  };

  const imgStyle = {
    width: "220px",
    height: "160px",
    objectFit: "cover",
    borderRadius: "12px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.09)",
    marginRight: "2rem",
    background: "#eee",
  };

  const headingStyle = {
    color: primaryColor,
    marginBottom: "1rem",
    fontWeight: 700,
    fontSize: "2.2rem",
    letterSpacing: "1px",
  };

  const subHeadingStyle = {
    color: accentColor,
    fontWeight: 600,
    fontSize: "1.3rem",
    marginBottom: "0.7rem",
  };

  return (
    <>
      <Head>
        <title>Sri Aditya Developers</title>
      </Head>

      <nav style={navStyle}>
        <img src="/logo.jpg" alt="Sri Aditya Logo" style={logoStyle} />
        <ul style={ulStyle}>
          <li
            style={getLiStyle("Home")}
            onClick={() => scrollToSection(homeRef, "Home")}
          >
            <strong style={{ fontSize: "0.95rem" }}>Home</strong>
          </li>
          <li
            style={getLiStyle("Project")}
            onClick={() => scrollToSection(projectRef, "Project")}
          >
            <strong style={{ fontSize: "0.95rem" }}>Project Overview</strong>
          </li>
          <li
            style={getLiStyle("Locations")}
            onClick={() => scrollToSection(locationRef, "Locations")}
          >
            <strong style={{ fontSize: "0.95rem" }}>Locations</strong>
          </li>
          <li
            style={getLiStyle("About")}
            onClick={() => scrollToSection(aboutRef, "About")}
          >
            <strong style={{ fontSize: "0.95rem" }}>About Us</strong>
          </li>
          <li
            style={getLiStyle("Contact")}
            onClick={() => scrollToSection(contactRef, "Contact")}
          >
            <strong style={{ fontSize: "0.95rem" }}>Contact</strong>
          </li>
        </ul>
      </nav>

      <main
        style={{
          backgroundColor: "#f4f8fc",
          color: primaryColor,
          minHeight: "100vh",
        }}
      >
        <section
          ref={homeRef}
          style={{
            position: "relative",
            height: "90vh",
            width: "100%",
            overflow: "hidden",
            padding: 0,
            margin: 0,
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
            alt="Home"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 1,
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 2,
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: "2rem",
              background: "rgba(0, 0, 0, 0.4)",
              color: "white",
            }}
          >
            <h1
              style={{
                fontSize: "2rem",
                marginBottom: "1rem",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Welcome to{" "}
              <span style={{ color: accentColor, fontWeight: "bold" }}>
                Sri Aditya Developers
              </span>
            </h1>
            <p style={{ fontSize: "1rem", maxWidth: "700px" }}>
              Leading real estate company in Andhra Pradesh & Telangana. <br />
              Committed to quality and trust, we build homes and communities for
              a better tomorrow.
            </p>
          </div>
        </section>

        <section
          ref={projectRef}
          style={{
            background: "#f4f8fc",
            padding: "4rem 1rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              maxWidth: "1000px",
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            <div style={{ flex: "1 1 400px" }}>
              <img
                src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80"
                alt="Project"
                style={{
                  width: "100%",
                  height: "280px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
                }}
              />
            </div>
            <div style={{ flex: "1 1 400px" }}>
              <div
                style={{
                  borderLeft: `5px solid ${accentColor}`,
                  paddingLeft: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <h2
                  style={{
                    color: primaryColor,
                    fontSize: "1.6rem",
                    fontWeight: "bold",
                    marginBottom: "0.3rem",
                  }}
                >
                  Project Overview
                </h2>
                <p
                  style={{
                    fontSize: "1rem",
                    color: accentColor,
                    fontWeight: 600,
                  }}
                >
                  Residential layouts, villas, gated communities
                </p>
              </div>
              <p style={{ fontSize: "1rem", lineHeight: 1.7 }}>
                Our current projects are a reflection of our commitment to
                providing both affordable and premium housing options. Designed
                with sustainability and comfort in mind, each layout is crafted
                for long-term value and a better living experience. Whether
                you're looking for a peaceful residential villa or a modern
                gated community — we have a project tailored for your dreams.
              </p>
            </div>
          </div>
        </section>

        <section
          ref={locationRef}
          style={{
            padding: "4rem 1rem",
            background: "#e8f1fc",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <h2
              style={{
                color: primaryColor,
                fontSize: "1.6rem",
                fontWeight: "bold",
                marginBottom: "0.5rem",
              }}
            >
              Our Locations
            </h2>
            <p
              style={{
                color: accentColor,
                fontSize: "1rem",
                fontWeight: 600,
                marginBottom: "2rem",
              }}
            >
              Serving communities across Andhra Pradesh & Telangana
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1.5rem",
                justifyContent: "center",
              }}
            >
              {["Hyderabad", "Vijayawada", "Vizag", "Guntur", "Warangal"].map(
                (city) => (
                  <div
                    key={city}
                    style={{
                      background: "white",
                      padding: "1.2rem 1rem",
                      borderRadius: "12px",
                      minWidth: "140px",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                      fontWeight: 600,
                      color: primaryColor,
                    }}
                  >
                    📍 {city}
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        <section
          ref={aboutRef}
          style={{
            background: "#fff",
            padding: "4rem 1rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              maxWidth: "1000px",
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              gap: "2rem",
              alignItems: "center",
            }}
          >
            {/* Left Text */}
            <div style={{ flex: "1 1 450px" }}>
              <h2
                style={{
                  fontSize: "1.6rem",
                  fontWeight: "bold",
                  color: primaryColor,
                  marginBottom: "0.3rem",
                }}
              >
                About Us
              </h2>
              <div
                style={{
                  width: "60px",
                  height: "4px",
                  backgroundColor: accentColor,
                  marginBottom: "1rem",
                }}
              ></div>
              <p
                style={{
                  fontSize: "1rem",
                  color: "#333",
                  lineHeight: 1.7,
                }}
              >
                Sri Aditya Developers is a name synonymous with trust, quality,
                and transparency. With decades of experience and a passion for
                innovation, we aim to deliver projects that not only meet but
                exceed expectations. Our mission is to build environments where
                families can thrive, and investments grow.
              </p>
            </div>

            {/* Right Image */}
            <div style={{ flex: "1 1 400px" }}>
              <img
                src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80"
                alt="About Us"
                style={{
                  width: "100%",
                  height: "260px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
              />
            </div>
          </div>
        </section>

        <footer
          ref={contactRef}
          style={{
            backgroundColor: "#003A80",
            color: "white",
            padding: "20px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "2rem",
          }}
        >
          {/* Left Section */}
          <div style={{ flex: "1 1 250px" }}>
            <h2
              style={{
                fontSize: "1.1rem",
                marginBottom: "1rem",
                color: "#F5B041",
                fontWeight: "bold",
              }}
            >
              Contact us now
            </h2>
            <p style={{ lineHeight: 1.6, fontSize: "0.95rem" }}>
              To learn more about our project or to schedule a site visit, get
              in touch with our team today.
            </p>
            <div style={{ marginTop: "1rem" }}>
              <p style={{ margin: 0, fontSize: "0.95rem" }}>
                RERA No: <strong>PXXXXXXXXXXXX</strong>
              </p>
            </div>
          </div>

          {/* Middle Section */}
          <div style={{ flex: "1 1 250px" }}>
            <h3
              style={{
                fontSize: "1rem",
                marginBottom: "0.6rem",
                fontWeight: "bold",
              }}
            >
              📍{" "}
              <span style={{ fontWeight: "bold" }}>Sri Aditya Developers</span>
            </h3>
            <p style={{ margin: 0, lineHeight: 1.6, fontSize: "0.95rem" }}>
              123, Sunrise Avenue, Sector X, <br />
              Hyderabad, Telangana - 500XXX
            </p>
          </div>

          {/* Right Section */}
          <div style={{ flex: "1 1 250px" }}>
            <h4 style={{ marginBottom: "0.6rem", fontWeight: "bold" }}>
              📞 Call Us
            </h4>
            <p style={{ margin: "0 0 0.5rem", fontSize: "0.95rem" }}>
              +91-XXXXXXXXXX
            </p>

            <h4 style={{ marginBottom: "0.6rem", fontWeight: "bold" }}>
              ✉️ Email
            </h4>
            <p style={{ margin: "0 0 0.5rem", fontSize: "0.95rem" }}>
              <a
                href="mailto:info@sriadityadevelopers.com"
                style={{
                  color: "#F5B041",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                info@sriadityadevelopers.com
              </a>
            </p>

            <h4 style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>
              🔗 Follow us
            </h4>
            <div style={{ display: "flex", gap: "1rem", fontSize: "1.2rem" }}>
              <a href="#" style={{ color: "white" }}>
                🌐
              </a>
              <a href="#" style={{ color: "white" }}>
                📸
              </a>
              <a href="#" style={{ color: "white" }}>
                🔗
              </a>
              <a href="#" style={{ color: "white" }}>
                ▶️
              </a>
            </div>
          </div>

          {/* Bottom Line */}
          <div
            style={{
              width: "100%",
              textAlign: "center",
              marginTop: "2rem",
              borderTop: "1px solid #ffffff33",
              paddingTop: "1rem",
              fontSize: "0.85rem",
              color: "#ffffffaa",
              fontWeight: "bold",
            }}
          >
            © {new Date().getFullYear()} Sri Aditya Developers. All rights
            reserved.
          </div>
        </footer>
      </main>
    </>
  );
}
