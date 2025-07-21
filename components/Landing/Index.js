import Home from "./Home";
import About from "./AboutUs";
import OurProjects from "./OurProjects";
import Gallery from "./Gallery";
import Contact from "./Contact";

const Index = () => {
  return (
    <>
      {/* <Navbar refs={refs} /> */}
      <main className="bg-[#F4F4F4]">
        <Home />
        <About />
        <OurProjects />
        <Gallery />
        <Contact /> 
      </main>
    </>
  );
};

export default Index;
