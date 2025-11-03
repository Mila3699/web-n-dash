import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bg.jpg";

export const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-green">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>
      
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-brand-green/95 via-brand-green/90 to-brand-green/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-32 text-center">
        {/* Floating badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark border border-accent/20 mb-8 animate-fade-in">
          <span className="w-2 h-2 bg-accent rounded-full animate-glow"></span>
          <span className="text-sm text-primary-foreground/80">Метод энерготерапии ERA</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold text-primary-foreground mb-8 animate-slide-up leading-tight">
          Академия ERA<br/>
          <span className="text-accent">раскрытие твоего</span><br/>
          потенциала
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-primary-foreground/80 mb-12 max-w-3xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: '0.1s' }}>
          Единая экосистема для твоего роста, трансформации и обретения баланса
        </p>

        {/* CTA Button - упрощено до 1 главного действия */}
        <div className="flex justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Link to="/masters" className="w-full sm:w-auto">
            <Button 
              size="lg" 
              className="w-full group relative bg-accent hover:bg-accent/90 text-accent-foreground shadow-float text-xl px-12 py-8 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-gold"
            >
              <span className="relative z-10 flex items-center gap-3">
                Записаться на энергосессию
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
            </Button>
          </Link>
        </div>

        {/* Energy System Test */}
        <div className="mt-20 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="inline-block glass rounded-3xl shadow-float border border-accent/20 p-10 max-w-xl relative group hover:shadow-gold transition-all duration-500">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-primary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                <span className="text-3xl">✨</span>
              </div>
              <h2 className="text-3xl font-serif font-semibold mb-4 text-foreground">
                Анализ состояния вашей<br/>энергосистемы
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Узнайте уровень потенциала своей энергосистемы
              </p>
              <Link to="/test">
                <Button 
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-gold hover:shadow-float transition-all duration-300 hover:scale-105 text-lg py-6"
                >
                  Пройти тест бесплатно
                  <span className="ml-2">→</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
