import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Users, Send, Filter, MessageSquare } from "lucide-react";
import { getMasterByUserId, updateMasterProfile } from "@/data/mockMasters";
import { useToast } from "@/hooks/use-toast";
import { sanitizeString, isValidEmail } from "@/lib/sanitize";

const MasterDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [userId, setUserId] = useState<string>('');
  const [masterProfile, setMasterProfile] = useState<any>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    description: '',
    cities: '',
    social: '',
    tags: '',
    pulseCount: '',
    pulseTags: ''
  });

  const [selectedSegment, setSelectedSegment] = useState('all');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [showBroadcastSuccess, setShowBroadcastSuccess] = useState(false);

  // Mock данные для CRM
  const mockContacts = [
    { id: 1, telegram: '@client_one', name: 'Анна Иванова', segment: 'постоянные', lastSession: '2025-11-05', sessions: 5 },
    { id: 2, telegram: '@client_two', name: 'Мария Петрова', segment: 'новые', lastSession: '2025-11-07', sessions: 1 },
    { id: 3, telegram: '@client_three', name: 'Ольга Сидорова', segment: 'постоянные', lastSession: '2025-11-07', sessions: 8 },
    { id: 4, telegram: '@client_four', name: 'Елена Козлова', segment: 'неактивные', lastSession: '2025-10-15', sessions: 2 },
    { id: 5, telegram: '@client_five', name: 'Дарья Волкова', segment: 'постоянные', lastSession: '2025-11-08', sessions: 12 },
  ];

  const segments = [
    { id: 'all', name: 'Все клиенты', count: 5, color: 'bg-gray-500' },
    { id: 'новые', name: 'Новые', count: 1, color: 'bg-green-500' },
    { id: 'постоянные', name: 'Постоянные', count: 3, color: 'bg-blue-500' },
    { id: 'неактивные', name: 'Неактивные', count: 1, color: 'bg-orange-500' },
  ];

  const filteredContacts = selectedSegment === 'all' 
    ? mockContacts 
    : mockContacts.filter(c => c.segment === selectedSegment);

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    const storedUserId = localStorage.getItem('userId');
    
    if (userRole !== 'master' || !storedUserId) {
      navigate('/login');
      return;
    }
    
    setUserId(storedUserId);
    
    // Загрузка профиля мастера
    const profile = getMasterByUserId(storedUserId);
    if (profile) {
      setMasterProfile(profile);
      setFormData({
        name: profile.name.split(' ')[0] || '',
        surname: profile.name.split(' ')[1] || '',
        description: profile.description,
        cities: profile.cities.join(', '),
        social: profile.socials.join(', '),
        tags: profile.tags.join(', '),
        pulseCount: profile.pulse.sessionsMonth.toString(),
        pulseTags: profile.pulse.reviews.join(', ')
      });
    }
  }, [navigate]);

  const handleSave = () => {
    if (!userId) return;
    
    // Санитизация всех полей перед сохранением
    const sanitizedName = sanitizeString(formData.name, 100);
    const sanitizedSurname = sanitizeString(formData.surname, 100);
    const sanitizedDescription = sanitizeString(formData.description, 2000);
    
    if (!sanitizedName || !sanitizedSurname) {
      toast({
        title: "Ошибка",
        description: "Заполните имя и фамилию",
        variant: "destructive"
      });
      return;
    }
    
    const profileData = {
      name: `${sanitizedName} ${sanitizedSurname}`.trim(),
      description: sanitizedDescription,
      cities: formData.cities.split(',').map(c => sanitizeString(c.trim(), 100)).filter(Boolean),
      socials: formData.social.split(',').map(s => sanitizeString(s.trim(), 200)).filter(Boolean),
      tags: formData.tags.split(',').map(t => sanitizeString(t.trim(), 50)).filter(Boolean),
      pulse: {
        sessionsMonth: Math.max(0, Math.min(1000, parseInt(formData.pulseCount) || 0)),
        reviews: formData.pulseTags.split(',').map(t => sanitizeString(t.trim(), 100)).filter(Boolean)
      },
      photo: masterProfile?.photo || '',
      telegram: masterProfile?.telegram || '',
      schedule: masterProfile?.schedule || []
    };
    
    const updated = updateMasterProfile(userId, profileData);
    setMasterProfile(updated);
    
    const isFirstSave = !masterProfile;
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
    
    if (isFirstSave || updated.status === 'pending') {
      toast({
        title: "Отправлено на модерацию",
        description: "Ваша карточка отправлена на проверку администратору. После одобрения она появится в разделе 'Мастера'.",
        duration: 5000
      });
    } else {
      toast({
        title: "Сохранено",
        description: "Изменения успешно сохранены",
      });
    }
  };

  const handleSendBroadcast = () => {
    if (!broadcastMessage.trim()) return;
    setShowBroadcastSuccess(true);
    setTimeout(() => {
      setShowBroadcastSuccess(false);
      setBroadcastMessage('');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-brand-green">
            Личный кабинет Мастера
          </h1>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Tabs navigation - scrollable on mobile */}
            <div className="border-b border-gray-200 overflow-x-auto">
              <div className="flex min-w-max">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`px-4 md:px-6 py-4 font-medium whitespace-nowrap ${
                    activeTab === 'profile'
                      ? 'bg-brand-bg text-brand-green border-b-2 border-brand-gold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Профиль
                </button>
                <button
                  onClick={() => setActiveTab('schedule')}
                  className={`px-4 md:px-6 py-4 font-medium whitespace-nowrap ${
                    activeTab === 'schedule'
                      ? 'bg-brand-bg text-brand-green border-b-2 border-brand-gold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Расписание
                </button>
                <button
                  onClick={() => setActiveTab('statistics')}
                  className={`px-4 md:px-6 py-4 font-medium whitespace-nowrap ${
                    activeTab === 'statistics'
                      ? 'bg-brand-bg text-brand-green border-b-2 border-brand-gold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Статистика
                </button>
                <button
                  onClick={() => setActiveTab('payment')}
                  className={`px-4 md:px-6 py-4 font-medium whitespace-nowrap ${
                    activeTab === 'payment'
                      ? 'bg-brand-bg text-brand-green border-b-2 border-brand-gold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Оплата
                </button>
                <button
                  onClick={() => setActiveTab('crm')}
                  className={`px-4 md:px-6 py-4 font-medium whitespace-nowrap ${
                    activeTab === 'crm'
                      ? 'bg-brand-bg text-brand-green border-b-2 border-brand-gold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  CRM и бот
                </button>
              </div>
            </div>

            {/* Page buttons - separate row on mobile, inline on desktop */}
            <div className="border-b border-gray-200 p-4 flex flex-col sm:flex-row gap-2 sm:justify-end">
              {masterProfile && (
                <>
                  <button
                    onClick={() => navigate(`/master/${masterProfile.id}`)}
                    className="px-4 py-2 text-brand-green hover:bg-gray-50 border border-brand-green rounded text-sm whitespace-nowrap"
                  >
                    Внутренняя страница →
                  </button>
                  <button
                    onClick={() => navigate(`/master-standalone/${masterProfile.id}`)}
                    className="px-4 py-2 bg-brand-gold text-white hover:bg-brand-gold/90 rounded text-sm whitespace-nowrap"
                  >
                    Автономная страница →
                  </button>
                </>
              )}
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
                    <label className="block mb-2 text-sm font-medium">
                      Работаю с запросами (через запятую)
                    </label>
                    <Input
                      value={formData.tags}
                      onChange={(e) => setFormData({...formData, tags: e.target.value})}
                      placeholder="anxiety, resource, finance, relations"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Например: anxiety, resource, finance, relations
                    </p>
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
                      {masterProfile?.schedule && masterProfile.schedule.length > 0 ? (
                        masterProfile.schedule.map((date, idx) => (
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
                        ))
                      ) : (
                        <p className="text-muted-foreground">Нет активных дат</p>
                      )}
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

              {activeTab === 'payment' && (
                <div className="space-y-6">
                  <h2 className="font-serif text-2xl font-semibold text-brand-green">
                    Интеграция с Prodamus
                  </h2>

                  <div className="bg-accent/10 border border-accent/20 p-6 rounded-lg">
                    <h3 className="font-semibold mb-4 text-brand-green">Настройка платежной системы</h3>
                    <p className="text-gray-700 mb-6">
                      Подключите Prodamus для приема платежей за сессии. После настройки кнопка "Оплатить" на вашей странице будет автоматически создавать платежные ссылки.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <label className="block mb-2 text-sm font-medium">Secret Key от Prodamus</label>
                        <Input
                          type="password"
                          placeholder="Введите ваш Secret Key"
                          className="font-mono"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Получите Secret Key в личном кабинете Prodamus
                        </p>
                      </div>

                      <div>
                        <label className="block mb-2 text-sm font-medium">Стоимость сессии (₽)</label>
                        <Input
                          type="number"
                          defaultValue="10000"
                          placeholder="10000"
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-sm font-medium">Описание платежа</label>
                        <Input
                          defaultValue="Оплата энергетической сессии"
                          placeholder="Описание для клиента"
                        />
                      </div>
                    </div>

                    <Button className="bg-accent hover:bg-accent/90 text-white mt-6">
                      Сохранить настройки
                    </Button>
                  </div>

                  <div className="bg-brand-bg p-6 rounded-lg">
                    <h3 className="font-semibold mb-4 text-brand-green">Как это работает</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex gap-3">
                        <span className="text-accent font-bold">1.</span>
                        <span>Клиент нажимает кнопку "Оплатить сессию" на вашей странице</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-accent font-bold">2.</span>
                        <span>Автоматически генерируется уникальная платежная ссылка Prodamus</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-accent font-bold">3.</span>
                        <span>Клиент оплачивает удобным способом через защищенную форму</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-accent font-bold">4.</span>
                        <span>Вы получаете уведомление об успешной оплате в разделе "Статистика"</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white border border-gray-200 p-6 rounded-lg">
                    <h3 className="font-semibold mb-3 text-brand-green">Тестовая ссылка</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Проверьте, как будет выглядеть платежная форма для ваших клиентов
                    </p>
                    <Button variant="outline" className="w-full">
                      Создать тестовый платеж
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === 'crm' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="font-serif text-2xl font-semibold text-brand-green flex items-center gap-2">
                      <Users className="w-6 h-6" />
                      CRM и рассылки
                    </h2>
                  </div>

                  {/* Сегменты */}
                  <div>
                    <h3 className="font-semibold mb-3 text-brand-green flex items-center gap-2">
                      <Filter className="w-5 h-5" />
                      Сегменты клиентов
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {segments.map((segment) => (
                        <Card
                          key={segment.id}
                          onClick={() => setSelectedSegment(segment.id)}
                          className={`p-4 cursor-pointer transition-all ${
                            selectedSegment === segment.id
                              ? 'border-brand-gold border-2 bg-brand-bg'
                              : 'border-gray-200 hover:border-brand-gold/50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-sm">{segment.name}</p>
                              <p className="text-2xl font-bold text-brand-gold">{segment.count}</p>
                            </div>
                            <div className={`w-3 h-3 rounded-full ${segment.color}`}></div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Рассылка */}
                  <div className="border-t pt-6">
                    <h3 className="font-semibold mb-3 text-brand-green flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Создать рассылку
                    </h3>
                    <Card className="p-6 bg-brand-bg/50">
                      <div className="space-y-4">
                        <div>
                          <label className="block mb-2 text-sm font-medium">
                            Сегмент: <span className="text-brand-gold font-semibold">
                              {segments.find(s => s.id === selectedSegment)?.name}
                            </span>
                            <span className="text-gray-500 ml-2">
                              ({filteredContacts.length} получателей)
                            </span>
                          </label>
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium">Сообщение</label>
                          <Textarea
                            value={broadcastMessage}
                            onChange={(e) => setBroadcastMessage(e.target.value)}
                            placeholder="Напишите сообщение для рассылки..."
                            rows={4}
                            className="resize-none"
                          />
                          <p className="text-sm text-gray-500 mt-1">
                            {broadcastMessage.length} символов
                          </p>
                        </div>
                        <Button 
                          onClick={handleSendBroadcast}
                          disabled={!broadcastMessage.trim()}
                          className="bg-brand-gold hover:bg-brand-gold/90 w-full"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Отправить рассылку
                        </Button>
                        {showBroadcastSuccess && (
                          <p className="text-green-600 font-medium text-center">
                            Рассылка отправлена!
                          </p>
                        )}
                      </div>
                    </Card>
                  </div>

                  {/* Список контактов */}
                  <div className="border-t pt-6">
                    <h3 className="font-semibold mb-4 text-brand-green">
                      Контакты ({filteredContacts.length})
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-brand-bg">
                          <tr>
                            <th className="p-3 text-left">Telegram</th>
                            <th className="p-3 text-left">Имя</th>
                            <th className="p-3 text-left">Сегмент</th>
                            <th className="p-3 text-left">Последняя сессия</th>
                            <th className="p-3 text-left">Всего сессий</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredContacts.map((contact) => (
                            <tr key={contact.id} className="border-b hover:bg-brand-bg/30">
                              <td className="p-3 font-medium">{contact.telegram}</td>
                              <td className="p-3">{contact.name}</td>
                              <td className="p-3">
                                <Badge className="bg-brand-gold/20 text-brand-green border-0">
                                  {contact.segment}
                                </Badge>
                              </td>
                              <td className="p-3">{contact.lastSession}</td>
                              <td className="p-3 font-semibold text-brand-gold">{contact.sessions}</td>
                            </tr>
                          ))}
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
