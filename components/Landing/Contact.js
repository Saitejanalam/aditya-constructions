const Contact = () => {
  return (
    <footer
      style={{
        backgroundColor: "#003366",
        color: "#fff",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 1rem" }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "2rem",
          }}
        >
          {/* Left Section - Message */}
          <div style={{ flex: "1 1 350px" }}>
            <h2 style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>
              Contact us now
            </h2>
            <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
              To learn more about our project or to <br />
              schedule a site visit, get in touch with our <br />
              team today.
            </p>
          </div>

          {/* Right Section - Contact Info */}
          <div
            style={{
              flex: "1 1 300px",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            {/* Address */}
            <div
              style={{
                minWidth: "180px",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "1rem",
              }}
            >
              <img src="/icons/location.png" alt="location" width={24} />
              <span style={{ fontSize: "1.1rem" }}>
                Kakinada Office Address
              </span>
            </div>
          </div>
          <div
            style={{
              flex: "1 1 300px",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            {/* Phone */}
            <div style={{ minWidth: "180px", marginBottom: "1rem" }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <img src="/icons/phone.png" alt="phone" width={24} />
                <h3 style={{ fontSize: "1.1rem", margin: 0 }}>Call Us</h3>
              </div>
              <p style={{ margin: "0.2rem 0 0", paddingLeft:'30px' }}>+91 9912555505</p>
            </div>

            {/* Email */}
            <div style={{ minWidth: "180px", marginBottom: "1rem" }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <img src="/icons/mail.png" alt="mail" width={24} />
                <h3 style={{ fontSize: "1.1rem", margin: 0 }}>Email</h3>
              </div>
              <p style={{ margin: "0.2rem 0 0", fontSize: "0.95rem",  paddingLeft:'30px' }}>
                sriadityadevelopersofficial@gmail.com
              </p>
            </div>

            {/* Social Links */}
            <div style={{ minWidth: "180px", marginTop: "1rem" }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                Follow us
              </h3>
              <div style={{ display: "flex", gap: "0.8rem" }}>
                <a href="#">
                  <img src="/icons/fb.png" alt="Facebook" width={24} />
                </a>
                <a href="#">
                  <img src="/icons/ig.png" alt="Instagram" width={24} />
                </a>
                <a href="#">
                  <img src="/icons/li.png" alt="LinkedIn" width={24} />
                </a>
                <a href="#">
                  <img src="/icons/yt.png" alt="YouTube" width={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{ borderTop: "1px solid #ffffff44", marginTop: "2rem" }}
      ></div>

      {/* Copyright */}
      <div
        style={{ padding: "1rem", textAlign: "center", fontSize: "0.95rem" }}
      >
        <p style={{ margin: 0 }}>
          Copyright © 2025 sriadityadevelopers. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Contact;
