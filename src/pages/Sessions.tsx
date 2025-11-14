import { useContent } from "@/hooks/useContent";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import session1 from "@/assets/session-1.jpg";
import session2 from "@/assets/session-2.jpg";
import session4 from "@/assets/session-4.jpg";

const Sessions = () => {
  const { getBlockContent, getBlockButton } = useContent("sessions");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#193c2e] pt-16 md:pt-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="bg-accent text-accent-foreground border-accent">
              {getBlockContent("sessions-hero-badge") || "Метод энерготерапии ERA"}
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight text-white break-words px-4">
              {getBlockContent("sessions-hero-title") || "Энергосессия ERA"}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed px-4">
              {getBlockContent("sessions-hero-subtitle") || "Через мягкую и безопасную активацию Кундалини я помогу тебе раскрыть внутреннюю силу, ясность и связь с собой"}
            </p>
            <div className="pt-4">
              <Link to={getBlockButton("sessions-cta-button").link || "/masters"}>
                <Button size="lg" className="text-lg px-8 py-6 bg-accent hover:bg-accent/90 text-accent-foreground">
                  {getBlockButton("sessions-cta-button").text || "Записаться на сессию"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl font-bold text-primary mb-4">
              {getBlockContent("sessions-stats-number") || "7000+"}
            </div>
            <p className="text-xl text-muted-foreground">
              {getBlockContent("sessions-stats-text") || "Прошли активацию кундалини на моих сессиях онлайн и офлайн"}
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center space-y-4 p-8 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm border border-border/50">
              <h3 className="text-2xl font-bold">
                {getBlockContent("sessions-benefit-1-title") || "Энергия жизни"}
              </h3>
              <p className="text-muted-foreground">
                {getBlockContent("sessions-benefit-1-desc") || "Кундалини - жизненная энергия, которая дремлет в каждом"}
              </p>
            </div>
            <div className="text-center space-y-4 p-8 rounded-xl bg-gradient-to-br from-secondary/10 to-primary/10 backdrop-blur-sm border border-border/50">
              <h3 className="text-2xl font-bold">
                {getBlockContent("sessions-benefit-2-title") || "Раскрытие потенциала"}
              </h3>
              <p className="text-muted-foreground">
                {getBlockContent("sessions-benefit-2-desc") || "Активация раскрывает способности и открывает сердце для любви"}
              </p>
            </div>
            <div className="text-center space-y-4 p-8 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm border border-border/50">
              <h3 className="text-2xl font-bold">
                {getBlockContent("sessions-benefit-3-title") || "Ускорение ваших изменений"}
              </h3>
              <p className="text-muted-foreground">
                {getBlockContent("sessions-benefit-3-desc") || "Активация ускорит ваши изменения и усилит глубину трансформаций"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <img 
                  src={session1} 
                  alt="Энергосессия Кундалини ERA" 
                  className="rounded-2xl shadow-gold w-full h-[400px] object-cover"
                />
              </div>
              <div className="space-y-6">
                <img 
                  src={session2} 
                  alt="Процесс энергосессии" 
                  className="rounded-2xl shadow-gold w-full h-[250px] object-cover"
                />
                <img 
                  src={session4} 
                  alt="Трансформация через энергию" 
                  className="rounded-2xl shadow-gold w-full h-[250px] object-cover"
                />
              </div>
            </div>
            <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 break-words px-4">
              {getBlockContent("sessions-how-title") || "Как проходит энергосессия"}
            </h2>
            
            <div className="space-y-8">
              <div className="p-8 rounded-xl bg-background/50 backdrop-blur-sm border border-border">
                <h3 className="text-2xl font-bold mb-4">
                  {getBlockContent("sessions-step-1-title") || "Первая часть: Introduction - Вступление"}
                </h3>
                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                  <li>Я рассказываю что это такое</li>
                  <li>Я объясняю все смыслы</li>
                  <li>Как войти в процесс. Что с вами будет происходить</li>
                  <li>Вы будете полностью в сознании</li>
                </ul>
              </div>

              <div className="p-8 rounded-xl bg-background/50 backdrop-blur-sm border border-border">
                <h3 className="text-2xl font-bold mb-4">
                  {getBlockContent("sessions-step-2-title") || "Вторая часть: Energy transmission - трансмиссия энергии"}
                </h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>Все участники онлайн-группы ложатся (камера включена, сессия в ЗУМ), расслабляются, играет обычная музыка и фасилитатор проводит энергию.</p>
                  <p>Вы будете полностью в сознании и ваш мозг будет удивляться, когда ваше тело начнёт двигаться.</p>
                  <p>Вы можете в любой момент остановить процесс сами - просто открыв глаза.</p>
                  <p>Не будет гипноза или регресса, не будет напитков или трав, свечек, не будет никакого воздействия на вашу активацию. Вам просто нужно довериться процессу.</p>
                </div>
              </div>

              <div className="p-8 rounded-xl bg-background/50 backdrop-blur-sm border border-border">
                <h3 className="text-2xl font-bold mb-4">
                  {getBlockContent("sessions-step-3-title") || "Третья часть: Sharing - Делится своими ощущениями"}
                </h3>
                <p className="text-muted-foreground">
                  Каждый, кто захочет может рассказать о своих ощущениях, получить обратную связь от фасилитатора, послушать опыт других.
                </p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center break-words px-4">
              {getBlockContent("sessions-req-title") || "Что нужно чтобы прийти на сессию"}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-border/50">
                <div className="text-3xl font-bold text-primary mb-2">1</div>
                <p className="text-lg">Ознакомиться с противопоказаниями</p>
              </div>
              <div className="p-6 rounded-xl bg-gradient-to-br from-secondary/5 to-primary/5 border border-border/50">
                <div className="text-3xl font-bold text-primary mb-2">2</div>
                <p className="text-lg">Соблюдать питание</p>
              </div>
              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-border/50">
                <div className="text-3xl font-bold text-primary mb-2">3</div>
                <p className="text-lg">Прийти без ожиданий</p>
              </div>
              <div className="p-6 rounded-xl bg-gradient-to-br from-secondary/5 to-primary/5 border border-border/50">
                <div className="text-3xl font-bold text-primary mb-2">4</div>
                <p className="text-lg">Расслабиться</p>
              </div>
              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-border/50 md:col-span-2">
                <div className="text-3xl font-bold text-primary mb-2">5</div>
                <p className="text-lg">Прийти с открытым сердцем</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Online Sessions Section */}
      <section className="py-20 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              {getBlockContent("sessions-online-title") || "Сессии проходят онлайн"}
            </h2>
            <p className="text-xl text-muted-foreground">
              {getBlockContent("sessions-online-desc") || "Энергия не имеет времени или расстояния"}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8 p-12 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-border">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold break-words">
              {getBlockContent("sessions-final-cta-title") || "Готовы начать свою трансформацию?"}
            </h2>
            <p className="text-xl text-muted-foreground">
              {getBlockContent("sessions-final-cta-desc") || "Выберите мастера и запишитесь на энергосессию"}
            </p>
            <Link to={getBlockButton("sessions-final-cta-button").link || "/masters"}>
              <Button size="lg" className="text-lg px-8 py-6 bg-accent hover:bg-accent/90 text-accent-foreground">
                {getBlockButton("sessions-final-cta-button").text || "Выбрать мастера"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sessions;
