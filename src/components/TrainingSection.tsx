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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Станьте Фасилитатором Кундалини ERA
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Обучение, которое открывает вам двери в новую профессию и миссию
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <Card className="p-8 shadow-soft border-border/50 mb-8">
            <h3 className="text-2xl font-serif font-semibold mb-4">
              Об обучении
            </h3>
            <div className="space-y-4 text-lg text-foreground/80">
              <p>
                Это 3-месячная программа, которая включает в себя глубокое погружение в метод, 
                работу с собственными блоками, обучение работе с группой и индивидуально, 
                а также основы маркетинга и продвижения для мастера.
              </p>
              <p>
                Наша миссия — подготовить сильных, этичных и чистых проводников, которые будут 
                нести энергию ERA в мир.
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

        <div className="text-center">
          <Link to="/training">
            <Button 
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-gold text-lg px-8 py-6"
            >
              Записаться на обучение
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
