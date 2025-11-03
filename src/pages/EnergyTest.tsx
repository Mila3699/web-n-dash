import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";

const EnergyTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 1,
      question: "Как часто вы чувствуете усталость без видимых причин?",
      options: [
        { value: "1", label: "Редко или никогда", points: 1 },
        { value: "2", label: "Иногда", points: 2 },
        { value: "3", label: "Часто", points: 3 },
        { value: "4", label: "Постоянно", points: 4 }
      ]
    },
    {
      id: 2,
      question: "Насколько легко вам концентрироваться на важных задачах?",
      options: [
        { value: "1", label: "Очень легко", points: 1 },
        { value: "2", label: "Достаточно легко", points: 2 },
        { value: "3", label: "С трудом", points: 3 },
        { value: "4", label: "Очень сложно", points: 4 }
      ]
    },
    {
      id: 3,
      question: "Как вы оцениваете качество своего сна?",
      options: [
        { value: "1", label: "Отличное", points: 1 },
        { value: "2", label: "Хорошее", points: 2 },
        { value: "3", label: "Удовлетворительное", points: 3 },
        { value: "4", label: "Плохое", points: 4 }
      ]
    },
    {
      id: 4,
      question: "Насколько вы удовлетворены своими отношениями с окружающими?",
      options: [
        { value: "1", label: "Полностью удовлетворен", points: 1 },
        { value: "2", label: "В основном удовлетворен", points: 2 },
        { value: "3", label: "Не очень удовлетворен", points: 3 },
        { value: "4", label: "Совсем не удовлетворен", points: 4 }
      ]
    },
    {
      id: 5,
      question: "Как часто вы испытываете тревогу или беспокойство?",
      options: [
        { value: "1", label: "Редко", points: 1 },
        { value: "2", label: "Иногда", points: 2 },
        { value: "3", label: "Часто", points: 3 },
        { value: "4", label: "Постоянно", points: 4 }
      ]
    },
    {
      id: 6,
      question: "Чувствуете ли вы, что реализуете свой потенциал?",
      options: [
        { value: "1", label: "Да, полностью", points: 1 },
        { value: "2", label: "В основном да", points: 2 },
        { value: "3", label: "Не совсем", points: 3 },
        { value: "4", label: "Нет", points: 4 }
      ]
    },
    {
      id: 7,
      question: "Как вы оцениваете свой уровень жизненной энергии?",
      options: [
        { value: "1", label: "Очень высокий", points: 1 },
        { value: "2", label: "Средний", points: 2 },
        { value: "3", label: "Низкий", points: 3 },
        { value: "4", label: "Очень низкий", points: 4 }
      ]
    },
    {
      id: 8,
      question: "Насколько легко вам принимать важные решения?",
      options: [
        { value: "1", label: "Очень легко", points: 1 },
        { value: "2", label: "Достаточно легко", points: 2 },
        { value: "3", label: "С трудом", points: 3 },
        { value: "4", label: "Очень сложно", points: 4 }
      ]
    }
  ];

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    let totalPoints = 0;
    Object.entries(answers).forEach(([questionIndex, answerValue]) => {
      const question = questions[parseInt(questionIndex)];
      const option = question.options.find(opt => opt.value === answerValue);
      if (option) {
        totalPoints += option.points;
      }
    });
    return totalPoints;
  };

  const getResultsMessage = (points: number) => {
    if (points <= 12) {
      return {
        level: "Высокий",
        color: "text-green-600",
        icon: CheckCircle2,
        message: "Ваша энергосистема находится в хорошем состоянии! Вы обладаете высоким уровнем энергии и хорошо сбалансированы. Энергосессии ERA помогут вам раскрыть ещё больший потенциал и выйти на новый уровень.",
        recommendation: "Рекомендуем пройти 1-3 энергосессии для максимального раскрытия потенциала."
      };
    } else if (points <= 20) {
      return {
        level: "Средний",
        color: "text-yellow-600",
        icon: AlertCircle,
        message: "Ваша энергосистема работает, но есть блоки и зажимы, которые мешают полноценно проявляться. Вы можете чувствовать усталость, сложности с концентрацией или неудовлетворённость в некоторых сферах жизни.",
        recommendation: "Рекомендуем пройти курс из 5-8 энергосессий для восстановления баланса."
      };
    } else {
      return {
        level: "Требует внимания",
        color: "text-red-600",
        icon: AlertCircle,
        message: "Ваша энергосистема истощена и требует глубокой работы. Вероятно, вы испытываете хроническую усталость, тревожность, сложности с реализацией. Важно начать работу с энергией как можно скорее.",
        recommendation: "Рекомендуем пройти интенсивный курс энергосессий (10-15 сессий) и рассмотреть участие в практикуме 'Трансформация'."
      };
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    const totalPoints = calculateResults();
    const results = getResultsMessage(totalPoints);
    const ResultIcon = results.icon;

    return (
      <div className="min-h-screen">
        <Navigation />
        
        <main className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
              <Card className="p-8 md:p-12 shadow-soft border-border/50">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 mb-4">
                    <ResultIcon className={`w-10 h-10 ${results.color}`} />
                  </div>
                  <h2 className="text-3xl font-serif font-bold mb-2">
                    Результаты теста
                  </h2>
                  <Badge className={`${results.color} text-lg px-4 py-1`}>
                    Уровень энергии: {results.level}
                  </Badge>
                </div>

                <div className="space-y-6">
                  <div className="bg-muted/30 rounded-lg p-6">
                    <p className="text-lg text-foreground/80 leading-relaxed">
                      {results.message}
                    </p>
                  </div>

                  <div className="bg-accent/10 rounded-lg p-6 border border-accent/20">
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-accent" />
                      Рекомендации
                    </h3>
                    <p className="text-foreground/80 leading-relaxed">
                      {results.recommendation}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button 
                      size="lg"
                      className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground shadow-gold"
                    >
                      Записаться на энергосессию
                    </Button>
                    <Button 
                      size="lg"
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setShowResults(false);
                        setCurrentQuestion(0);
                        setAnswers({});
                      }}
                    >
                      Пройти тест заново
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
              <p className="text-xl text-white/90">
                Ответьте на {questions.length} вопросов, чтобы узнать уровень потенциала вашей энергосистемы
              </p>
            </div>
          </div>
        </section>
        
        <div className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">

            <Card className="p-8 shadow-soft border-border/50">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">
                    Вопрос {currentQuestion + 1} из {questions.length}
                  </span>
                  <span className="text-sm font-semibold">
                    {Math.round(progress)}%
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-serif font-bold mb-6">
                  {questions[currentQuestion].question}
                </h2>
                
                <RadioGroup 
                  value={answers[currentQuestion]} 
                  onValueChange={handleAnswer}
                  className="space-y-3"
                >
                  {questions[currentQuestion].options.map((option) => (
                    <div key={option.value} className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="flex-1"
                >
                  Назад
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!answers[currentQuestion]}
                  className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  {currentQuestion === questions.length - 1 ? 'Получить результаты' : 'Далее'}
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
