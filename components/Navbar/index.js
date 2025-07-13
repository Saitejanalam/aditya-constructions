import { useState } from "react";

const Navbar = ({ refs }) => {
  const primaryColor = "#003A80";
  const accentColor = "#F5B041";

  const [activeSection, setActiveSection] = useState("Home");

  const scrollToSection = (ref, label) => {
    // if (ref?.current) {
    //   ref.current.scrollIntoView({ behavior: "smooth" });
    //   setActiveSection(label);
    // }
  };

  const navStyle = {
    backgroundColor: primaryColor,
    padding: "0.8rem 2rem",
    color: "white",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    display: "flex",
    justifyContent: "end",
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
    gap: "1rem",
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

  return (
    <nav style={navStyle}>
      {/* Logo */}

      {/* Navigation Items */}
      <ul style={ulStyle}>
        <li
          style={getLiStyle("Home")}
          onClick={() => scrollToSection(refs.homeRef, "Home")}
        >
          <strong>Home</strong>
        </li>
        <li
          style={getLiStyle("About Us")}
          onClick={() => scrollToSection(refs.projectRef, "About Us")}
        >
          <strong>About Us</strong>
        </li>
        <li
          style={getLiStyle("Our Projects")}
          onClick={() => scrollToSection(refs.locationRef, "Our Projects")}
        >
          <strong>Our Projects</strong>
        </li>
        <li
          style={getLiStyle("Gallery")}
          onClick={() => scrollToSection(refs.aboutRef, "Gallery")}
        >
          <strong>Gallery</strong>
        </li>
        <li
          style={getLiStyle("Contact")}
          onClick={() => scrollToSection(refs.contactRef, "Contact")}
        >
          <strong>Contact</strong>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
