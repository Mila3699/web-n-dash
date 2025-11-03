import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Award, Users, Video, Globe, TrendingUp } from "lucide-react";

export const TrainingSection = () => {
  const benefits = [
    {
      icon: Award,
      title: "Глубокую личную трансформацию",
    },
    {
      icon: Award,
      title: "Сертификат международного образца",
    },
    {
      icon: Video,
      title: "Навыки проведения онлайн и офлайн сессий",
    },
    {
      icon: Users,
      title: "Доступ в закрытое сообщество мастеров ERA",
    },
    {
      icon: Globe,
      title: "Собственную страницу на нашем сайте и поток клиентов",
    },
  ];

  return (
    <section id="training" className="py-40 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6 animate-fade-in">
            <Award className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Профессиональное обучение</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-8 animate-slide-up">
            Станьте<br/>
            <span className="text-accent">Фасилитатором</span><br/>
            Кундалини ERA
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Метод энерготерапии ERA – системная работа через активацию кундалини, очищение и восстановление энергоструктуры человека
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <Card className="p-8 shadow-soft border-border/50 mb-8">
            <h3 className="text-2xl font-serif font-semibold mb-4">
              Об обучении
            </h3>
            <div className="space-y-4 text-lg text-foreground/80">
              <p>
                Наша цель – помочь вам пробудить ваш внутренний ресурс и стать сильными 
                проводниками трансформации для других.
              </p>
              <p>
                Это новое пространство для глубокого изучения энергии Кундалини и развития 
                уникальных навыков энерготерапевта-фасилитатора. Здесь встречаются осознанность, 
                наука и практика.
              </p>
            </div>
          </Card>

          <Card className="p-8 shadow-soft border-border/50">
            <h4 className="text-xl font-serif font-semibold mb-6">
              Что вы получите?
            </h4>
            <div className="space-y-4">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-accent/10 flex-shrink-0 mt-1">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <p className="text-foreground text-lg flex-1">{benefit.title}</p>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        <div className="text-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <Link to="/training">
            <Button 
              size="lg"
              variant="outline"
              className="group border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground text-lg px-10 py-7 transition-all duration-300 hover:scale-105 hover:shadow-float"
            >
              <span className="flex items-center gap-2">
                Узнать об обучении
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
