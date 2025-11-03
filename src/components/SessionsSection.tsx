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

        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <div className="space-y-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="glass rounded-3xl p-10 shadow-float border border-border/50 interactive-card">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-6">
                <Brain className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-3xl font-serif font-semibold mb-6">
                Что такое Энергосессия?
              </h3>
              <div className="space-y-4 text-lg text-foreground/70 leading-relaxed">
                <p>
                  Это не физическая практика и не массаж. Это процесс активации вашей собственной 
                  внутренней энергии через поле мастера-проводника.
                </p>
                <p>
                  Вы просто лежите, расслабляетесь под музыку и позволяете энергии работать, 
                  высвобождая блоки, снимая напряжение и наполняя вас ресурсом.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-3xl font-serif font-semibold mb-8">
              Что вы можете почувствовать?
            </h3>
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card 
                  key={index} 
                  className="p-6 shadow-soft border-border/50 hover:shadow-gold interactive-card bg-card/50 backdrop-blur-sm group"
                  style={{ animationDelay: `${0.4 + index * 0.05}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <p className="text-foreground flex-1 pt-2 text-lg leading-relaxed">{benefit.title}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="text-center animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <Link to="/masters">
            <Button 
              size="lg"
              className="group relative bg-accent hover:bg-accent/90 text-accent-foreground shadow-gold hover:shadow-float text-xl px-12 py-8 overflow-hidden transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-3">
                Записаться к энерготерапевту
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
