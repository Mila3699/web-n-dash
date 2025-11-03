import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Calendar } from "lucide-react";

const Masters = () => {
  const masters = [
    {
      id: 1,
      name: "Анастасия Соло",
      title: "Основатель метода ERA",
      location: "Онлайн",
      experience: "7000+ активаций",
      rating: 5.0,
      reviews: 250,
      specialization: ["Активация Кундалини", "Глубокая трансформация", "Чтение поля"],
      image: "/placeholder.svg",
      isFeatured: true
    },
    {
      id: 2,
      name: "Мария Светлова",
      title: "Энерготерапевт ERA",
      location: "Москва / Онлайн",
      experience: "3 года практики",
      rating: 4.9,
      reviews: 120,
      specialization: ["Энергосессии", "Работа с блоками", "Восстановление энергосистемы"],
      image: "/placeholder.svg",
      isFeatured: false
    },
    {
      id: 3,
      name: "Елена Северная",
      title: "Энерготерапевт ERA",
      location: "Санкт-Петербург / Онлайн",
      experience: "2 года практики",
      rating: 4.8,
      reviews: 85,
      specialization: ["Групповые сессии", "Очищение поля", "Балансировка чакр"],
      image: "/placeholder.svg",
      isFeatured: false
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-brand-green">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-6 bg-accent/20 text-accent-foreground border-accent">
              Наши энерготерапевты
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-primary-foreground mb-6 animate-fade-in">
              Выберите своего энерготерапевта ERA
            </h1>
            <p className="text-lg sm:text-xl text-primary-foreground/90 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Все наши специалисты прошли сертификацию и обладают глубокими знаниями 
              метода энерготерапии ERA
            </p>
          </div>
        </section>

        {/* Masters Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {masters.map((master) => (
                <Card 
                  key={master.id} 
                  className={`p-6 shadow-soft border-border/50 hover:shadow-gold transition-all ${
                    master.isFeatured ? 'ring-2 ring-accent' : ''
                  }`}
                >
                  {master.isFeatured && (
                    <Badge className="mb-4 bg-accent text-accent-foreground">
                      Основатель метода
                    </Badge>
                  )}
                  
                  <div className="aspect-square bg-muted rounded-xl mb-4 overflow-hidden">
                    <img 
                      src={master.image} 
                      alt={master.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3 className="text-2xl font-serif font-bold mb-1">
                    {master.name}
                  </h3>
                  <p className="text-muted-foreground mb-3">{master.title}</p>

                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span className="text-sm text-foreground/80">{master.location}</span>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="font-semibold">{master.rating}</span>
                      <span className="text-sm text-muted-foreground">({master.reviews})</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{master.experience}</span>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-semibold mb-2">Специализация:</p>
                    <div className="flex flex-wrap gap-2">
                      {master.specialization.map((spec, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={() => window.open('https://t.me/era_academy', '_blank')}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Записаться в Telegram
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Хотите стать энерготерапевтом ERA?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Пройдите обучение и присоединитесь к нашему сообществу профессиональных энерготерапевтов
            </p>
            <Button 
              size="lg"
              onClick={() => window.open('https://t.me/era_academy', '_blank')}
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-gold text-lg px-8 py-6"
            >
              Узнать об обучении в Telegram
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Masters;
