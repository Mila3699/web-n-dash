import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { mockMasters } from "@/data/mockMasters";

const MasterDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [master, setMaster] = useState(mockMasters[1]);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    description: '',
    cities: '',
    social: '',
    pulseCount: '',
    pulseTags: ''
  });

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'master') {
      navigate('/login');
    }
    
    // Загрузка данных мастера
    setFormData({
      name: master.name.split(' ')[0] || '',
      surname: master.name.split(' ')[1] || '',
      description: master.description,
      cities: master.cities.join(', '),
      social: master.socials.join(', '),
      pulseCount: master.pulse.sessionsMonth.toString(),
      pulseTags: master.pulse.reviews.join(', ')
    });
  }, [navigate, master]);

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="font-serif text-4xl font-bold mb-8 text-brand-green">
            Личный кабинет Мастера
          </h1>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-4 font-medium ${
                  activeTab === 'profile'
                    ? 'bg-brand-bg text-brand-green border-b-2 border-brand-gold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Профиль
              </button>
              <button
                onClick={() => setActiveTab('schedule')}
                className={`px-6 py-4 font-medium ${
                  activeTab === 'schedule'
                    ? 'bg-brand-bg text-brand-green border-b-2 border-brand-gold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Расписание
              </button>
              <button
                onClick={() => setActiveTab('statistics')}
                className={`px-6 py-4 font-medium ${
                  activeTab === 'statistics'
                    ? 'bg-brand-bg text-brand-green border-b-2 border-brand-gold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Статистика
              </button>
              <button
                onClick={() => navigate(`/master/${master.id}`)}
                className="ml-auto px-6 py-4 text-brand-gold hover:bg-gray-50"
              >
                Посмотреть мою страницу →
              </button>
            </div>

            <div className="p-8">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className="font-serif text-2xl font-semibold text-brand-green">
                    Редактировать профиль
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium">Имя</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium">Фамилия</label>
                      <Input
                        value={formData.surname}
                        onChange={(e) => setFormData({...formData, surname: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Описание (макс. 500 симв.)
                    </label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      maxLength={500}
                      rows={4}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {formData.description.length} / 500
                    </p>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Города (через запятую)
                    </label>
                    <Input
                      value={formData.cities}
                      onChange={(e) => setFormData({...formData, cities: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Ссылки на соц. сети (через запятую)
                    </label>
                    <Input
                      value={formData.social}
                      onChange={(e) => setFormData({...formData, social: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium">Загрузить фото</label>
                    <Input type="file" accept="image/*" />
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-serif text-xl font-semibold mb-4 text-brand-green">
                      "Пульс Сессий" (MVP)
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 text-sm font-medium">
                          Кол-во сессий в этом месяце
                        </label>
                        <Input
                          type="number"
                          value={formData.pulseCount}
                          onChange={(e) => setFormData({...formData, pulseCount: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium">
                          Ключевые слова-отзывы (через запятую)
                        </label>
                        <Input
                          value={formData.pulseTags}
                          onChange={(e) => setFormData({...formData, pulseTags: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handleSave}
                    className="bg-brand-gold hover:bg-brand-gold/90"
                  >
                    Сохранить изменения
                  </Button>

                  {showSuccess && (
                    <p className="text-green-600 font-medium">Сохранено!</p>
                  )}
                </div>
              )}

              {activeTab === 'schedule' && (
                <div className="space-y-6">
                  <h2 className="font-serif text-2xl font-semibold text-brand-green">
                    Управление расписанием
                  </h2>

                  <div className="flex gap-4">
                    <Input type="datetime-local" className="flex-1" />
                    <Button className="bg-brand-gold hover:bg-brand-gold/90">
                      Добавить
                    </Button>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4 text-brand-green">Активные даты:</h3>
                    <div className="space-y-2">
                      {master.schedule.map((date, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-brand-bg p-3 rounded">
                          <span>
                            {new Date(date).toLocaleString('ru-RU', {
                              dateStyle: 'long',
                              timeStyle: 'short'
                            })}
                          </span>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            ✕ Удалить
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'statistics' && (
                <div className="space-y-6">
                  <h2 className="font-serif text-2xl font-semibold text-brand-green">
                    Статистика оплат
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-brand-bg p-6 rounded-lg">
                      <p className="text-4xl font-bold text-brand-gold mb-2">12</p>
                      <p className="text-gray-600">Оплат в этом месяце</p>
                    </div>
                    <div className="bg-brand-bg p-6 rounded-lg">
                      <p className="text-4xl font-bold text-brand-gold mb-2">120 000 ₽</p>
                      <p className="text-gray-600">Доход в этом месяце</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4 text-brand-green">Последние оплаты</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-brand-bg">
                          <tr>
                            <th className="p-3 text-left">Клиент (Telegram)</th>
                            <th className="p-3 text-left">Дата сессии</th>
                            <th className="p-3 text-left">Сумма</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-3">@client_one</td>
                            <td className="p-3">2025-11-05 19:00</td>
                            <td className="p-3">10 000 ₽</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-3">@client_two</td>
                            <td className="p-3">2025-11-07 19:00</td>
                            <td className="p-3">10 000 ₽</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-3">@client_three</td>
                            <td className="p-3">2025-11-07 19:00</td>
                            <td className="p-3">10 000 ₽</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MasterDashboard;
