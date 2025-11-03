import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bg.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-primary/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-32 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-primary-foreground mb-6 animate-fade-in">
          Академия ERA - раскрытие твоего потенциала
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-primary-foreground/90 mb-12 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Единая экосистема для твоего роста, трансформации и обретения баланса. 
          Откройте для себя силу метода энерготерапии ERA.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Link to="/masters">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground shadow-gold text-lg px-8 py-6"
            >
              Записаться на энергосессию к Анастасии
            </Button>
          </Link>
          <Link to="/masters">
            <Button 
              size="lg" 
              variant="outline"
              className="w-full sm:w-auto border-2 border-accent text-primary-foreground hover:bg-accent hover:text-accent-foreground text-lg px-8 py-6"
            >
              Выбрать энерготерапевта ERA
            </Button>
          </Link>
        </div>

        {/* Energy System Test */}
        <div className="mt-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="inline-block bg-card/90 backdrop-blur-sm rounded-2xl shadow-soft p-8 max-w-md">
            <h2 className="text-2xl font-serif font-semibold mb-3">
              Анализ состояния вашей энергосистемы
            </h2>
            <p className="text-muted-foreground mb-6">
              Уровень её потенциала
            </p>
            <Link to="/test">
              <Button 
                size="lg"
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              >
                Пройти тест
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
