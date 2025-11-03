import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();

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
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="font-serif text-2xl font-bold text-brand-green">
            ERA
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-brand-green hover:text-brand-gold transition-colors">Главная</Link>
            <Link to="/" className="text-brand-green hover:text-brand-gold transition-colors">Энергосессии</Link>
            <Link to="/transformation" className="text-brand-green hover:text-brand-gold transition-colors">Энергопрактикум</Link>
            <Link to="/training" className="text-brand-green hover:text-brand-gold transition-colors">Обучение</Link>
            <Link to="/test" className="text-brand-green hover:text-brand-gold transition-colors">Тест</Link>
            <Link to="/masters" className="text-brand-green hover:text-brand-gold transition-colors">Каталог Мастеров</Link>
            
            {!userRole ? (
              <Button onClick={() => navigate('/login')} variant="outline" className="border-brand-gold text-brand-gold hover:bg-brand-gold/10">
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
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-brand-green hover:text-brand-gold transition-colors" onClick={() => setIsOpen(false)}>Главная</Link>
              <Link to="/transformation" className="text-brand-green hover:text-brand-gold transition-colors" onClick={() => setIsOpen(false)}>Энергопрактикум</Link>
              <Link to="/training" className="text-brand-green hover:text-brand-gold transition-colors" onClick={() => setIsOpen(false)}>Обучение</Link>
              <Link to="/test" className="text-brand-green hover:text-brand-gold transition-colors" onClick={() => setIsOpen(false)}>Тест</Link>
              <Link to="/masters" className="text-brand-green hover:text-brand-gold transition-colors" onClick={() => setIsOpen(false)}>Каталог Мастеров</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export { Navigation };
