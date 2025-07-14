const Home = () => {
  return (
    <section>
      <img
        src="/logo-full.png"
        alt="Sri Aditya Developers Logo"
        style={{ width: "300px" }}
      />

      <div
        style={{
          position: "relative", // for overlay positioning
          display: "flex",
          flexWrap: "nowrap",
          gap: "2rem",
          justifyContent: "space-between",
          alignItems: "stretch",
          width: "100%",
          padding: "0rem 2rem",
          textAlign: "center",
          backgroundImage: 'url("/home-bg.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden",
        }}
      >
        {/* Background overlay for opacity/blur */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backdropFilter: "blur(2px)",
            zIndex: 0,
          }}
        />

        {/* Left Section */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            flex: "1 1 500px",
            minWidth: "300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
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
            }}
          >
            We Deliver Only excellence and aim to exceed expectations in
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
              alignSelf: "center",
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

        {/* Right Section */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            flex: "1 1 500px",
            minWidth: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "16px",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffffcc",
              padding: "2rem",
              borderRadius: "16px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              backdropFilter: "blur(2px)",
              border: "1px dashed #333",
              maxWidth: "400px",
              width: "100%",
            }}
          >
            <h3
              style={{
                color: "#003A80",
                marginBottom: "1rem",
                fontSize: "1.5rem",
                fontWeight: "bold",
                textAlign: "center",
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
