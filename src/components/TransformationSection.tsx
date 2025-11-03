import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Video, BookOpen, MessageCircle, Target } from "lucide-react";

export const TransformationSection = () => {
  const features = [
    {
      icon: Calendar,
      title: "8 недель погружения",
    },
    {
      icon: Video,
      title: "8+ живых групповых энергосессий онлайн",
    },
    {
      icon: BookOpen,
      title: "Теоретические модули в записи",
    },
    {
      icon: Target,
      title: "Ежедневные практики и медитации",
    },
    {
      icon: MessageCircle,
      title: "Чат поддержки с мастером и группой",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Энергопрактикум "Трансформация"
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Глубокое 8-недельное погружение для кардинальных изменений в вашей жизни.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <Card className="p-8 shadow-soft border-border/50">
            <h3 className="text-2xl font-serif font-semibold mb-4">
              О практикуме
            </h3>
            <div className="space-y-4 text-lg text-foreground/80 mb-8">
              <p>
                Это не просто разовые сессии, это полноценный курс, который включает в себя 
                теоретические модули, групповые энергосессии, практические задания и поддержку 
                в закрытом чате.
              </p>
              <p>
                Мы будем работать над ключевыми сферами: отношения, деньги, самореализация, 
                здоровье и внутренний баланс.
              </p>
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

        <div className="text-center">
          <Link to="/transformation">
            <Button 
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-gold text-lg px-8 py-6"
            >
              Узнать подробнее и записаться
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
