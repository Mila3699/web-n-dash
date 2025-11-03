import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";
import { testQuestions } from "@/data/testQuestions";
import confetti from "canvas-confetti";

const EnergyTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const questions = testQuestions;

  const getResultInterpretation = (score: number) => {
    if (score <= 19) {
      return {
        level: "Кундалини пока «спит»",
        description: "Канал закрыт, тело зажато, энергия течёт слабо. Возможно, вы даже не чувствуете связь со своим телом и интуицией. Скорее всего, подавляете эмоции, закрываете сердце, чтобы не чувствовать боли, есть эмоциональные блоки, подсознательные страхи.",
        details: "У вас огромный потенциал и ваша энергоемкость и внутренняя сила практически не раскрыты. Активировав энергию кундалини - свою жизненную энергию, вы сможете в своей жизни запустить большие изменения во всех ее сферах.",
        recommendations: [
          "Начните с нескольких энергосессий активации Кундалини, чтобы постепенно пробудить энергию.",
          "Каждая сессия будет мягко убирать блоки, возвращать чувствительность, раскрывать сердце и включать естественные процессы в теле.",
          "Вы заметите первые изменения: больше энергии, спокойствия, улучшение сна и состояния здоровья, сердце начнет открываться любви."
        ],
        links: [
          { text: "Онлайн-энергосессия", url: "https://anastasiasolo.ru/kundalini-activation" },
          { text: "Энергопрактикум «Трансформация»", url: "https://era-academy.com/transformation" }
        ],
        color: "text-red-600"
      };
    } else if (score <= 32) {
      return {
        level: "Частичная чувствительность",
        description: "У вас уже есть определённая чувствительность и движение энергии, но пока она идёт рывками. Частично активируются только верхние или только нижние центры, баланс не выстроен.",
        details: "У вас большой потенциал в раскрытии своих способностей и активации своей внутренней силы.",
        recommendations: [
          "Приходите на сессию активации кундалини, несколько сессий помогут вам выровнять поток, раскрыть сердце, усилить интуицию.",
          "Энергия начнёт циркулировать равномерно, ее станет заметно больше, перестанете часто уставать, уйдёт внутреннее напряжение, усилится контакт с телом и сердцем.",
          "Если вы работаете с людьми (помогающий практик), вы начнете сильнее их чувствовать и читать их поле. Усилите свою энергию и научитесь управлять ей, чтобы не выгорать."
        ],
        links: [
          { text: "Онлайн-энергосессия", url: "https://anastasiasolo.ru/kundalini-activation" },
          { text: "Энергопрактикум «Трансформация»", url: "https://era-academy.com/transformation" }
        ],
        color: "text-orange-600"
      };
    } else if (score <= 43) {
      return {
        level: "Кундалини частично активирована",
        description: "Но есть куда расширять свой канал и усилить ее. Вы уже проходили внутренние трансформации и чувствовали движение энергии, но оно нестабильно. Поток легко сбивается стрессом или нагрузкой.",
        details: "Скорее всего, вы работаете над собой, пробуете разные инструменты, убираете блоки, ищите себя. Это классно! Но ваш потенциал гораздо больше. Вы можете значительно расширить свой энергоканал, активировав кундалини и качественно изменить свою жизнь, ускорив свои трансформации.",
        recommendations: [
          "Вам хватит нескольких сессий для расширения своего энергоканала.",
          "Если вы работаете с людьми (помогающий практик), вы начнете сильнее их чувствовать и читать их поле.",
          "После сессий вы почувствуете устойчивое чувство внутренней силы, ясное восприятие, рост интуиции и ясночувствования, раскрытие сердца — поток безусловной любви ко всем.",
          "Из вас получится хороший проводник-фасилитатор энергии кундалини, если вам интересно идти глубже и дальше в свои трансформации и в работу с людьми."
        ],
        links: [
          { text: "Онлайн-энергосессия", url: "https://anastasiasolo.ru/kundalini-activation" },
          { text: "Энергопрактикум «Трансформация»", url: "https://era-academy.com/transformation" }
        ],
        color: "text-yellow-600"
      };
    } else if (score <= 51) {
      return {
        level: "Кундалини активно проявлена",
        description: "Канал работает, поток сильный, тело проводит энергию. Скорее всего, вы уже много работали над собой, проходили мощные трансформации и готовы к следующему шагу.",
        details: "Возможно, для еще более мощной проводимости нужно дораскрыть сердечный центр.",
        recommendations: [
          "Обязательно пройдите хотя бы одну сессию у Анастасии, чтобы получить обратную связь о вашей готовности к дальнейшему раскрытию канала.",
          "Если вы работаете с людьми (помогающий практик), вы начнете еще сильнее их чувствовать и читать их поле.",
          "Даже одна практика на этом уровне даст очень глубокий эффект: расширение сознания, усиление способностей, ощущение лёгкости и внутренней тишины.",
          "Из вас получится хороший проводник-фасилитатор энергии кундалини, если вам интересно идти глубже и дальше в свои трансформации и в работу с людьми."
        ],
        links: [
          { text: "Онлайн-энергосессия", url: "https://anastasiasolo.ru/kundalini-activation" },
          { text: "Энергопрактикум «Трансформация»", url: "https://era-academy.com/transformation" }
        ],
        color: "text-green-600"
      };
    } else {
      return {
        level: "Вы живёте в потоке",
        description: "У вас прокаченный энергоканал, вы сильный проводник. Ваш канал готов к постоянному проведению энергии. Возможно у вас уже активированы способности — яснознание, ясновидение и др.",
        details: "Скорее всего, вы уже работаете с людьми, возможно иногда чувствуете выгорание, так как не умеете управлять своей энергией. Возможно, иногда нарушается баланс между духовным и материальным.",
        recommendations: [
          "Самый логичный шаг для вас, обучение на энерготерапевта-фасилитатора Кундалини и Non-duality энергии.",
          "Вы сможете активировать энергию другим, проводить глубокие трансформации, стать сильным проводником.",
          "Это может стать не просто новой профессией, а новым этапом вашей жизни и развития.",
          "А если вы работаете с людьми с помощью других инструментов и методов, то обучение на энерготерапевта еще больше расширит ваш канал проводника.",
          "Обязательно пройдите хотя бы одну энергосессию, чтобы получить обратную связь о вашей готовности к дальнейшему раскрытию канала."
        ],
        links: [
          { text: "Онлайн-энергосессия", url: "https://anastasiasolo.ru/kundalini-activation" }
        ],
        color: "text-blue-600"
      };
    }
  };

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResult = () => {
    const totalScore = answers.reduce((sum, answer) => sum + answer, 0);
    setScore(totalScore);
    setShowResult(true);
  };

  useEffect(() => {
    if (showResult) {
      // Запускаем конфетти при показе результатов
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Золотые и зеленые цвета для конфетти
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#b4a068', '#193c2e', '#fdfcf7', '#d4af37']
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#b4a068', '#193c2e', '#fdfcf7', '#d4af37']
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [showResult]);

  const restartTest = () => {
    setShowResult(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setScore(0);
  };

  if (showResult) {
    const result = getResultInterpretation(score);

    return (
      <div className="min-h-screen">
        <Navigation />
        
        <main className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
              <Card className="p-8 shadow-soft border-border/50 animate-scale-in">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 mb-4">
                    <span className="text-3xl font-bold text-accent">{score}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">баллов из 57</p>
                  <h2 className={`text-3xl font-serif font-bold mb-4 ${result.color}`}>
                    {result.level}
                  </h2>
                  <p className="text-lg text-foreground/80 mb-4">
                    {result.description}
                  </p>
                  {result.details && (
                    <p className="text-foreground/70 mb-6">
                      {result.details}
                    </p>
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Рекомендации:</h3>
                    <ul className="space-y-3 mb-6">
                      {result.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-foreground/80">{rec}</span>
                        </li>
                      ))}
                    </ul>

                    {result.links && result.links.length > 0 && (
                      <div className="space-y-3 mb-6">
                        {result.links.map((link, index) => (
                          <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                          >
                            <Button
                              variant="outline"
                              className="w-full hover:bg-accent/10"
                            >
                              {link.text} →
                            </Button>
                          </a>
                        ))}
                      </div>
                    )}

                    <div className="p-4 bg-muted/30 rounded-lg">
                      <p className="text-sm text-center text-muted-foreground italic">
                        Напоминаем: тест даёт лишь ориентир. Чтобы точно понять свой уровень - приходите хотя бы на одну энергосессию и получите обратную связь от Анастасии.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button
                      onClick={restartTest}
                      variant="outline"
                      className="flex-1"
                    >
                      Пройти тест заново
                    </Button>
                    <Button
                      onClick={() => window.location.href = '/masters'}
                      className="flex-1 bg-accent hover:bg-accent/90"
                    >
                      Выбрать энерготерапевта
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main>
        <section className="bg-brand-green py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                Тест энергосистемы
              </Badge>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-white">
                Анализ состояния вашей энергосистемы
              </h1>
              <p className="text-xl text-white/90 mb-4">
                Уровень её потенциала
              </p>
              <p className="text-lg text-white/80">
                Ответьте на {questions.length} вопросов по шкале от 0 до 3
              </p>
            </div>
          </div>
        </section>
        
        <div className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">

            <Card className="p-8 shadow-soft border-border/50">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-muted-foreground">
                    Вопрос {currentQuestion + 1} из {questions.length}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                  </span>
                </div>
                <Progress value={((currentQuestion + 1) / questions.length) * 100} className="mb-6" />
              </div>

              <div className="mb-6 p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-center font-medium">
                  Отвечайте по шкале:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-xs text-muted-foreground">
                  <div className="text-center">0 — нет, не про меня</div>
                  <div className="text-center">1 — иногда так бывает</div>
                  <div className="text-center">2 — часто замечаю</div>
                  <div className="text-center">3 — это про меня постоянно</div>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-8 animate-fade-in">
                {questions[currentQuestion]}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                {[0, 1, 2, 3].map((value, index) => (
                  <Button
                    key={value}
                    onClick={() => handleAnswer(value)}
                    variant={answers[currentQuestion] === value ? "default" : "outline"}
                    className={`h-auto py-6 text-lg font-bold transition-all duration-300 hover-scale ${
                      answers[currentQuestion] === value 
                        ? "bg-accent hover:bg-accent/90 shadow-gold" 
                        : ""
                    }`}
                    style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                  >
                    {value}
                  </Button>
                ))}
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handlePrevious}
                  variant="outline"
                  disabled={currentQuestion === 0}
                  className="flex-1"
                >
                  Назад
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={answers[currentQuestion] === undefined}
                  className="flex-1 bg-accent hover:bg-accent/90"
                >
                  {currentQuestion === questions.length - 1 ? "Показать результат" : "Далее"}
                </Button>
              </div>
            </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EnergyTest;
