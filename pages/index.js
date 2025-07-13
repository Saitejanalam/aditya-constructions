import Index from "@/components/Landing/Index";
import Layout from "@/components/Layout";
import Head from "next/head";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>SRI ADITYA DEVELOPERS</title>
        <meta name="description" content="Sri Aditya Developers - Building trust and quality homes across Andhra Pradesh & Telangana." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Index />
    </Layout>
  );
}
