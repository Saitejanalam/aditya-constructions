import { useRef } from "react";
import Index from "@/components/Landing/Index";
import Layout from "@/components/Layout";
import Head from "next/head";

export default function Home() {
  // Create refs for each section
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectRef = useRef(null);
  const locationRef = useRef(null);
  const contactRef = useRef(null);

  const navbarRefs = {
    homeRef,
    aboutRef,
    projectRef,
    locationRef,
    contactRef,
  };

  return (
    <Layout navbarRefs={navbarRefs}>
      <Head>
        <title>SRI ADITYA DEVELOPERS</title>
        <meta name="description" content="Sri Aditya Developers - Building trust and quality homes across Andhra Pradesh & Telangana." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Index navbarRefs={navbarRefs} />
    </Layout>
  );
}
