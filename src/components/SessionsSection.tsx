import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Heart, Zap, Brain, Sun } from "lucide-react";

export const SessionsSection = () => {
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
    <section id="sessions" className="py-40 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full gradient-radial pointer-events-none"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Метод энергосессий</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-8 animate-slide-up">
            Энергосессии<br/>
            <span className="text-accent">Кундалини ERA</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Прямая передача жизненной энергии для вашей активации и глубокой трансформации
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 mb-24">
          <div className="space-y-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="glass rounded-3xl p-12 shadow-float border border-border/50 interactive-card hover:border-accent/30">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-8">
                <Brain className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-4xl font-serif font-semibold mb-8 leading-tight">
                Что такое<br/>Энергосессия?
              </h3>
              <div className="space-y-6 text-lg text-foreground/70 leading-relaxed">
                <p>
                  Это активация вашей внутренней энергии через поле мастера-проводника.
                </p>
                <p>
                  Вы лежите, расслабляетесь под музыку — энергия работает сама, высвобождая блоки и наполняя ресурсом.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-5 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-4xl font-serif font-semibold mb-10 leading-tight">
              Что вы<br/>почувствуете?
            </h3>
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card 
                  key={index} 
                  className="p-7 shadow-soft border-border/50 hover:shadow-float interactive-card bg-white/80 backdrop-blur-sm group hover:border-accent/30"
                  style={{ animationDelay: `${0.4 + index * 0.05}s` }}
                >
                  <div className="flex items-start gap-5">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <Icon className="w-7 h-7 text-accent" />
                    </div>
                    <p className="text-foreground flex-1 pt-3 text-lg leading-relaxed font-light">{benefit.title}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="text-center animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <Link to="/masters">
            <button className="group relative bg-accent hover:bg-accent/90 text-white font-semibold text-xl px-14 py-7 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] shadow-[0_15px_40px_-10px_rgba(180,160,104,0.4)] hover:shadow-[0_20px_60px_-10px_rgba(180,160,104,0.6)]">
              <span className="relative z-10 flex items-center gap-3">
                Записаться к энерготерапевту
                <span className="inline-block transition-transform group-hover:translate-x-1 text-2xl">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};
