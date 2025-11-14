import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowDown, Users, Brain, Sparkles, Target } from "lucide-react";
import { useRateLimit } from "@/hooks/useRateLimit";
import { useContent } from "@/hooks/useContent";
import { safeOpenLink } from "@/lib/sanitize";
import { SafeHtmlText } from "@/components/SafeHtmlText";
import sessionImage3 from "@/assets/session-2.jpg";
import sessionImage5 from "@/assets/session-5.jpg";

const Transformation = () => {
  const { checkLimit } = useRateLimit({
    key: 'transformation_cta',
    preset: 'externalLink',
  });
  const { getBlockContent } = useContent('transformation');

  const targetAudience = [
    {
      icon: ArrowDown,
      title: getBlockContent('transformation-target-1-title') || 'Вы "застряли", ничего не происходит',
      description: getBlockContent('transformation-target-1-desc') || 'Если в вашей жизни сейчас застой, ничего не происходит, вам непонятно что делать дальше, куда двигаться.',
      details: getBlockContent('transformation-target-1-details') || 'Чувствуете аппатию, потерянность, нехватку энергии. Хочется найти новые смыслы, прокачать энергию, увидеть свой потенциал'
    },
    {
      icon: Brain,
      title: getBlockContent('transformation-target-2-title') || 'Ищите глубину и контакт с собой',
      description: getBlockContent('transformation-target-2-desc') || 'Если вы хотите найти внутреннюю опору, стать увереннее и спокойнее. Чувствуете усталость, неуверенность, потерю радости или вдохновения.',
      details: getBlockContent('transformation-target-2-details') || 'Находитесь в поиске духовного пути и новых практик, которые помогут соединиться с собой и раскрыть ваш потенциал'
    },
    {
      icon: Users,
      title: getBlockContent('transformation-target-3-title') || 'Работаете с людьми и выгораете',
      description: getBlockContent('transformation-target-3-desc') || 'Если вы помогающий практик, работаете с людьми, чувствуете, что быстро устаете, не хватает ресурса, не можете брать больше клиентов из-за выгорания.',
      details: getBlockContent('transformation-target-3-details') || 'Хотите глубже чувствовать людей, "читать" их поле, помогать им быстрее и при этом оставаться наполненными энергией'
    },
    {
      icon: Sparkles,
      title: getBlockContent('transformation-target-4-title') || 'Готовы к трансформациям',
      description: getBlockContent('transformation-target-4-desc') || 'Если вы ощущаете, что назрели большие перемены.',
      details: getBlockContent('transformation-target-4-details') || 'Есть большое желание перейти на новый уровень - в работе, в отношениях, в жизни в целом, но не хватает энергии и толчка, чтобы сделать этот шаг. Вы чувствуете, что вы уже на пороге важных изменений в жизни'
    }
  ];

  const methodElements = [
    {
      title: getBlockContent('transformation-method-1-title') || 'Активация кундалини',
      description: getBlockContent('transformation-method-1-desc') || 'Пробуждение внутреннего ресурса, энергии жизни, которая раскрывает потенциал и запускает глубинные трансформации. Раскрытие сверхспособностей - яснознание, ясновидение и др'
    },
    {
      title: getBlockContent('transformation-method-2-title') || 'Чтение поля',
      description: getBlockContent('transformation-method-2-desc') || 'Чтение поля - работа с невидимыми слоями информации. Вы начинаете лучше чувствовать себя и других, понимать корни проблем и видеть больше, чем разум способен объяснить.'
    },
    {
      title: getBlockContent('transformation-method-3-title') || 'Очищение поля',
      description: getBlockContent('transformation-method-3-desc') || 'Очищение поля — снятие энергетических и эмоциональных блоков, зажимов, устаревших программ, которые мешают двигаться вперёд. Уходят обиды, страхи, боль, сомнения.'
    },
    {
      title: getBlockContent('transformation-method-4-title') || 'Восстановление энергосистемы',
      description: getBlockContent('transformation-method-4-desc') || 'Восстановление энергосистемы — балансировка всех уровней: от тела до сознания. Это даёт ясность, лёгкость, новые силы и ощущение внутренней опоры, уверенность. Открывается сердце, появляется внутренняя гармония, состояние счастья. При этом, восстанавливается баланс духовного и материального.'
    }
  ];

  const results = [
    getBlockContent('transformation-result-1') || 'Энергия вернётся - усталость, апатия и внутренний «туман» уйдут, появится лёгкость и ясность.',
    getBlockContent('transformation-result-2') || 'Стабильное состояние - вы станете спокойнее, собраннее, будете меньше реагировать на стресс и внешние обстоятельства.',
    getBlockContent('transformation-result-3') || 'Расширение чувствительности - сможете глубже ощущать своё тело, эмоции и энергетику, а также лучше "считывать" других людей.',
    getBlockContent('transformation-result-4') || 'Соединение с собой - укрепите внутреннюю опору, самоценность, доверие к себе и своей жизни.',
    getBlockContent('transformation-result-5') || 'Прорыв в жизни - появятся силы и смелость для новых шагов, решений и проектов. Появится ясность, что и как делать.',
    getBlockContent('transformation-result-6') || 'Очищение и обновление - снизится уровень напряжения и блоков, освободится место для новых состояний и возможностей.',
    getBlockContent('transformation-result-7') || 'Раскрытие потенциала - вы почувствуете себя более цельным, наполненным и начнёте жить в большем потоке энергии.'
  ];

  const schedule = [
    {
      date: '03.12',
      time: 'В 11:00 Мск или в 19:00 Мск (на выбор)',
      description: 'Вводная лекция и энергосессия. Разборы от Анастасии и фасилитаторов-энерготерапевтов ERA.'
    },
    {
      date: '08.12',
      time: 'В 11:00 Мск или в 19:00 Мск',
      description: 'Энергосессия. Разборы от Анастасии и фасилитаторов-энерготерапевтов ERA.'
    },
    {
      date: '11.12',
      time: 'В 11:00 Мск или в 19:00 Мск',
      description: 'Энергосессия. Разборы от Анастасии и фасилитаторов-энерготерапевтов ERA.'
    },
    {
      date: '15.12',
      time: 'В 11:00 Мск или в 19:00 Мск',
      description: 'Энергосессия. Разборы от Анастасии и фасилитаторов-энерготерапевтов ERA.'
    },
    {
      date: '18.12',
      time: 'В 11:00 Мск или в 19:00 Мск',
      description: 'Энергосессия. Разборы от Анастасии и фасилитаторов-энерготерапевтов ERA.'
    },
    {
      date: '22.12',
      time: 'В 11:00 Мск',
      description: 'Заключительная встреча, обратная связь от Анастасии'
    }
  ];

  const faqItems = [
    {
      question: 'Какие есть противопоказания?',
      answer: '- психические расстройства (по согласованию)\n- употребление антидепрессантов (по согласованию)\n- употребление наркотических средств\n- беременность\n- панические атаки (по согласованию)\n- эпилепсия'
    },
    {
      question: 'Как готовиться к энергосессиям?',
      answer: '• за 2ч до сессии не есть\n• не есть мясо 8ч\n• не пить кофе в день сессии\n• в день сессии не есть тяжелый фастфуд, химические добавки\n• исключить алкоголь за 24ч и психотропные вещества (категорически)\n• больше пить чистой воды\n• кушать свежие фрукты и овощи\n• убрать телефон на время сессии\n• Одежда: удобная, комфортная, свободная'
    },
    {
      question: 'Безопасно ли это для меня?',
      answer: 'Да, это абсолютно безопасная для вас энергопрактика. Вы находитесь в полном сознании. Активация происходит очень бережно. Энергия разумна и воздействует только там, где вам сейчас нужно и где вы готовы.'
    },
    {
      question: 'От чего зависит скорость активации?',
      answer: '1) Состояние вашего провода - вашего тела. От этого зависит проводимость энергии. Чистая клетка, чистое тело - правильное питание, желательно без мяса, много овощей, клетчатки, много чистой воды (40 мл/кг веса). Тогда ваше тело может брать в большем объеме энергию и все процессы идут быстрее.\n\n2) Ваша текущая точка А - на каком уровне осознанности вы сейчас, сколько в вас еще "сидит" программ, эмоциональных блоков, страхов и на сколько уже сейчас раскрыто ваше сердце\n\n3) Ваша добрая воля и полное доверие процессу и мне, как проводнику. Любые страхи и сомнения обнуляют результат.'
    },
    {
      question: 'Можно ли мужчинам на практику?',
      answer: 'Да, конечно, кундалини энергия есть в каждом, независимо от пола.'
    }
  ];

  return (
    <Layout className="min-h-screen bg-background">
      
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center bg-brand-green overflow-hidden pt-16 md:pt-0">
          {/* Energy Flow Lines */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="energy-flow"></div>
            <div className="energy-flow"></div>
            <div className="energy-flow"></div>
          </div>
          
          {/* Energy Spiral */}
          <div className="energy-spiral absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30"></div>
          
          <div className="container mx-auto px-4 sm:px-6 py-20 text-center relative z-10">
            <p className="text-white/90 mb-2">Энергопрактикум с Анастасией Соло</p>
            <p className="text-white/90 mb-6">Онлайн 02.12 - 23.12</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-accent mb-6 animate-fade-in break-words px-4">
              ТРАНСФОРМАЦИЯ
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Раскрытие твоего потенциала через активацию кундалини энергии, очищение энергополя и восстановление твоей энергосистемы
            </p>
            <Button 
              size="lg"
              onClick={(e) => {
                e.preventDefault();
                if (checkLimit()) {
                  safeOpenLink('https://t.me/era_academy');
                }
              }}
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-gold text-lg px-8 py-6 animate-fade-in"
              style={{ animationDelay: '0.4s' }}
            >
              Пройти Трансформацию
            </Button>
          </div>
        </section>

        {/* Target Audience Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-center mb-16 break-words px-4">
              {getBlockContent('transformation-for-who-title') || 'Для кого этот энергопрактикум'}
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {targetAudience.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card key={index} className="p-6 shadow-soft border-border/50 hover:shadow-gold transition-shadow">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 rounded-full bg-accent/10 flex-shrink-0">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <h3 className="text-xl font-serif font-bold">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-foreground/80 mb-3">{item.description}</p>
                    <p className="text-foreground/70 text-sm">{item.details}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Method Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-center mb-8 break-words px-4">
                {getBlockContent('transformation-method-title') || 'Как работает метод энерготерапии ERA'}
              </h2>
              <p className="text-xl text-center text-foreground/80 mb-12">
                {getBlockContent('transformation-method-subtitle') || 'Это не просто серия энергосессий, это системная работа с вашей энергоструктурой.'}
              </p>

              {/* Image */}
              <div className="mb-12">
                <div className="rounded-2xl overflow-hidden shadow-gold">
                  <img 
                    src={sessionImage3} 
                    alt="Процесс энергетической сессии"
                    className="w-full h-[350px] object-cover"
                  />
                </div>
              </div>

              <p className="text-lg text-center text-foreground/70 mb-12">
                {getBlockContent('transformation-method-intro') || 'Метод энерготерапии ERA объединяет четыре ключевых элемента:'}
              </p>
              <div className="space-y-6">
                {methodElements.map((element, index) => (
                  <Card key={index} className="p-6 shadow-soft border-border/50">
                    <h3 className="text-2xl font-serif font-bold mb-3 text-accent">
                      {element.title}
                    </h3>
                    <p className="text-foreground/80 leading-relaxed">
                      {element.description}
                    </p>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-12">
                <Button 
                  size="lg"
                  onClick={(e) => {
                    e.preventDefault();
                    if (checkLimit()) {
                      safeOpenLink('https://t.me/era_academy');
                    }
                  }}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-gold text-lg px-8 py-6"
                >
                  {getBlockContent('transformation-method-button') || 'Забронировать место в Telegram'}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-12">
                {getBlockContent('transformation-results-title') || 'Результаты энергопрактикума'}
              </h2>
              <Card className="p-8 shadow-soft border-border/50">
                <div className="space-y-4">
                  {results.map((result, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="text-accent text-xl font-bold flex-shrink-0 mt-1">•</span>
                      <p className="text-lg text-foreground/80 leading-relaxed">
                        <strong className="text-foreground">{result.split(' - ')[0]}</strong>
                        {result.includes(' - ') && ` - ${result.split(' - ')[1]}`}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Acceleration Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-8">
                {getBlockContent('transformation-acceleration-title') || 'Ускорение ваших трансформаций'}
              </h2>

              {/* Image */}
              <div className="mb-12">
                <div className="rounded-2xl overflow-hidden shadow-gold">
                  <img 
                    src={sessionImage5} 
                    alt="Результаты энергетических сессий"
                    className="w-full h-[350px] object-cover"
                  />
                </div>
              </div>

              <Card className="p-8 shadow-soft border-border/50">
                <p className="text-xl font-semibold text-center mb-8">
                  {getBlockContent('transformation-acceleration-intro') || 'Энергопрактикум работает как катализатор, он многократно ускоряет процессы изменений в вашей жизни:'}
                </p>
                <div className="space-y-4 mb-8">
                  <SafeHtmlText 
                    content={getBlockContent('transformation-acceleration-point-1') || '• <strong>События начинают происходить быстрее</strong> - то, на что раньше уходили месяцы или годы, может прийти за недели.'}
                    className="text-lg text-foreground/80"
                  />
                  <SafeHtmlText 
                    content={getBlockContent('transformation-acceleration-point-2') || '• <strong>Возможности раскрываются сами</strong> - нужные люди, ресурсы и ситуации притягиваются естественным образом.'}
                    className="text-lg text-foreground/80"
                  />
                  <SafeHtmlText 
                    content={getBlockContent('transformation-acceleration-point-3') || '• <strong>Трансформации происходят мягко, но глубоко</strong> - вы словно «перепрошиваете» свою энергосистему, и жизнь перестраивается под новое состояние.'}
                    className="text-lg text-foreground/80"
                  />
                  <SafeHtmlText 
                    content={getBlockContent('transformation-acceleration-point-4') || '• <strong>Вы выходите на новый уровень</strong> - быстрее начинаете реализовывать свои желания, проекты, новые смыслы.'}
                    className="text-lg text-foreground/80"
                  />
                </div>
                <p className="text-lg font-semibold text-center">
                  {getBlockContent('transformation-acceleration-outro') || 'Эта практика не просто добавляет энергии, она меняет вашу траекторию, включая ускорение событийного ряда и выход на новую ветку реальности.'}
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Program and Pricing Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-16">
              {getBlockContent('transformation-program-title') || 'Программа, стоимость и условия участия'}
            </h2>
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 shadow-soft border-border/50 mb-8">
                <h3 className="text-3xl font-serif font-bold text-center mb-8">
                  Энергопрактикум "Трансформация"
                </h3>
                <div className="space-y-6 mb-8">
                  {schedule.map((item, index) => (
                    <div key={index} className="border-b border-border/30 pb-4 last:border-0">
                      <div className="flex items-start gap-4">
                        <Badge className="bg-accent/20 text-accent-foreground border-accent text-lg px-4 py-2">
                          {item.date}
                        </Badge>
                        <div>
                          <p className="font-semibold mb-2">{item.time}</p>
                          <p className="text-foreground/80">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-muted/50 p-6 rounded-lg mb-6">
                  <p className="text-center mb-4">
                    Все встречи проходят в ZOOM. Живое присутствие обязательно, записи не будет.
                  </p>
                  <p className="text-center">
                    Чат с обратной связью и поддержкой по вашим процессам от Анастасии и фасилитаторов-энерготерапевтов ERA
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-lg mb-2 line-through text-muted-foreground">50 000 руб</p>
                  <p className="text-4xl font-bold text-accent mb-2">35 000 руб</p>
                  <p className="text-sm text-muted-foreground mb-6">(до 10 ноября)</p>
                  <Button 
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-gold text-lg px-8 py-6"
                  >
                    Забронировать место
                  </Button>
                  <p className="text-xs text-muted-foreground mt-4">
                    * Имеются ПРОТИВОПОКАЗАНИЯ, ознакомьтесь.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* About Anastasia Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-8">
                Анастасия СОЛО
              </h2>
              <p className="text-xl text-center text-accent mb-12">
                Основатель академии ERA. Энерготерапевт-фасилитатор
              </p>
              <Card className="p-8 shadow-soft border-border/50">
                <div className="space-y-4 text-lg text-foreground/80 leading-relaxed">
                  <p>
                    Меня зовут Анастасия, я проводник, мастер активации энергии кундалини, автор метода энерготерапии ERA.
                  </p>
                  <p>
                    Получила мистический опыт спонтанной самоактивации Энергии Кундалини 12 лет назад, что кардинально изменило мою жизнь.
                  </p>
                  <p>
                    После этого я получила опыт полного пробуждения энергии Кундалини у мастера Venant Wong и прошла обучение на фасилитатора.
                  </p>
                  <p>
                    Долгое время являлась единственным представителем его академии в 8 странах (Россия, Казахстан, Кыргызстан, Узбекистан, Беларусь, Кипр, Сербия, Дубаи). Работаю на двух языках. Более 7000 активных.
                  </p>
                  <p>
                    Доступно объясняю сложные процессы. Я один из немногих специалистов-практиков с научно-обоснованным подходом к энергии Кундалини.
                  </p>
                  <p>
                    И вот уже несколько лет, как помогаю людям по всему миру активировать свою жизненную энергию и ускорить их трансформации на пути их духовного роста.
                  </p>
                  <p>
                    Личный опыт работы с тысячами людей разных национальностей, в разных странах помогает мне глубоко исследовать человека, его потенциал и то, как работает кундалини.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-12">
                Частые вопросы
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border border-border/50 rounded-lg px-6">
                    <AccordionTrigger className="text-lg font-semibold hover:text-accent">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/80 whitespace-pre-line">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-brand-green">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-white">
              Готовы к трансформации?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Начните свой путь к глубоким изменениям уже сейчас. Количество мест ограничено.
            </p>
            <Button 
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-gold text-lg px-8 py-6"
            >
              Принять участие
            </Button>
          </div>
        </section>
      </main>

    </Layout>
  );
};

export default Transformation;
