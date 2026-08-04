import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Journey from "../components/Journey";
import FAQs from "../components/FAQs";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ScrollTop from "../components/ScrollTop";
import ScrollProgress from "../components/ScrollProgress";
import CursorGlow from "../components/Cursor";
import PageTransition from "../components/PageTransition";
import Loading from "../components/Loading";

import { getAbout } from "../services/aboutService";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        await getAbout();
      } catch (error) {
        console.error("Failed to load portfolio:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPortfolio();
  }, []);

  // Backend data check hone tak loading screen
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 overflow-x-hidden">
      <ScrollProgress />

      <PageTransition>
        <CursorGlow />

        <Navbar />

        <main className="w-full">
          <Hero />

          <About />
          <Projects />
          <Journey />
          <FAQs />
          <Contact />

          <Footer />

          <ScrollTop />
        </main>
      </PageTransition>
    </div>
  );
};

export default Home;