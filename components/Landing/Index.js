import Home from "./Home";
import About from "./AboutUs";
import OurProjects from "./OurProjects";
import Gallery from "./Gallery";
import Contact from "./Contact";

const Index = () => {
  return (
    <>
      {/* <Navbar refs={refs} /> */}
      <main style={{background:'#F4F4F4'}} >
        <Home />
        <Gallery />
        <Contact /> 
        {/* <About />
        <OurProjects />
        */
        }
      </main>
    </>
  );
};

export default Index;
