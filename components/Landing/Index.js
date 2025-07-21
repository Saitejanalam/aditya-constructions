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
        <section ref={homeRef} className="scroll-mt-16"><Home /></section>
        <section ref={aboutRef} className="scroll-mt-16"><About /></section>
        <section ref={locationRef} className="scroll-mt-16"><OurProjects /></section>
        <section ref={projectRef} className="scroll-mt-16"><Gallery /></section>
        <section ref={contactRef} className="scroll-mt-16"><Contact /></section>
      </main>
    </>
  );
};

export default Index;
