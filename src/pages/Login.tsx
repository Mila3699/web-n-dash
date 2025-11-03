import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleMasterLogin = () => {
    // Имитация входа мастера
    localStorage.setItem('userRole', 'master');
    localStorage.setItem('masterId', '1');
    navigate('/master-dashboard');
  };

  const handleAdminLogin = () => {
    // Имитация входа администратора
    localStorage.setItem('userRole', 'admin');
    navigate('/admin-dashboard');
  };

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navigation />
      
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="font-serif text-3xl font-bold mb-8 text-center text-brand-green">
              Вход в систему
            </h1>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-brand-green">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-brand-green">Пароль</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={handleMasterLogin}
                className="w-full bg-brand-green hover:bg-brand-green/90 text-white"
              >
                Войти (Мастер)
              </Button>

              <Button 
                onClick={handleAdminLogin}
                variant="outline"
                className="w-full border-brand-gold text-brand-gold hover:bg-brand-gold/10"
              >
                Войти (Администратор)
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
