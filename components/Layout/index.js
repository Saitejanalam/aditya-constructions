import Head from "next/head";
import Navbar from "../Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="Sri Aditya Developers, Real Estate, Construction, AP, Telangana" />
        <meta name="author" content="Sri Aditya Developers" />
      </Head>

      <div className="font-sans bg-[#f4f8fc] text-[#003A80]">
        <Navbar />
        {children}
      </div>
    </>
  );
};

export default Layout;
