import SectionPage from '@/components/SectionPage';
import Hero from '@/components/Hero';
import About from '@/components/About';
import HomeArtSection from '@/components/HomeArtSection';
import Education from '@/components/Education';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Certificates from '@/components/Certificates';
import Contact from '@/components/Contact';
import CinematicFooter from '@/components/CinematicFooter';

export default function HomePage() {
  return (
    <SectionPage>
      <div className="space-y-0">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certificates />
        <Contact />
        <CinematicFooter />
      </div>
    </SectionPage>
  );
}
