import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import logo from "@/assets/logo.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUserRole(localStorage.getItem('userRole'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('masterId');
    setUserRole(null);
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border/50 md:top-4 md:px-4 md:bg-transparent md:border-b-0">
      <div className="container mx-auto">
        <div className="md:glass md:rounded-2xl md:shadow-float md:border md:border-border/50 px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="relative group flex items-center">
              <img 
                src={logo} 
                alt="ERA - Energy Realization Academy" 
                className="h-10 md:h-14 w-auto transition-opacity duration-200 group-hover:opacity-90"
              />
            </Link>

          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className={`px-4 py-2 rounded-lg hover:text-brand-gold hover:bg-accent/5 transition-all duration-300 relative group ${location.pathname === '/' ? 'text-brand-gold' : 'text-brand-green'}`}>
              <span>Главная</span>
              <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-accent transition-transform duration-300 ${location.pathname === '/' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </Link>
            <Link to="/sessions" className={`px-4 py-2 rounded-lg hover:text-brand-gold hover:bg-accent/5 transition-all duration-300 relative group ${location.pathname === '/sessions' ? 'text-brand-gold' : 'text-brand-green'}`}>
              <span>Энергосессии</span>
              <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-accent transition-transform duration-300 ${location.pathname === '/sessions' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </Link>
            <Link to="/transformation" className={`px-4 py-2 rounded-lg hover:text-brand-gold hover:bg-accent/5 transition-all duration-300 relative group ${location.pathname === '/transformation' ? 'text-brand-gold' : 'text-brand-green'}`}>
              <span>Практикум</span>
              <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-accent transition-transform duration-300 ${location.pathname === '/transformation' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </Link>
            <Link to="/test" className={`px-4 py-2 rounded-lg hover:text-brand-gold hover:bg-accent/5 transition-all duration-300 relative group ${location.pathname === '/test' ? 'text-brand-gold' : 'text-brand-green'}`}>
              <span>Тест</span>
              <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-accent transition-transform duration-300 ${location.pathname === '/test' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </Link>
            <Link to="/masters" className={`px-4 py-2 rounded-lg hover:text-brand-gold hover:bg-accent/5 transition-all duration-300 relative group ${location.pathname === '/masters' ? 'text-brand-gold' : 'text-brand-green'}`}>
              <span>Мастера</span>
              <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-accent transition-transform duration-300 ${location.pathname === '/masters' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </Link>
            <Link to="/training" className={`px-4 py-2 rounded-lg hover:text-brand-gold hover:bg-accent/5 transition-all duration-300 relative group ${location.pathname === '/training' ? 'text-brand-gold' : 'text-brand-green'}`}>
              <span>Обучение</span>
              <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-accent transition-transform duration-300 ${location.pathname === '/training' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </Link>
            
            {!userRole ? (
              <Button 
                onClick={() => navigate('/login')} 
                className="ml-4 bg-accent hover:bg-accent/90 text-accent-foreground shadow-gold transition-all duration-200"
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
              <Link to="/sessions" className="px-4 py-3 rounded-lg text-brand-green hover:text-brand-gold hover:bg-accent/5 transition-all" onClick={() => setIsOpen(false)}>Энергосессии</Link>
              <Link to="/transformation" className="px-4 py-3 rounded-lg text-brand-green hover:text-brand-gold hover:bg-accent/5 transition-all" onClick={() => setIsOpen(false)}>Практикум</Link>
              <Link to="/training" className="px-4 py-3 rounded-lg text-brand-green hover:text-brand-gold hover:bg-accent/5 transition-all" onClick={() => setIsOpen(false)}>Обучение</Link>
              <Link to="/test" className="px-4 py-3 rounded-lg text-brand-green hover:text-brand-gold hover:bg-accent/5 transition-all" onClick={() => setIsOpen(false)}>Тест</Link>
              <Link to="/masters" className="px-4 py-3 rounded-lg text-brand-green hover:text-brand-gold hover:bg-accent/5 transition-all" onClick={() => setIsOpen(false)}>Мастера</Link>
            </div>
          </div>
        )}
        </div>
      </div>
    </nav>
  );
};

export { Navigation };
