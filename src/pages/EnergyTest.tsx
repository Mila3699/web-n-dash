import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check, Sparkles, ArrowRight, ArrowLeft, Trophy } from "lucide-react";
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
      <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
        <Navigation />
        
        <main className="py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              {/* Celebration Header */}
              <div className="text-center mb-12 animate-fade-in">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-accent via-accent/80 to-accent/60 mb-6 shadow-gold animate-scale-in">
                  <Trophy className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                  Ваш результат
                </h1>
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent"></div>
                  <span className="text-6xl font-bold text-accent animate-scale-in" style={{ animationDelay: '0.2s' }}>
                    {score}
                  </span>
                  <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent"></div>
                </div>
                <p className="text-sm text-muted-foreground">из 57 баллов</p>
              </div>

              {/* Result Card */}
              <Card className="overflow-hidden border-0 shadow-2xl animate-scale-in" style={{ animationDelay: '0.3s' }}>
                <div className={`h-2 bg-gradient-to-r ${
                  score <= 19 ? 'from-red-500 to-orange-500' :
                  score <= 32 ? 'from-orange-500 to-yellow-500' :
                  score <= 43 ? 'from-yellow-500 to-green-500' :
                  score <= 51 ? 'from-green-500 to-blue-500' :
                  'from-blue-500 to-purple-500'
                }`}></div>
                
                <div className="p-8 md:p-12">
                  {/* Status Badge */}
                  <div className="flex justify-center mb-8">
                    <Badge className={`${result.color} text-lg px-6 py-2 shadow-lg`}>
                      <Sparkles className="w-4 h-4 mr-2" />
                      {result.level}
                    </Badge>
                  </div>

                  {/* Description */}
                  <div className="space-y-4 mb-8">
                    <div className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-2xl p-6 backdrop-blur">
                      <p className="text-lg leading-relaxed text-foreground/90">
                        {result.description}
                      </p>
                    </div>
                    {result.details && (
                      <div className="bg-accent/5 rounded-2xl p-6 border border-accent/10">
                        <p className="text-foreground/80 leading-relaxed">
                          {result.details}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Recommendations */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
                      <div className="w-1 h-8 bg-accent rounded-full"></div>
                      Персональные рекомендации
                    </h3>
                    <div className="space-y-3">
                      {result.recommendations.map((rec, index) => (
                        <div 
                          key={index} 
                          className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-background to-muted/30 border border-border/50 hover:border-accent/30 transition-all duration-300 animate-fade-in"
                          style={{ animationDelay: `${0.1 * index}s` }}
                        >
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center">
                              <Check className="w-4 h-4 text-accent" />
                            </div>
                          </div>
                          <span className="text-foreground/90 leading-relaxed">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Links */}
                  {result.links && result.links.length > 0 && (
                    <div className="space-y-3 mb-8">
                      {result.links.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block group"
                        >
                          <div className="p-5 rounded-xl bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 hover:border-accent/40 transition-all duration-300 hover:shadow-gold">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-lg">{link.text}</span>
                              <ArrowRight className="w-5 h-5 text-accent group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Info Note */}
                  <div className="bg-gradient-to-br from-muted/80 to-muted/50 rounded-2xl p-6 backdrop-blur border border-border/50">
                    <p className="text-sm text-center text-muted-foreground leading-relaxed italic">
                      💫 Напоминаем: тест даёт лишь ориентир. Чтобы точно понять свой уровень - приходите хотя бы на одну энергосессию и получите обратную связь от Анастасии.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-8">
                    <Button
                      onClick={restartTest}
                      variant="outline"
                      size="lg"
                      className="flex-1 h-14 text-lg border-2 hover:border-accent/50 hover:bg-accent/5"
                    >
                      <ArrowLeft className="w-5 h-5 mr-2" />
                      Пройти тест заново
                    </Button>
                    <Button
                      onClick={() => window.location.href = '/masters'}
                      size="lg"
                      className="flex-1 h-14 text-lg bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 shadow-gold"
                    >
                      Выбрать энерготерапевта
                      <ArrowRight className="w-5 h-5 ml-2" />
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
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/10 to-background">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-green via-brand-green to-[#0f2820] py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(180,160,104,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(180,160,104,0.08),transparent_50%)]"></div>
          
          <div className="container mx-auto px-4 sm:px-6 relative">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur text-sm px-4 py-2 animate-fade-in">
                <Sparkles className="w-3 h-3 mr-1 inline" />
                Диагностика энергосистемы
              </Badge>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 text-white animate-fade-in leading-tight" style={{ animationDelay: '0.1s' }}>
                Анализ состояния<br />вашей энергосистемы
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-4 animate-fade-in font-light" style={{ animationDelay: '0.2s' }}>
                Узнайте уровень её потенциала
              </p>
              <p className="text-lg text-white/70 animate-fade-in max-w-2xl mx-auto" style={{ animationDelay: '0.3s' }}>
                Пройдите тест из {questions.length} вопросов и получите персональные рекомендации
              </p>
            </div>
          </div>
        </section>
        
        {/* Test Section */}
        <div className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              {/* Progress Header */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-muted-foreground">
                    Вопрос <span className="text-foreground font-semibold">{currentQuestion + 1}</span> из {questions.length}
                  </span>
                  <span className="text-sm font-semibold text-accent">
                    {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                  </span>
                </div>
                <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent to-accent/70 transition-all duration-500 ease-out rounded-full"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Question Card */}
              <Card className="overflow-hidden border-0 shadow-2xl backdrop-blur">
                <div className="h-1 bg-gradient-to-r from-accent via-accent/80 to-accent"></div>
                
                <div className="p-8 md:p-12">
                  {/* Scale Guide */}
                  <div className="mb-8 p-6 bg-gradient-to-br from-muted/50 to-muted/30 rounded-2xl border border-border/50">
                    <p className="text-sm text-center font-semibold mb-4 text-foreground/90">
                      Оцените утверждение по шкале:
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                      {[
                        { num: 0, text: 'Нет, не про меня' },
                        { num: 1, text: 'Иногда так бывает' },
                        { num: 2, text: 'Часто замечаю' },
                        { num: 3, text: 'Про меня постоянно' }
                      ].map((item) => (
                        <div key={item.num} className="text-center p-3 bg-background/50 rounded-xl border border-border/30">
                          <div className="font-bold text-accent text-lg mb-1">{item.num}</div>
                          <div className="text-muted-foreground leading-tight">{item.text}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Question */}
                  <div className="mb-10">
                    <h3 className="text-2xl md:text-3xl font-serif font-semibold leading-relaxed text-foreground/95 animate-fade-in">
                      {questions[currentQuestion]}
                    </h3>
                  </div>

                  {/* Answer Buttons */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    {[0, 1, 2, 3].map((value, index) => (
                      <Button
                        key={value}
                        onClick={() => handleAnswer(value)}
                        variant={answers[currentQuestion] === value ? "default" : "outline"}
                        className={`group relative h-24 text-2xl font-bold transition-all duration-300 overflow-hidden ${
                          answers[currentQuestion] === value 
                            ? "bg-gradient-to-br from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-white border-0 shadow-gold scale-105" 
                            : "hover:border-accent/50 hover:bg-accent/5 border-2"
                        }`}
                        style={{ 
                          animationDelay: `${0.1 + index * 0.05}s`,
                          transform: answers[currentQuestion] === value ? 'scale(1.05)' : 'scale(1)'
                        }}
                      >
                        <span className="relative z-10">{value}</span>
                        {answers[currentQuestion] === value && (
                          <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                        )}
                      </Button>
                    ))}
                  </div>

                  {/* Navigation */}
                  <div className="flex gap-4">
                    <Button
                      onClick={handlePrevious}
                      variant="outline"
                      disabled={currentQuestion === 0}
                      size="lg"
                      className="flex-1 h-14 text-lg border-2 hover:border-accent/50 disabled:opacity-30"
                    >
                      <ArrowLeft className="w-5 h-5 mr-2" />
                      Назад
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={answers[currentQuestion] === undefined}
                      size="lg"
                      className="flex-1 h-14 text-lg bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 disabled:opacity-50 shadow-gold"
                    >
                      {currentQuestion === questions.length - 1 ? (
                        <>
                          Показать результат
                          <Trophy className="w-5 h-5 ml-2" />
                        </>
                      ) : (
                        <>
                          Далее
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Encouragement Text */}
              <p className="text-center text-sm text-muted-foreground mt-8 animate-fade-in">
                ✨ Отвечайте интуитивно, первое что приходит в голову
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EnergyTest;
