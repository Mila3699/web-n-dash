import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Sparkles, Heart, Zap, Brain, Sun } from "lucide-react";
import { useRateLimit } from "@/hooks/useRateLimit";
import { safeOpenLink } from "@/lib/sanitize";
import sessionImage from "@/assets/session-3.jpg";

export const SessionsSection = () => {
  const { checkLimit, isBlocked } = useRateLimit({
    key: 'sessions_cta',
    preset: 'bookingButton',
  });

  const benefits = [
    {
      icon: Brain,
      title: "Глубокое медитативное состояние и расслабление",
    },
    {
      icon: Heart,
      title: "Освобождение от эмоциональных блоков (слёзы, смех)",
    },
    {
      icon: Zap,
      title: "Прилив жизненных сил, тепла или вибраций в теле",
    },
    {
      icon: Sparkles,
      title: "Состояние ясности, инсайтов и связи с собой",
    },
    {
      icon: Sun,
      title: "Ощущение безусловной любви и принятия",
    },
  ];

  return (
    <section id="sessions" className="py-32 bg-background relative overflow-hidden">
      {/* Subtle Energy Grid */}
      <div className="energy-grid opacity-50"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Метод энергосессий</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 animate-slide-up">
            Энергосессии<br/>
            <span className="text-accent">Кундалини ERA</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Прямая передача жизненной энергии для вашей активации и глубокой трансформации
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {/* Image */}
            <div className="mb-8">
              <div className="rounded-2xl overflow-hidden shadow-gold">
                <img 
                  src={sessionImage} 
                  alt="Энергосессия Кундалини ERA"
                  className="w-full h-[300px] object-cover"
                />
              </div>
            </div>

            <div className="glass rounded-3xl p-10 shadow-soft border border-border/50">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                <Brain className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-3xl font-serif font-semibold mb-6 leading-tight">
                Что такое<br/>Энергосессия?
              </h3>
              <div className="space-y-4 text-lg text-foreground/60 leading-relaxed">
                <p>
                  Это активация вашей внутренней энергии через поле мастера-проводника.
                </p>
                <p>
                  Вы лежите, расслабляетесь под музыку — энергия работает сама, высвобождая блоки и наполняя ресурсом.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-3xl font-serif font-semibold mb-8 leading-tight">
              Что вы<br/>почувствуете?
            </h3>
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card 
                  key={index} 
                  className="p-6 shadow-soft border-border/50 bg-white/80 backdrop-blur-sm group hover:border-accent/20 transition-all duration-200"
                  style={{ animationDelay: `${0.4 + index * 0.05}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-accent/10 flex-shrink-0">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <p className="text-foreground/70 flex-1 pt-2 text-base leading-relaxed">{benefit.title}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="text-center animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <Link to="/masters" onClick={(e) => {
            if (!checkLimit()) {
              e.preventDefault();
            }
          }}>
            <button 
              disabled={isBlocked}
              className="group relative bg-accent text-white font-semibold text-lg px-12 py-5 rounded-2xl transition-all duration-200 hover:scale-[1.01] shadow-[0_4px_16px_rgba(180,160,104,0.2)] hover:shadow-[0_8px_24px_rgba(180,160,104,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="flex items-center gap-2.5">
                Записаться к энерготерапевту
                <span className="inline-block transition-transform group-hover:translate-x-0.5 text-xl">→</span>
              </span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};
