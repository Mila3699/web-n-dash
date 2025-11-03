import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { TransformationSection } from "@/components/TransformationSection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const Transformation = () => {
  const modules = [
    {
      week: "Неделя 1",
      title: "Диагностика и очищение",
      topics: ["Анализ текущего состояния", "Работа с блоками", "Первая групповая сессия"]
    },
    {
      week: "Неделя 2",
      title: "Энергия отношений",
      topics: ["Проработка отношений", "Освобождение от прошлого", "Практики на привлечение"]
    },
    {
      week: "Неделя 3-4",
      title: "Денежный поток",
      topics: ["Блоки изобилия", "Энергия денег", "Практики на материализацию"]
    },
    {
      week: "Неделя 5-6",
      title: "Самореализация",
      topics: ["Раскрытие предназначения", "Таланты и способности", "Уверенность в себе"]
    },
    {
      week: "Неделя 7",
      title: "Здоровье и тело",
      topics: ["Исцеление тела", "Энергия здоровья", "Баланс систем"]
    },
    {
      week: "Неделя 8",
      title: "Интеграция",
      topics: ["Закрепление результатов", "Финальная трансформация", "Планирование будущего"]
    }
  ];

  const includes = [
    "8 живых групповых энергосессий онлайн с Анастасией",
    "Доступ к закрытой платформе с материалами",
    "Теоретические модули в записи",
    "Ежедневные практики и медитации",
    "Чат поддержки с мастером и группой",
    "Рабочая тетрадь практикума",
    "Сертификат о прохождении",
    "Доступ к материалам на 6 месяцев"
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center bg-brand-green">
          <div className="container mx-auto px-4 sm:px-6 py-20 text-center">
            <Badge className="mb-6 bg-accent/20 text-accent-foreground border-accent">
              8-недельный практикум
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-primary-foreground mb-6 animate-fade-in">
              Энергопрактикум "Трансформация"
            </h1>
            <p className="text-lg sm:text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Глубокое 8-недельное погружение для кардинальных изменений в ключевых сферах жизни: 
              отношения, деньги, самореализация, здоровье и внутренний баланс.
            </p>
            <Button 
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-gold text-lg px-8 py-6 animate-fade-in"
              style={{ animationDelay: '0.4s' }}
            >
              Записаться на практикум
            </Button>
          </div>
        </section>

        {/* Program Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-16">
              Программа практикума
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {modules.map((module, index) => (
                <Card key={index} className="p-6 shadow-soft border-border/50 hover:shadow-gold transition-shadow">
                  <Badge className="mb-3 bg-accent/10 text-accent border-accent/20">
                    {module.week}
                  </Badge>
                  <h3 className="text-2xl font-serif font-bold mb-4">
                    {module.title}
                  </h3>
                  <ul className="space-y-2">
                    {module.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/80">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-12">
                Что входит в практикум
              </h2>
              <Card className="p-8 shadow-soft border-border/50">
                <div className="grid sm:grid-cols-2 gap-4">
                  {includes.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/80">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-12">
                Результаты практикума
              </h2>
              <Card className="p-8 shadow-soft border-border/50">
                <div className="space-y-4 text-lg text-foreground/80 leading-relaxed">
                  <p>
                    ✨ <strong>Глубокая трансформация</strong> на всех уровнях: физическом, эмоциональном, ментальном и духовном
                  </p>
                  <p>
                    💰 <strong>Проработка денежных блоков</strong> и открытие канала изобилия
                  </p>
                  <p>
                    💖 <strong>Гармонизация отношений</strong> с собой и окружающими, освобождение от токсичных связей
                  </p>
                  <p>
                    🎯 <strong>Раскрытие предназначения</strong> и уверенное движение к целям
                  </p>
                  <p>
                    🌿 <strong>Восстановление энергии</strong> и жизненных сил, улучшение физического здоровья
                  </p>
                  <p>
                    ⚡ <strong>Повышение вибраций</strong> и выход на новый уровень сознания
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Готовы к трансформации?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Начните свой путь к глубоким изменениям уже сейчас. Количество мест ограничено.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-gold text-lg px-8 py-6"
              >
                Записаться на практикум
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6"
              >
                Задать вопрос
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Transformation;
