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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Энергосессии Кундалини ERA
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Прямая передача жизненной энергии для вашей активации и глубокой трансформации.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-3xl font-serif font-semibold mb-6">
              Что такое Энергосессия?
            </h3>
            <div className="space-y-4 text-lg text-foreground/80">
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

          <div>
            <h3 className="text-3xl font-serif font-semibold mb-6">
              Что вы можете почувствовать?
            </h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card key={index} className="p-4 shadow-soft border-border/50 hover:shadow-gold transition-shadow">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-accent/10">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <p className="text-foreground flex-1 pt-1">{benefit.title}</p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link to="/masters">
            <Button 
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-gold text-lg px-8 py-6"
            >
              Записаться к энерготерапевту
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
