import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authenticateUser } from "@/lib/users";
import { sanitizeString, isValidEmail } from "@/lib/sanitize";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const sanitizedEmail = sanitizeString(email, 255).toLowerCase();
    const sanitizedPassword = sanitizeString(password, 255);
    
    if (!sanitizedEmail || !sanitizedPassword) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive",
      });
      return;
    }

    if (!isValidEmail(sanitizedEmail)) {
      toast({
        title: "Ошибка",
        description: "Неверный формат email",
        variant: "destructive",
      });
      return;
    }

    const user = authenticateUser(sanitizedEmail, sanitizedPassword);
    
    if (user) {
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('userId', user.id);
      if (user.masterId) {
        localStorage.setItem('masterId', user.masterId);
      }
      
      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (user.role === 'master') {
        navigate('/master-dashboard');
      }
    } else {
      toast({
        title: "Ошибка",
        description: "Неверный email или пароль",
        variant: "destructive",
      });
    }
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

            <form onSubmit={handleLogin} className="space-y-4 mb-6">
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
            </form>

            <Button
              onClick={handleLogin}
              className="w-full bg-brand-green hover:bg-brand-green/90 text-white"
              type="submit"
            >
              Войти
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
