import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import logo from "@/assets/logo.png";

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const offset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('hero');
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    setUserRole(localStorage.getItem('userRole'));
    
    if (!isHomePage) return;
    
    const handleScroll = () => {
      const sections = ['hero', 'sessions', 'transformation', 'training'];
      const scrollPosition = window.scrollY + 200;
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('masterId');
    setUserRole(null);
    navigate('/');
  };

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-4">
      <div className="container mx-auto">
        <div className="glass rounded-2xl shadow-float border border-border/50 px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="relative group flex items-center">
              <img 
                src={logo} 
                alt="ERA - Energy Realization Academy" 
                className="h-14 w-auto relative z-10 transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-accent/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>

          <div className="hidden md:flex items-center space-x-1">
            {isHomePage ? (
              <>
                <button 
                  onClick={() => scrollToSection('hero')}
                  className={`px-4 py-2 rounded-lg hover:text-brand-gold hover:bg-accent/5 transition-all duration-300 relative group ${activeSection === 'hero' ? 'text-brand-gold' : 'text-brand-green'}`}
                >
                  <span>Главная</span>
                  <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-accent transition-transform duration-300 ${activeSection === 'hero' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </button>
                <button 
                  onClick={() => scrollToSection('sessions')}
                  className={`px-4 py-2 rounded-lg hover:text-brand-gold hover:bg-accent/5 transition-all duration-300 relative group ${activeSection === 'sessions' ? 'text-brand-gold' : 'text-brand-green'}`}
                >
                  <span>Энергосессии</span>
                  <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-accent transition-transform duration-300 ${activeSection === 'sessions' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </button>
                <button 
                  onClick={() => scrollToSection('transformation')}
                  className={`px-4 py-2 rounded-lg hover:text-brand-gold hover:bg-accent/5 transition-all duration-300 relative group ${activeSection === 'transformation' ? 'text-brand-gold' : 'text-brand-green'}`}
                >
                  <span>Практикум</span>
                  <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-accent transition-transform duration-300 ${activeSection === 'transformation' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </button>
                <button 
                  onClick={() => scrollToSection('training')}
                  className={`px-4 py-2 rounded-lg hover:text-brand-gold hover:bg-accent/5 transition-all duration-300 relative group ${activeSection === 'training' ? 'text-brand-gold' : 'text-brand-green'}`}
                >
                  <span>Обучение</span>
                  <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-accent transition-transform duration-300 ${activeSection === 'training' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </button>
              </>
            ) : (
              <Link to="/" className="px-4 py-2 rounded-lg text-brand-green hover:text-brand-gold hover:bg-accent/5 transition-all duration-300 relative group">
                <span>Главная</span>
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            )}
            <Link to="/test" className="px-4 py-2 rounded-lg text-brand-green hover:text-brand-gold hover:bg-accent/5 transition-all duration-300 relative group">
              <span>Тест</span>
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link to="/masters" className="px-4 py-2 rounded-lg text-brand-green hover:text-brand-gold hover:bg-accent/5 transition-all duration-300 relative group">
              <span>Мастера</span>
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            
            {!userRole ? (
              <Button 
                onClick={() => navigate('/login')} 
                className="ml-4 bg-accent hover:bg-accent/90 text-accent-foreground shadow-gold hover:shadow-float transition-all duration-300 hover:scale-105"
              >
                Войти
              </Button>
            ) : (
              <div className="flex items-center gap-4">
                <Button onClick={() => navigate(userRole === 'master' ? '/master-dashboard' : '/admin-dashboard')} variant="ghost">
                  {userRole === 'master' ? 'Личный кабинет' : 'Админ-панель'}
                </Button>
                <Button onClick={handleLogout} variant="ghost">Выйти</Button>
              </div>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-brand-green">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-6 animate-fade-in">
            <div className="flex flex-col space-y-2">
              <Link to="/" className="px-4 py-3 rounded-lg text-brand-green hover:text-brand-gold hover:bg-accent/5 transition-all" onClick={() => setIsOpen(false)}>Главная</Link>
              <Link to="/" className="px-4 py-3 rounded-lg text-brand-green hover:text-brand-gold hover:bg-accent/5 transition-all" onClick={() => setIsOpen(false)}>Энергосессии</Link>
              <Link to="/transformation" className="px-4 py-3 rounded-lg text-brand-green hover:text-brand-gold hover:bg-accent/5 transition-all" onClick={() => setIsOpen(false)}>Энергопрактикум</Link>
              <Link to="/training" className="px-4 py-3 rounded-lg text-brand-green hover:text-brand-gold hover:bg-accent/5 transition-all" onClick={() => setIsOpen(false)}>Обучение</Link>
              <Link to="/test" className="px-4 py-3 rounded-lg text-brand-green hover:text-brand-gold hover:bg-accent/5 transition-all" onClick={() => setIsOpen(false)}>Тест</Link>
              <Link to="/masters" className="px-4 py-3 rounded-lg text-brand-green hover:text-brand-gold hover:bg-accent/5 transition-all" onClick={() => setIsOpen(false)}>Каталог Мастеров</Link>
            </div>
          </div>
        )}
        </div>
      </div>
    </nav>
  );
};

export { Navigation };
