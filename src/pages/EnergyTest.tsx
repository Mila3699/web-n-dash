import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, ArrowLeft, Trophy, Zap, Heart, Brain, Star } from "lucide-react";
import { testQuestions } from "@/data/testQuestions";
import confetti from "canvas-confetti";

const EnergyTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

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
    
    // Автоматический переход на следующий вопрос с задержкой
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        handleNext();
      }
    }, 300);
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setIsTransitioning(false);
      } else {
        calculateResult();
      }
    }, 200);
  };

  const handlePrevious = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (currentQuestion > 0) {
        setCurrentQuestion(currentQuestion - 1);
        setIsTransitioning(false);
      }
    }, 200);
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
      const defaults = { startVelocity: 30, spread: 360, ticks: 80, zIndex: 1000 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 60 * (timeLeft / duration);
        
        // Золотые и зеленые цвета для конфетти
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#b4a068', '#193c2e', '#fdfcf7', '#d4af37', '#ffffff'],
          shapes: ['circle', 'square'],
          scalar: randomInRange(0.8, 1.2)
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#b4a068', '#193c2e', '#fdfcf7', '#d4af37', '#ffffff'],
          shapes: ['circle', 'square'],
          scalar: randomInRange(0.8, 1.2)
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
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="py-32">
          <div className="container mx-auto px-6 sm:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Celebration Header */}
              <div className="text-center mb-20 animate-fade-in">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-accent mb-12 animate-scale-in">
                  <Trophy className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-5xl md:text-6xl font-serif font-light mb-8 text-foreground">
                  Ваш результат
                </h1>
                <div className="flex items-center justify-center gap-8 mb-6">
                  <div className="h-px w-16 bg-border"></div>
                  <span className="text-7xl md:text-8xl font-light text-accent">
                    {score}
                  </span>
                  <div className="h-px w-16 bg-border"></div>
                </div>
                <p className="text-base text-muted-foreground font-light">из 57 баллов</p>
              </div>

              {/* Result Card */}
              <Card className="overflow-hidden border mb-12 animate-scale-in" style={{ animationDelay: '0.2s' }}>
                {/* Color Status Bar */}
                <div className={`h-1 ${
                  score <= 19 ? 'bg-red-500' :
                  score <= 32 ? 'bg-orange-500' :
                  score <= 43 ? 'bg-yellow-500' :
                  score <= 51 ? 'bg-green-500' :
                  'bg-blue-500'
                }`}></div>
                
                <div className="p-12 md:p-16">
                  {/* Status Badge with Icon */}
                  <div className="flex justify-center mb-12">
                    <Badge className={`${result.color} text-lg px-6 py-2 gap-2 font-light border-0`}>
                      {score <= 19 ? <Zap className="w-4 h-4" /> :
                       score <= 32 ? <Heart className="w-4 h-4" /> :
                       score <= 43 ? <Brain className="w-4 h-4" /> :
                       score <= 51 ? <Sparkles className="w-4 h-4" /> :
                       <Star className="w-4 h-4" />}
                      {result.level}
                    </Badge>
                  </div>

                  {/* Description */}
                  <div className="space-y-8 mb-16">
                    <div className="bg-muted/30 rounded-2xl p-10 border border-border/50">
                      <p className="text-xl leading-relaxed text-foreground/80 font-light text-center">
                        {result.description}
                      </p>
                    </div>
                    {result.details && (
                      <div className="bg-accent/5 rounded-2xl p-10 border border-accent/10">
                        <p className="text-lg text-foreground/70 leading-relaxed font-light text-center">
                          {result.details}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Recommendations */}
                  <div className="mb-16">
                    <h3 className="text-3xl font-serif font-light mb-10 text-foreground">
                      Персональные рекомендации
                    </h3>
                    <div className="space-y-4">
                      {result.recommendations.map((rec, index) => (
                        <div 
                          key={index} 
                          className="flex items-start gap-6 p-8 rounded-xl bg-background border border-border hover:border-accent/30 transition-all duration-300 animate-fade-in"
                          style={{ animationDelay: `${0.1 * index}s` }}
                        >
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center">
                              <span className="text-white font-light text-sm">{index + 1}</span>
                            </div>
                          </div>
                          <span className="text-base text-foreground/80 leading-relaxed font-light flex-1">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Links */}
                  {result.links && result.links.length > 0 && (
                    <div className="grid md:grid-cols-2 gap-4 mb-16">
                      {result.links.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block group"
                        >
                          <div className="p-8 rounded-xl bg-accent/5 border border-accent/20 hover:border-accent/40 transition-all duration-300">
                            <div className="flex items-center justify-between">
                              <span className="font-light text-lg">{link.text}</span>
                              <ArrowRight className="w-5 h-5 text-accent group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Info Note */}
                  <div className="bg-muted/20 rounded-xl p-8 border border-border/50 mb-12">
                    <p className="text-sm text-center text-muted-foreground leading-relaxed font-light">
                      Тест даёт общий ориентир для понимания вашего текущего состояния. Для точной диагностики и персональных рекомендаций приходите на энергосессию и получите профессиональную обратную связь от Анастасии.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button
                      onClick={restartTest}
                      variant="outline"
                      size="lg"
                      className="h-14 text-base font-light group"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                      Пройти тест заново
                    </Button>
                    <Button
                      onClick={() => window.location.href = '/masters'}
                      size="lg"
                      className="h-14 text-base font-light bg-accent hover:bg-accent/90 group"
                    >
                      <span className="flex items-center">
                        Выбрать энерготерапевта
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Social Proof */}
              <div className="text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <p className="text-sm text-muted-foreground font-light mb-2">
                  Более 7000 человек уже прошли этот тест
                </p>
                <div className="flex justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-3 h-3 fill-accent text-accent" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-brand-green py-32">
          <div className="container mx-auto px-6 sm:px-8 relative">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-8 bg-white/10 text-white border-white/20 text-sm px-4 py-1.5 font-light animate-fade-in">
                <Sparkles className="w-3 h-3 mr-1 inline" />
                Диагностика энергосистемы
              </Badge>
              <h1 className="text-5xl md:text-6xl font-serif font-light mb-8 text-white animate-fade-in leading-tight" style={{ animationDelay: '0.1s' }}>
                Анализ состояния<br /><span className="text-brand-gold">вашей энергосистемы</span>
              </h1>
              <p className="text-xl text-white/80 mb-4 animate-fade-in font-light" style={{ animationDelay: '0.2s' }}>
                Узнайте уровень её потенциала
              </p>
              <p className="text-base text-white/60 animate-fade-in max-w-xl mx-auto font-light" style={{ animationDelay: '0.3s' }}>
                Пройдите тест из {questions.length} вопросов и получите персональные рекомендации
              </p>
            </div>
          </div>
        </section>
        
        {/* Test Section */}
        <div className="py-24 md:py-32">
          <div className="container mx-auto px-6 sm:px-8">
            <div className="max-w-3xl mx-auto">
              {/* Progress Header */}
              <div className="mb-16">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <span className="text-sm font-light text-muted-foreground">
                      Вопрос 
                    </span>
                    <span className="text-2xl font-light text-foreground mx-2">{currentQuestion + 1}</span>
                    <span className="text-sm font-light text-muted-foreground">
                      из {questions.length}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-light text-accent">
                      {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                    </div>
                  </div>
                </div>
                <div className="relative h-1 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="absolute inset-y-0 left-0 bg-accent transition-all duration-700 ease-out rounded-full"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question Card */}
              <Card className="overflow-hidden border mb-8">
                <div className="h-0.5 bg-accent"></div>
                
                <div className="p-10 md:p-14">
                  {/* Scale Guide */}
                  <div className="mb-12 p-8 bg-muted/20 rounded-xl border border-border/50">
                    <p className="text-sm text-center font-light mb-6 text-foreground/80">
                      Оцените утверждение по шкале от 0 до 3
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { num: 0, text: 'Нет, не про меня' },
                        { num: 1, text: 'Иногда так бывает' },
                        { num: 2, text: 'Часто замечаю' },
                        { num: 3, text: 'Про меня постоянно' }
                      ].map((item) => (
                        <div 
                          key={item.num} 
                          className={`text-center p-4 bg-background rounded-lg border border-border/30 transition-all duration-200 ${
                            hoveredValue === item.num ? 'border-accent/30' : ''
                          }`}
                          onMouseEnter={() => setHoveredValue(item.num)}
                          onMouseLeave={() => setHoveredValue(null)}
                        >
                          <div className="font-light text-accent text-xl mb-2">{item.num}</div>
                          <div className="text-muted-foreground text-xs leading-tight font-light">{item.text}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Question */}
                  <div className={`mb-16 transition-all duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                    <div className="inline-block px-3 py-1 bg-accent/5 rounded-full mb-6">
                      <span className="text-xs font-light text-accent">Вопрос {currentQuestion + 1}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-serif font-light leading-relaxed text-foreground">
                      {questions[currentQuestion]}
                    </h3>
                  </div>

                  {/* Answer Buttons */}
                  <div className={`grid grid-cols-4 gap-3 mb-12 transition-all duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                    {[0, 1, 2, 3].map((value) => {
                      const isSelected = answers[currentQuestion] === value;
                      const isHovered = hoveredValue === value;
                      
                      return (
                        <Button
                          key={value}
                          onClick={() => handleAnswer(value)}
                          onMouseEnter={() => setHoveredValue(value)}
                          onMouseLeave={() => setHoveredValue(null)}
                          variant={isSelected ? "default" : "outline"}
                          className={`relative h-24 text-2xl font-light transition-all duration-200 ${
                            isSelected
                              ? "bg-accent text-white border-0" 
                              : isHovered
                              ? "border-accent/50 bg-accent/5"
                              : ""
                          }`}
                        >
                          <span>{value}</span>
                          
                          <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-light transition-opacity duration-200 ${
                            isHovered || isSelected ? 'opacity-100' : 'opacity-0'
                          }`}>
                            {['Нет', 'Иногда', 'Часто', 'Постоянно'][value]}
                          </div>
                        </Button>
                      );
                    })}
                  </div>

                  {/* Navigation */}
                  <div className="flex gap-4">
                    <Button
                      onClick={handlePrevious}
                      variant="outline"
                      disabled={currentQuestion === 0}
                      size="lg"
                      className="flex-1 h-12 text-sm font-light disabled:opacity-20 group"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-0.5 transition-transform" />
                      <span className="hidden sm:inline">Предыдущий</span>
                      <span className="sm:hidden">Назад</span>
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={answers[currentQuestion] === undefined}
                      size="lg"
                      className="flex-1 h-12 text-sm font-light bg-accent hover:bg-accent/90 disabled:opacity-40 group"
                    >
                      <span className="flex items-center">
                        {currentQuestion === questions.length - 1 ? (
                          <>
                            <Trophy className="w-4 h-4 mr-2" />
                            <span className="hidden sm:inline">Показать результат</span>
                            <span className="sm:hidden">Результат</span>
                          </>
                        ) : (
                          <>
                            <span className="hidden sm:inline">Следующий</span>
                            <span className="sm:hidden">Далее</span>
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                          </>
                        )}
                      </span>
                    </Button>
                  </div>

                  {/* Progress Dots */}
                  <div className="flex justify-center gap-2 mt-10">
                    {questions.map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 rounded-full transition-all duration-500 ${
                          index === currentQuestion 
                            ? 'w-12 bg-gradient-to-r from-accent to-accent/70' 
                            : index < currentQuestion
                            ? 'w-2 bg-accent/50'
                            : 'w-2 bg-muted'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </Card>

              {/* Encouragement & Tips */}
              <div className="mt-10 space-y-4">
                <div className="text-center animate-fade-in">
                  <p className="text-base text-muted-foreground">
                    💫 Отвечайте интуитивно, доверяйте первому ощущению
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  {[
                    { icon: Zap, text: 'Нет правильных ответов' },
                    { icon: Heart, text: 'Будьте честны с собой' },
                    { icon: Brain, text: 'Это займет ~3 минуты' }
                  ].map((tip, index) => (
                    <div key={index} className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-muted/30 border border-border/30">
                      <tip.icon className="w-5 h-5 text-accent" />
                      <span className="text-sm text-foreground/80">{tip.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EnergyTest;
