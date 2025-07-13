const Home = () => {
  return (
    <section
      style={{
        backgroundColor: "#f9f9f9",
        // backgroundImage: 'url("/enquiry-bg.jpg")',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right center",
        backgroundSize: "contain",
      }}
    >
      <img
        src="/logo-full.png"
        alt="Sri Aditya Developers Logo"
        style={{ width: "400px", marginBottom: "2rem" }}
      />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0rem 4rem",
        }}
      >
        {/* Left Section */}
        <div
          style={{
            flex: "1 1 500px",
            minWidth: "300px",
            justifyItems: "center",
            maxWidth: "600px",
          }}
        >
          <h2
            style={{
              color: "#003A80",
              fontSize: "2.3rem",
              marginBottom: "0.5rem",
            }}
          >
            DREAM PLOTS/FLOTS/VILLAS
          </h2>
          <h1
            style={{
              color: "#003A80",
              fontSize: "4rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            FOR SALE
          </h1>
          <p
            style={{
              fontSize: "1rem",
              color: "#333",
              marginBottom: "2rem",
              width: "90%",
              textAlign: "center",
            }}
          >
            We Delivery Only excellence and aim to exceed expectations in
            everything we do.
          </p>

          {/* Offer Card */}
          <div
            style={{
              background: "linear-gradient(to right, #130cb7, #aa08a4)",
              color: "white",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              padding: "1rem 1.5rem",
              gap: "1.5rem",
              width: "fit-content",
            }}
          >
            <div style={{ fontWeight: 600 }}>
              <div style={{ fontSize: "1.1rem" }}>Best Offer</div>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "#FFD700",
                }}
              >
                30% OFF
              </div>
              <div style={{ fontSize: "1.1rem" }}>This Month</div>
            </div>
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                padding: "0.5rem 1rem",
              }}
            >
              <img
                src="/nandhaGokulam.png"
                alt="Nanda Gokulam"
                style={{ width: "160px", display: "block" }}
              />
            </div>
          </div>
        </div>

        {/* Right Section - Enquiry Form */}
        <div
          style={{
            width: "500px",
          }}
        >
          <div
            style={{
              flex: "1 1 400px",
              width: "400px",
              marginTop: "2rem",
              backgroundColor: "#ffffffcc",
              padding: "2rem",
              borderRadius: "16px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              backdropFilter: "blur(6px)",
              border: "1px dashed #333",
            }}
          >
            <h3
              style={{
                color: "#003A80",
                marginBottom: "1rem",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              ENQUIRY FORM
            </h3>
            <form
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <input type="text" placeholder="Name" style={inputStyle} />
              <input
                type="text"
                placeholder="Phone Number"
                style={inputStyle}
              />
              <input
                type="email"
                placeholder="Email Address"
                style={inputStyle}
              />
              <textarea
                placeholder="Message"
                rows={3}
                style={{ ...inputStyle, resize: "none" }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: "#555",
                  color: "white",
                  border: "none",
                  padding: "0.8rem",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  width: "100px",
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const inputStyle = {
  padding: "0.8rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "1rem",
  width: "100%",
};

export default Home;
