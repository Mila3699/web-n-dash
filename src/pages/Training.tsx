import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Eye, 
  Wind, 
  Heart,
  Check,
  Users,
  Video,
  BookOpen,
  Award,
  Globe
} from "lucide-react";
import { safeOpenLink } from "@/lib/sanitize";
import sessionImage1 from "@/assets/session-1.jpg";
import sessionImage2 from "@/assets/session-4.jpg";

const Training = () => {
  const forWhoPoints = [
    "вы хотите глубоко изучить энергию Кундалини и стать энерготерапевтом-фасилитатором с осознанным подходом и поддержкой сообщества",
    "вы готовы к серьёзным внутренним изменениям и желаете развивать эмпатию и энергетическую проводимость",
    "вы ищите экологичный и безопасный путь работы с энергией, без эзотерических ритуалов и с научным подходом",
    "вы хотите работать с энергией профессионально и получать стабильный доход, обучившись профессии будущего",
    "вы готовы пройти подготовку и адаптацию, готовы к новым вибрациям и большим изменениям в своей жизни",
    "вы фасилитатор других систем и желаете повысить квалификацию и дорасшириться в работе с энергией Кундалини"
  ];

  const methodElements = [
    {
      icon: Sparkles,
      title: "Активация кундалини",
      description: "Пробуждение внутреннего ресурса, энергии жизни, которая раскрывает потенциал и запускает глубинные трансформации. Раскрытие сверхспособностей - яснознание, ясновидение и др"
    },
    {
      icon: Eye,
      title: "Чтение поля",
      description: "Работа с невидимыми слоями информации. Вы начинаете лучше чувствовать себя и других, понимать корни проблем и видеть больше, чем разум способен объяснить."
    },
    {
      icon: Wind,
      title: "Очищение поля",
      description: "Снятие энергетических и эмоциональных блоков, зажимов, устаревших программ, которые мешают двигаться вперёд. Уходят обиды, страхи, боль, сомнения."
    },
    {
      icon: Heart,
      title: "Восстановление энергосистемы",
      description: "Балансировка всех уровней: от тела до сознания. Это даёт ясность, лёгкость, новые силы и ощущение внутренней опоры, уверенность. Открывается сердце, появляется внутренняя гармония"
    }
  ];

  const benefits = [
    {
      icon: Award,
      title: "Сертификат международного образца",
    },
    {
      icon: Users,
      title: "Доступ в закрытое сообщество мастеров ERA",
    },
    {
      icon: Video,
      title: "Навыки проведения онлайн и офлайн сессий",
    },
    {
      icon: BookOpen,
      title: "Глубокая личная трансформация",
    },
    {
      icon: Globe,
      title: "Собственная страница на нашем сайте и поток клиентов",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center bg-brand-green overflow-hidden pt-16 md:pt-0">
          {/* Energy Grid Pattern */}
          <div className="energy-grid"></div>
          <div className="energy-orb"></div>
          <div className="energy-orb"></div>
          
          <div className="container mx-auto px-4 sm:px-6 py-20 text-center relative z-10">
            <Badge className="mb-6 bg-accent text-accent-foreground border-accent">
              Обучение энерготерапии
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground mb-6 animate-fade-in break-words px-4">
              Обучение методу энерготерапии ERA
            </h1>
            <p className="text-lg sm:text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Метод энерготерапии ERA – это системная работа через активацию кундалини, 
              очищение и восстановление энергоструктуры человека. Наша цель – помочь вам 
              пробудить ваш внутренний ресурс и стать сильными проводниками трансформации для других.
            </p>
            <div className="flex justify-center mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button 
                size="lg"
                onClick={(e) => {
                  e.preventDefault();
                  safeOpenLink('https://t.me/era_academy');
                }}
                className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-gold text-lg px-8 py-6"
              >
                Узнать подробности
              </Button>
            </div>

            {/* Author Info */}
            <div className="mt-8 flex justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="bg-card/90 backdrop-blur-sm rounded-2xl shadow-soft p-8 max-w-2xl w-full">
                <p className="text-sm text-muted-foreground mb-2 text-center">Автор программы:</p>
                <h3 className="text-2xl font-serif font-bold mb-4 text-center">Анастасия Соло</h3>
                <div className="space-y-2 text-left">
                  <p className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/80">Энерготерапевт-фасилитатор, мастер кундалини активационного процесса</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/80">Получила опыт <strong>полного пробуждения</strong> энергии Кундалини у мастера Venant Wong</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/80">Успешно активировала более <strong>7000 человек</strong></span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* For Who Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-center mb-16 break-words px-4">
              Это обучение для вас, если
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {forWhoPoints.map((point, index) => (
                <Card key={index} className="p-6 shadow-soft border-border/50 hover:shadow-gold transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <span className="text-accent font-bold">{index + 1}</span>
                    </div>
                    <p className="text-foreground/80 leading-relaxed">{point}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Method Uniqueness Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-6 break-words px-4">
                В чем уникальность метода энерготерапии ERA
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Это системный подход в восстановлении энергоструктуры человека. 
                Метод энерготерапии ERA объединяет четыре ключевых элемента:
              </p>
            </div>

            {/* Image */}
            <div className="max-w-3xl mx-auto mb-12">
              <div className="rounded-2xl overflow-hidden shadow-gold">
                <img 
                  src={sessionImage1} 
                  alt="Энергетическая сессия ERA"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {methodElements.map((element, index) => {
                const Icon = element.icon;
                return (
                  <Card key={index} className="p-8 shadow-soft border-border/50 hover:shadow-gold transition-shadow">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                        <Icon className="w-8 h-8 text-accent" />
                      </div>
                      <h3 className="text-2xl font-serif font-semibold mb-4">
                        {element.title}
                      </h3>
                      <p className="text-foreground/80 leading-relaxed">
                        {element.description}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* What You Get Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-center mb-16 break-words px-4">
              Что вы получите?
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card key={index} className="p-6 shadow-soft border-border/50 hover:shadow-gold transition-shadow">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-accent/10 flex-shrink-0">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <p className="text-foreground leading-relaxed">{benefit.title}</p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* About Academy Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              {/* Image before text */}
              <div className="mb-12">
                <div className="rounded-2xl overflow-hidden shadow-gold">
                  <img 
                    src={sessionImage2} 
                    alt="Сообщество мастеров ERA"
                    className="w-full h-[350px] object-cover"
                  />
                </div>
              </div>

              <Card className="p-8 md:p-12 shadow-soft border-border/50">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6 text-center break-words px-4">
                  Что такое ERA
                </h2>
                <div className="space-y-4 text-lg text-foreground/80 leading-relaxed">
                  <p>
                    Академия ERA - это новое пространство для глубокого изучения энергии Кундалини 
                    и развития уникальных навыков энерготерапевта-фасилитатора.
                  </p>
                  <p>
                    Здесь встречаются осознанность, наука и практика, чтобы раскрыть ваш потенциал 
                    и помочь служить людям с любовью и ответственностью.
                  </p>
                  <p>
                    В Академии ERA вы получите не только знания, но и поддержку сильного сообщества, 
                    которое идёт с вами по пути трансформации и реализации.
                  </p>
                  <p className="text-center font-semibold text-xl text-accent pt-4">
                    Добро пожаловать в новую эру вашего развития!
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6 break-words px-4">
              Готовы начать свой путь?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Присоединяйтесь к сообществу энерготерапевтов ERA и откройте новую профессию будущего
            </p>
            <Button 
              size="lg"
              onClick={(e) => {
                e.preventDefault();
                safeOpenLink('https://t.me/era_academy');
              }}
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-gold text-lg px-8 py-6"
            >
              Узнать подробности
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Training;
