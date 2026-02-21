import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import HomeSection from "./components/HomeSection";
import AboutSection from "./components/AboutSection";
import TechnicalSkillsSection from "./components/TechnicalSkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="main">
        <HomeSection />
        <AboutSection />
        <TechnicalSkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
