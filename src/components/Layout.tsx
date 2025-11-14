import { ReactNode } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export const Layout = ({ children, className = "min-h-screen" }: LayoutProps) => {
  return (
    <div className={className}>
      <Navigation />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};
