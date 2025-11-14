import { Layout } from "@/components/Layout";
import { HeroSection } from "@/components/HeroSection";
import { SessionsSection } from "@/components/SessionsSection";
import { GallerySection } from "@/components/GallerySection";
import { TransformationSection } from "@/components/TransformationSection";
import { TrainingSection } from "@/components/TrainingSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <SessionsSection />
      <GallerySection />
      <TransformationSection />
      <TrainingSection />
    </Layout>
  );
};

export default Index;
