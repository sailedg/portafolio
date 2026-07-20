import { Navbar } from "@/components/Navbar/Navbar";
import { MobileTabBar } from "@/components/Navbar/MobileTabBar";
import { Hero } from "@/components/Hero/Hero";
import { AboutSkills } from "@/components/AboutSkills/AboutSkills";
import { TechMarquee } from "@/components/TechMarquee/TechMarquee";
import { Services } from "@/components/Services/Services";
import { Projects } from "@/components/Projects/Projects";
import { Testimonials } from "@/components/Testimonials/Testimonials";
import { Contact } from "@/components/Contact/Contact";
import { Footer } from "@/components/Footer/Footer";
import { BrandWatermark } from "@/components/BrandWatermark/BrandWatermark";
import watermarkStyles from "@/components/BrandWatermark/BrandWatermark.module.css";

export default function Home() {
  return (
    <>
      <Navbar />
      <div>
        <main>
          <Hero />
          <div className={watermarkStyles["watermark-wrap"]}>
            <BrandWatermark />
            <AboutSkills />
            <TechMarquee />
            <Services />
            <Projects />
            <Testimonials />
            <Contact />
          </div>
        </main>
        <MobileTabBar />
      </div>
      <Footer />
    </>
  );
}
