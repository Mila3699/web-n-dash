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
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-dark border border-accent/30 mb-12 animate-fade-in backdrop-blur-xl">
          <span className="w-2 h-2 bg-accent rounded-full animate-glow"></span>
          <span className="text-sm font-medium text-primary-foreground/90 tracking-wide">Метод энерготерапии ERA</span>
        </div>
        
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif font-bold text-white mb-10 animate-slide-up leading-[1.1] tracking-tight">
          Раскройте<br/>
          <span className="text-accent inline-block mt-2">свой потенциал</span>
        </h1>
        
        <p className="text-xl sm:text-2xl md:text-3xl text-white/70 mb-16 max-w-2xl mx-auto animate-slide-up font-light leading-relaxed" style={{ animationDelay: '0.1s' }}>
          Трансформация через энергию
        </p>

        {/* CTA Button */}
        <div className="flex justify-center animate-slide-up mb-24" style={{ animationDelay: '0.2s' }}>
          <Link to="/masters" className="w-full sm:w-auto max-w-md">
            <button className="w-full group relative bg-white text-brand-green font-medium text-xl px-12 py-6 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] shadow-[0_20px_60px_-15px_rgba(255,255,255,0.3)] hover:shadow-[0_25px_80px_-15px_rgba(255,255,255,0.5)]">
              <span className="relative z-10 flex items-center justify-center gap-3">
                Записаться на сессию
                <span className="inline-block transition-transform group-hover:translate-x-1 text-2xl">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            </button>
          </Link>
        </div>

        {/* Energy System Test - HERO FEATURE */}
        <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="max-w-2xl mx-auto">
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-accent/30 via-white/20 to-accent/30 rounded-[2rem] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 animate-glow"></div>
              
              {/* Main card */}
              <div className="relative bg-white rounded-3xl p-12 shadow-[0_30px_90px_-15px_rgba(0,0,0,0.3)]">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center shadow-xl">
                    <span className="text-5xl">✨</span>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-brand-green leading-tight">
                    Анализ вашей<br/>энергосистемы
                  </h2>
                  
                  <p className="text-xl text-brand-green/60 mb-10 leading-relaxed max-w-md mx-auto">
                    Узнайте уровень потенциала за 5 минут
                  </p>
                  
                  <Link to="/test">
                    <button className="w-full group relative bg-accent hover:bg-accent/90 text-white font-semibold text-xl px-10 py-6 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-[0_15px_40px_-10px_rgba(180,160,104,0.4)] hover:shadow-[0_20px_60px_-10px_rgba(180,160,104,0.6)]">
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        Пройти бесплатный тест
                        <span className="inline-block transition-transform group-hover:translate-x-1 text-2xl">→</span>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                    </button>
                  </Link>
                  
                  <p className="text-sm text-brand-green/40 mt-6">Более 7 000 человек уже прошли этот тест</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
