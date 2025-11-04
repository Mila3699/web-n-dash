import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bg.jpg";
import { useRateLimit } from "@/hooks/useRateLimit";
import { useState } from "react";

export const HeroSection = () => {
  const [isNavigating, setIsNavigating] = useState(false);
  const { checkLimit, isBlocked } = useRateLimit({
    key: 'hero_cta',
    preset: 'bookingButton',
  });

  const handleMastersClick = (e: React.MouseEvent) => {
    if (isBlocked || isNavigating) {
      e.preventDefault();
      return;
    }

    if (!checkLimit()) {
      e.preventDefault();
      return;
    }

    setIsNavigating(true);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-green">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-brand-green/96 via-brand-green/94 to-brand-green/96" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-32 text-center">
        {/* Simple badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-dark border border-accent/20 mb-16 animate-fade-in">
          <span className="text-sm font-medium text-primary-foreground/90 tracking-wide">Метод энерготерапии ERA</span>
        </div>
        
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-8 animate-slide-up leading-[1.05] tracking-tight">
          Раскройте<br/>
          <span className="text-accent inline-block mt-4">свой потенциал</span>
        </h1>
        
        <p className="text-xl sm:text-2xl md:text-3xl text-white/80 mb-20 max-w-2xl mx-auto animate-slide-up font-light leading-relaxed" style={{ animationDelay: '0.1s' }}>
          Трансформация через энергию
        </p>

        {/* CTA Button */}
        <div className="flex justify-center animate-slide-up mb-32" style={{ animationDelay: '0.2s' }}>
          <Link to="/masters" onClick={handleMastersClick} className="w-full sm:w-auto max-w-md">
            <button 
              disabled={isBlocked || isNavigating}
              className="w-full group relative bg-white text-brand-green font-semibold text-lg px-12 py-5 rounded-2xl transition-all duration-200 hover:scale-[1.01] shadow-[0_8px_24px_rgba(255,255,255,0.2)] hover:shadow-[0_12px_32px_rgba(255,255,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span className="flex items-center justify-center gap-2.5">
                {isNavigating ? 'Переход...' : 'Записаться на сессию'}
                {!isNavigating && <span className="inline-block transition-transform group-hover:translate-x-0.5 text-xl">→</span>}
              </span>
            </button>
          </Link>
        </div>

        {/* Energy System Test - HERO FEATURE */}
        <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="max-w-2xl mx-auto">
            <div className="relative bg-white rounded-[2rem] p-12 shadow-[0_16px_48px_rgba(0,0,0,0.12)]">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <span className="text-4xl">✨</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-5 text-brand-green leading-tight">
                  Анализ вашей<br/>энергосистемы
                </h2>
                
                <p className="text-lg text-brand-green/50 mb-10 leading-relaxed max-w-md mx-auto">
                  Узнайте уровень потенциала за 5 минут
                </p>
                
                <Link to="/test" onClick={(e) => {
                  if (!checkLimit()) {
                    e.preventDefault();
                  }
                }}>
                  <button 
                    disabled={isBlocked}
                    className="w-full group relative bg-accent text-white font-semibold text-lg px-10 py-5 rounded-2xl transition-all duration-200 hover:scale-[1.01] shadow-[0_4px_16px_rgba(180,160,104,0.2)] hover:shadow-[0_8px_24px_rgba(180,160,104,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="flex items-center justify-center gap-2.5">
                      Пройти бесплатный тест
                      <span className="inline-block transition-transform group-hover:translate-x-0.5 text-xl">→</span>
                    </span>
                  </button>
                </Link>
                
                <p className="text-sm text-brand-green/35 mt-6">Более 7 000 человек уже прошли этот тест</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
