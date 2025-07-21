import { useRef } from "react";
import Home from "./Home";
import About from "./AboutUs";
import OurProjects from "./OurProjects";
import Gallery from "./Gallery";
import Contact from "./Contact";

const Index = ({ navbarRefs }) => {
  // If navbarRefs is not provided, create them here (for direct use/testing)
  const homeRef = navbarRefs?.homeRef || useRef(null);
  const aboutRef = navbarRefs?.aboutRef || useRef(null);
  const projectRef = navbarRefs?.projectRef || useRef(null);
  const locationRef = navbarRefs?.locationRef || useRef(null);
  const contactRef = navbarRefs?.contactRef || useRef(null);

  return (
    <>
      <main className="bg-[#F4F4F4]">
        <section ref={homeRef}><Home /></section>
        <section ref={aboutRef}><About /></section>
        <section ref={locationRef}><OurProjects /></section>
        <section ref={projectRef}><Gallery /></section>
        <section ref={contactRef}><Contact /></section>
      </main>
    </>
  );
};

export default Index;
