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

const Home = () => {
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