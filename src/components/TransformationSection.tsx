import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Video, BookOpen, MessageCircle, Target } from "lucide-react";
import { useContent } from "@/hooks/useContent";

export const TransformationSection = () => {
  const { getBlockContent } = useContent('home');
  
  const features = [
    {
      icon: Calendar,
      title: getBlockContent('course-structure-1') || "8 недель погружения",
    },
    {
      icon: Video,
      title: getBlockContent('course-structure-2') || "8+ живых групповых энергосессий онлайн",
    },
    {
      icon: BookOpen,
      title: getBlockContent('course-structure-3') || "Теоретические модули в записи",
    },
    {
      icon: Target,
      title: getBlockContent('course-structure-4') || "Ежедневные практики и медитации",
    },
    {
      icon: MessageCircle,
      title: getBlockContent('course-structure-5') || "Чат поддержки с мастером и группой",
    },
  ];

  return (
    <section id="transformation" className="py-40 bg-muted/30 relative overflow-hidden">
      {/* Energy Orbs */}
      <div className="energy-orb absolute top-0 right-0"></div>
      <div className="energy-orb absolute bottom-0 left-0"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6 animate-fade-in">
            <Target className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">{getBlockContent('transformation-badge') || '8-недельная программа'}</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-8 animate-slide-up">
            {(getBlockContent('transformation-title') || 'Энергопрактикум\n"Трансформация"').split('\n').map((line, i, arr) => (
              <span key={i}>
                {i === arr.length - 1 ? <span className="text-accent">{line}</span> : line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            {getBlockContent('transformation-subtitle') || 'Раскрытие твоего потенциала через активацию кундалини энергии, очищение энергополя и восстановление твоей энергосистемы'}
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <Card className="p-8 shadow-soft border-border/50">
            <h3 className="text-2xl font-serif font-semibold mb-4">
              О практикуме
            </h3>
            <div className="space-y-4 text-lg text-foreground/80 mb-8">
              {(getBlockContent('transformation-about') || 'Это системная работа с вашей энергоструктурой. Метод энерготерапии ERA объединяет активацию кундалини, чтение и очищение энергополя, а также восстановление энергосистемы для глубинных трансформаций.\n\nЭнергопрактикум работает как катализатор — многократно ускоряет процессы изменений в вашей жизни. События начинают происходить быстрее, возможности раскрываются, нужные люди и ресурсы притягиваются естественным образом.').split('\n\n').map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <h4 className="text-xl font-serif font-semibold mb-6">
              Структура курса
            </h4>
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-accent/10 flex-shrink-0">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <p className="text-foreground">{feature.title}</p>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        <div className="text-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <Link to="/transformation">
            <Button 
              size="lg"
              variant="outline"
              className="group border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground text-lg px-10 py-7 transition-all duration-300 hover:scale-105 hover:shadow-float"
            >
              <span className="flex items-center gap-2">
                Узнать подробнее
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
