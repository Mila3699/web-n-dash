import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, User, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { safeOpenLink } from "@/lib/sanitize";
import { getApprovedMasters } from "@/data/mockMasters";
import { MastersMap } from "@/components/MastersMap";
import { useState, useMemo } from "react";
import { useContent } from "@/hooks/useContent";

const Masters = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const { getBlockContent, getBlockButton } = useContent('masters');
  const approvedMasters = getApprovedMasters();

  // Получаем все уникальные города
  const allCities = useMemo(() => {
    const citiesSet = new Set<string>();
    approvedMasters.forEach(master => {
      master.cities.forEach(city => citiesSet.add(city));
    });
    return Array.from(citiesSet).sort();
  }, [approvedMasters]);

  // Фильтруем мастеров по выбранному городу
  const filteredMasters = useMemo(() => {
    if (!selectedCity) return approvedMasters;
    return approvedMasters.filter(master => master.cities.includes(selectedCity));
  }, [selectedCity, approvedMasters]);

  const handleCityClick = (city: string) => {
    setSelectedCity(selectedCity === city ? null : city);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-brand-green overflow-hidden">
          {/* Energy Particles */}
          <div className="energy-particles">
            {[...Array(12)].map((_, i) => (
              <div 
                key={i}
                className="energy-particle"
                style={{
                  left: `${(i * 8.33)}%`,
                  animationDelay: `${i * 1.25}s`,
                  animationDuration: `${12 + i * 0.5}s`
                }}
              />
            ))}
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
            <Badge className="mb-6 bg-accent/10 text-accent border border-accent/20">
              {getBlockContent('masters-hero-badge') || 'Наши энерготерапевты'}
            </Badge>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-primary-foreground mb-6 animate-fade-in">
              {getBlockContent('masters-hero-title') || 'Выберите своего энерготерапевта ERA'}
            </h1>
            <p className="text-lg sm:text-xl text-primary-foreground/90 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {getBlockContent('masters-hero-subtitle') || 'Все наши специалисты прошли сертификацию и обладают глубокими знаниями метода энерготерапии ERA'}
            </p>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-serif font-bold mb-6 text-center">
              {getBlockContent('masters-map-title') || 'География наших специалистов'}
            </h2>
            <MastersMap 
              cities={allCities} 
              selectedCity={selectedCity}
              onCityClick={handleCityClick}
              customMapImage={getBlockContent('masters-map-image') || ''}
            />
          </div>
        </section>

        {/* City Filter */}
        <section className="py-8 bg-background border-b border-border">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-4">
              <Filter className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-semibold">{getBlockContent('masters-filter-title') || 'Фильтр по городам:'}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCity === null ? "default" : "outline"}
                onClick={() => setSelectedCity(null)}
                className="text-sm"
              >
                {getBlockContent('masters-filter-all') || 'Все города'}
              </Button>
              {allCities.map((city) => (
                <Button
                  key={city}
                  variant={selectedCity === city ? "default" : "outline"}
                  onClick={() => handleCityClick(city)}
                  className="text-sm"
                >
                  {city}
                </Button>
              ))}
            </div>
            {selectedCity && (
              <p className="text-sm text-muted-foreground mt-4">
                Показано мастеров: {filteredMasters.length}
              </p>
            )}
          </div>
        </section>

        {/* Masters Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMasters.map((master) => (
                <Card 
                  key={master.id} 
                  className="p-6 shadow-soft border-border/50 hover:shadow-gold transition-all"
                >
                  <div className="aspect-square bg-muted rounded-xl mb-4 overflow-hidden">
                    <img 
                      src={master.photo} 
                      alt={master.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3 className="text-2xl font-serif font-bold mb-1">
                    {master.name}
                  </h3>
                  <p className="text-muted-foreground mb-3">{master.description}</p>

                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span className="text-sm text-foreground/80">
                      {master.cities.join(', ')}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="font-semibold">
                        {master.pulse.reviews.length > 0 ? '5.0' : '—'}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        ({master.pulse.reviews.length})
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {master.pulse.sessionsMonth} сессий/мес
                    </span>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-semibold mb-2">Отзывы:</p>
                    <div className="flex flex-wrap gap-2">
                      {master.pulse.reviews.slice(0, 5).map((review, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {review}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Link to={`/master/${master.id}`}>
                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                      <User className="w-4 h-4 mr-2" />
                      Смотреть профиль
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              {getBlockContent('masters-cta-title') || 'Хотите стать энерготерапевтом ERA?'}
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {getBlockContent('masters-cta-subtitle') || 'Пройдите обучение и присоединитесь к нашему сообществу профессиональных энерготерапевтов'}
            </p>
            <Link to={getBlockButton('masters-cta-button').link || '/training'}>
              <Button 
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-gold text-lg px-8 py-6"
              >
                {getBlockButton('masters-cta-button').text || 'Узнать подробнее'}
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Masters;
