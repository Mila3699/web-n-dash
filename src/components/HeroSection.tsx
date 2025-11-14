import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bg.jpg";
import { useRateLimit } from "@/hooks/useRateLimit";
import { useState } from "react";
import { useContent } from "@/hooks/useContent";

export const HeroSection = () => {
  const [isNavigating, setIsNavigating] = useState(false);
  const { checkLimit, isBlocked } = useRateLimit({
    key: 'hero_cta',
    preset: 'bookingButton',
  });
  const { getBlockContent, getBlockButton } = useContent('home');

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

      {/* Energy Waves - Scientific Pattern */}
      <div className="energy-waves">
        <div className="energy-wave"></div>
        <div className="energy-wave"></div>
        <div className="energy-wave"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-32 text-center">
        {/* Simple badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-dark border border-accent/20 mb-12 animate-fade-in">
          <span className="text-sm text-primary-foreground/80">{getBlockContent('hero-badge') || 'Метод энерготерапии ERA'}</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif font-bold text-white mb-6 animate-slide-up leading-[1.05] tracking-tight">
          {(getBlockContent('hero-title') || 'Раскройте\nсвой потенциал').split('\n').map((line, i, arr) => (
            <span key={i}>
              {i === arr.length - 1 ? <span className="text-accent inline-block mt-2">{line}</span> : line}
              {i < arr.length - 1 && <br />}
            </span>
          ))}
        </h1>
        
        <p className="text-xl sm:text-2xl text-accent mb-16 max-w-2xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: '0.1s' }}>
          {getBlockContent('hero-subtitle') || 'Трансформация через энергию'}
        </p>

        {/* CTA Button */}
        <div className="flex justify-center animate-slide-up mb-24" style={{ animationDelay: '0.2s' }}>
          <Link to={getBlockButton('hero-cta').link || '/masters'} onClick={handleMastersClick} className="w-full sm:w-auto max-w-md">
            <button 
              disabled={isBlocked || isNavigating}
              className="w-full group relative bg-white text-brand-green font-semibold text-base px-10 py-4 rounded-2xl transition-all duration-200 hover:scale-[1.01] shadow-[0_8px_24px_rgba(255,255,255,0.2)] hover:shadow-[0_12px_32px_rgba(255,255,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span className="flex items-center justify-center gap-2">
                {isNavigating ? 'Переход...' : (getBlockButton('hero-cta').text || 'Записаться на сессию')}
                {!isNavigating && <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>}
              </span>
            </button>
          </Link>
        </div>

        {/* Energy System Test */}
        <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="max-w-2xl mx-auto">
            <div className="relative bg-white rounded-[2rem] p-10 shadow-[0_16px_48px_rgba(0,0,0,0.12)]">
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <span className="text-3xl">✨</span>
                </div>
                
                <h2 className="text-2xl md:text-4xl font-serif font-bold mb-4 text-brand-green leading-tight">
                  {getBlockContent('hero-test-title') || 'Анализ вашей энергосистемы'}
                </h2>
                
                <p className="text-base text-brand-green/50 mb-8 leading-relaxed max-w-md mx-auto">
                  {getBlockContent('hero-test-desc') || 'Пройдите бесплатный тест и получите персональные рекомендации от мастеров ERA'}
                </p>
                
                <Link to="/test" onClick={(e) => {
                  if (!checkLimit()) {
                    e.preventDefault();
                  }
                }}>
                  <button 
                    disabled={isBlocked}
                    className="w-full group relative bg-accent text-white font-semibold text-base px-10 py-4 rounded-2xl transition-all duration-200 hover:scale-[1.01] shadow-[0_4px_16px_rgba(180,160,104,0.2)] hover:shadow-[0_8px_24px_rgba(180,160,104,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Пройти бесплатный тест
                      <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
                    </span>
                  </button>
                </Link>
                
                <p className="text-xs text-brand-green/35 mt-5">Более 7 000 человек уже прошли этот тест</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
