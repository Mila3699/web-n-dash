import { Link } from "react-router-dom";
import { Mail, Phone, Instagram, Facebook, Youtube } from "lucide-react";
import logo from "@/assets/logo.png";

export const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <footer className="bg-brand-green text-primary-foreground py-20 mt-32">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <img src={logo} alt="ERA Academy" className="h-16 w-auto mb-6" />
            <p className="text-primary-foreground/70 leading-relaxed mb-6 max-w-md">
              Единая экосистема для вашего роста, трансформации и обретения баланса через метод энерготерапии ERA
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-accent/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-accent/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-accent/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-6">Быстрые ссылки</h4>
            <ul className="space-y-3">
              <li>
                <button onClick={() => scrollToSection('sessions')} className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Энергосессии
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('transformation')} className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Практикум
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('training')} className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Обучение
                </button>
              </li>
              <li>
                <Link to="/test" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Пройти тест
                </Link>
              </li>
              <li>
                <Link to="/masters" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Каталог Мастеров
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-6">Контакты</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:info@era-academy.com" className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-all">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>info@era-academy.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-all">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>+7 (XXX) XXX-XX-XX</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/10 text-center">
          <p className="text-sm text-primary-foreground/50">
            © 2025 Единая Сеть Мастеров ERA. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};
