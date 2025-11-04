import session1 from "@/assets/session-1.jpg";
import session2 from "@/assets/session-2.jpg";
import session3 from "@/assets/session-3.jpg";
import session4 from "@/assets/session-4.jpg";
import session5 from "@/assets/session-5.jpg";
import session6 from "@/assets/session-6.jpg";

export const GallerySection = () => {
  const images = [
    { src: session1, alt: "Энергетическая практика Кундалини ERA" },
    { src: session2, alt: "Групповая энергосессия" },
    { src: session3, alt: "Мастер проводит энергетическую сессию" },
    { src: session4, alt: "Глубокая трансформация через энергию" },
    { src: session5, alt: "Индивидуальная энергосессия" },
    { src: session6, alt: "Коллективная энергетическая практика" },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-accent/5">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">
            Атмосфера <span className="text-accent">наших сессий</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Погрузитесь в пространство трансформации и энергетического роста
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-4 max-w-5xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {/* Large image spanning 2 rows */}
          <div className="md:col-span-2 md:row-span-2 group overflow-hidden rounded-2xl shadow-soft h-[400px]">
            <img 
              src={images[0].src} 
              alt={images[0].alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Top right image */}
          <div className="group overflow-hidden rounded-2xl shadow-soft h-[196px]">
            <img 
              src={images[1].src} 
              alt={images[1].alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Bottom right image */}
          <div className="group overflow-hidden rounded-2xl shadow-soft h-[196px]">
            <img 
              src={images[2].src} 
              alt={images[2].alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Bottom row - 3 images */}
          <div className="md:col-span-3 grid grid-cols-3 gap-4">
            <div className="group overflow-hidden rounded-2xl shadow-soft h-[180px]">
              <img 
                src={images[3].src} 
                alt={images[3].alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="group overflow-hidden rounded-2xl shadow-soft h-[180px]">
              <img 
                src={images[4].src} 
                alt={images[4].alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="group overflow-hidden rounded-2xl shadow-soft h-[180px]">
              <img 
                src={images[5].src} 
                alt={images[5].alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Mobile Grid - Simple 2 column layout */}
        <div className="grid grid-cols-2 gap-2 md:hidden animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {images.map((image, index) => (
            <div 
              key={index}
              className={`group overflow-hidden rounded-xl shadow-soft ${index === 0 ? 'col-span-2 h-[200px]' : 'h-[140px]'}`}
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
