import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { SessionsSection } from "@/components/SessionsSection";
import { TransformationSection } from "@/components/TransformationSection";
import { TrainingSection } from "@/components/TrainingSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <SessionsSection />
        <TransformationSection />
        <TrainingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
