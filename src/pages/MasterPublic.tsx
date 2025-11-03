import { useParams, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockMasters } from "@/data/mockMasters";

const MasterPublic = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const master = mockMasters.find(m => m.id === Number(id));

  if (!master) {
    navigate('/masters');
    return null;
  }

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/masters')}
            className="mb-6"
          >
            ← Вернуться в каталог
          </Button>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <img 
                src={master.photo} 
                alt={master.name}
                className="w-48 h-48 rounded-full object-cover mx-auto md:mx-0"
              />
              <div className="flex-1">
                <h1 className="font-serif text-4xl font-bold mb-2 text-brand-green">{master.name}</h1>
                <p className="text-brand-gold mb-4">{master.cities.join(', ')}</p>
                
                <div className="mb-6">
                  <h3 className="font-serif text-xl font-semibold mb-2 text-brand-green">Аудио-визитка:</h3>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Аудио будет здесь</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-serif text-2xl font-semibold mb-4 text-brand-green">Метод Кундалини ERA</h3>
              <p className="text-gray-700 leading-relaxed">
                Это единый стандартизированный текст от Академии. Кундалини ERA — это прямая передача жизненной энергии, 
                которая активирует ваш собственный внутренний потенциал. Это безопасный процесс, который помогает снять блоки, 
                исцелить травмы и выйти на новый уровень сознания, ощущая глубокую связь с собой и миром.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="font-serif text-2xl font-semibold mb-4 text-brand-green">О Мастере</h3>
              <p className="text-gray-700 leading-relaxed">{master.description}</p>
            </div>

            <div className="mb-8">
              <h3 className="font-serif text-2xl font-semibold mb-4 text-brand-green">Работаю с запросами:</h3>
              <div className="flex flex-wrap gap-2">
                {master.tags.map((tag, idx) => (
                  <span key={idx} className="bg-brand-gold/10 text-brand-gold px-4 py-2 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8 bg-brand-bg p-6 rounded-lg">
              <h3 className="font-serif text-2xl font-semibold mb-4 text-brand-green">Пульс Сессий</h3>
              <p className="text-4xl font-bold text-brand-gold mb-2">{master.pulse.sessionsMonth}</p>
              <p className="text-gray-600 mb-4">сессий проведено в этом месяце</p>
              
              <h4 className="font-semibold mb-2 text-brand-green">Эмоции участников:</h4>
              <div className="flex flex-wrap gap-2">
                {master.pulse.reviews.map((review, idx) => (
                  <span key={idx} className="bg-white px-3 py-1 rounded-full text-sm text-brand-green border border-brand-gold">
                    {review}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-brand-green text-white p-8 rounded-lg">
              <h3 className="font-serif text-2xl font-semibold mb-6">Записаться на сессию</h3>
              
              <div className="mb-4">
                <label className="block mb-2 font-medium">Выберите дату:</label>
                <select className="w-full p-3 rounded-lg bg-white text-brand-green">
                  <option value="">Выберите дату</option>
                  {master.schedule.map((date, idx) => (
                    <option key={idx} value={date}>
                      {new Date(date).toLocaleString('ru-RU', { 
                        dateStyle: 'long', 
                        timeStyle: 'short' 
                      })}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block mb-2 font-medium">Ваш Telegram для связи:</label>
                <Input 
                  type="text" 
                  placeholder="@username"
                  className="bg-white text-brand-green"
                />
              </div>

              <Button className="w-full bg-brand-gold hover:bg-brand-gold/90 text-white">
                Отправить заявку
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MasterPublic;
