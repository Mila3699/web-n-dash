import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { mockMasters } from "@/data/mockMasters";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'admin') {
      navigate('/login');
    }
  }, [navigate]);

  const totalSessions = mockMasters.reduce((sum, m) => sum + m.pulse.sessionsMonth, 0);
  const totalRevenue = totalSessions * 10000;

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <h1 className="font-serif text-4xl font-bold mb-8 text-brand-green">
            Панель Администратора
          </h1>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-4xl font-bold text-brand-gold mb-2">{mockMasters.length}</p>
              <p className="text-gray-600">Активных Мастеров</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-4xl font-bold text-brand-gold mb-2">{totalSessions}</p>
              <p className="text-gray-600">Сессий (за месяц)</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-4xl font-bold text-brand-gold mb-2">
                {totalRevenue.toLocaleString('ru-RU')} ₽
              </p>
              <p className="text-gray-600">Оборот (за месяц)</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="font-serif text-2xl font-semibold mb-6 text-brand-green">
              Динамика сессий (Год)
            </h2>
            <div className="h-64 flex items-end justify-around gap-4">
              {[120, 150, 180, 200, 250, 300, 350, 400, 420, 450, 452, 480].map((value, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-brand-gold rounded-t"
                    style={{ height: `${(value / 480) * 100}%` }}
                  ></div>
                  <span className="text-xs mt-2 text-gray-600">{idx + 1}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="font-serif text-2xl font-semibold mb-6 text-brand-green">
              Данные по Мастерам
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-brand-bg">
                  <tr>
                    <th className="p-3 text-left">Мастер</th>
                    <th className="p-3 text-left">Город</th>
                    <th className="p-3 text-left">Сессий (мес)</th>
                    <th className="p-3 text-left">Доход (мес)</th>
                  </tr>
                </thead>
                <tbody>
                  {mockMasters.map((master) => (
                    <tr key={master.id} className="border-b hover:bg-brand-bg/50">
                      <td className="p-3 font-medium">{master.name}</td>
                      <td className="p-3">{master.cities.join(', ')}</td>
                      <td className="p-3">{master.pulse.sessionsMonth}</td>
                      <td className="p-3">{(master.pulse.sessionsMonth * 10000).toLocaleString('ru-RU')} ₽</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
