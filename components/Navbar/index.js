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

  const getLiClass = (label) =>
    `cursor-pointer font-medium text-sm px-3 py-2 rounded-full transition-all duration-200 ${
      activeSection === label
        ? "bg-[#F5B041] text-[#003A80]"
        : "bg-transparent text-white"
    }`;

  return (
    <nav className="bg-[#003A80] py-3 px-8 text-white sticky top-0 z-[1000] shadow-md flex justify-end items-center">
      {/* Logo */}
      {/* Navigation Items */}
      <ul className="flex list-none items-center m-0 p-0 gap-4">
        <li
          className={getLiClass("Home")}
          onClick={() => scrollToSection(refs.homeRef, "Home")}
        >
          <strong>Home</strong>
        </li>
        <li
          className={getLiClass("About Us")}
          onClick={() => scrollToSection(refs.projectRef, "About Us")}
        >
          <strong>About Us</strong>
        </li>
        <li
          className={getLiClass("Our Projects")}
          onClick={() => scrollToSection(refs.locationRef, "Our Projects")}
        >
          <strong>Our Projects</strong>
        </li>
        <li
          className={getLiClass("Gallery")}
          onClick={() => scrollToSection(refs.aboutRef, "Gallery")}
        >
          <strong>Gallery</strong>
        </li>
        <li
          className={getLiClass("Contact")}
          onClick={() => scrollToSection(refs.contactRef, "Contact")}
        >
          <strong>Contact</strong>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
