export interface Master {
  id: number;
  name: string;
  cities: string[];
  description: string;
  socials: string[];
  schedule: string[];
  tags: string[];
  pulse: {
    sessionsMonth: number;
    reviews: string[];
  };
  photo: string;
  telegram: string;
  status?: 'pending' | 'approved' | 'rejected';
  userId?: string;
}

export const mockMasters: Master[] = [
  {
    id: 0,
    name: "Анастасия Соло",
    cities: ["Москва", "Онлайн", "Весь Мир"],
    description: "Проводник с 5-летним опытом. Мягко и бережно проведу вас к вашему ресурсу. Помогаю снять тревогу и обрести ясность.",
    socials: ["Telegram", "Instagram"],
    schedule: ["2025-11-10T10:00", "2025-11-17T10:00"],
    tags: ["anxiety", "resource", "finance", "relations"],
    pulse: {
      sessionsMonth: 50,
      reviews: ["основатель", "глубина", "мощь", "любовь", "трансформация"]
    },
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    telegram: "@anastasia_solo_era",
    status: "approved"
  },
  {
    id: 1,
    name: "Елена Волкова",
    cities: ["Москва", "Онлайн"],
    description: "Проводник с 5-летним опытом. Мягко и бережно проведу вас к вашему ресурсу. Помогаю снять тревогу и обрести ясность.",
    socials: ["Telegram", "Instagram"],
    schedule: ["2025-11-10T19:00", "2025-11-12T19:00", "2025-11-15T18:00"],
    tags: ["anxiety", "resource"],
    pulse: {
      sessionsMonth: 14,
      reviews: ["мощно", "расслабление", "глубоко", "слёзы", "тепло"]
    },
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    telegram: "@elena_volkova_era",
    status: "approved"
  },
  {
    id: 2,
    name: "Михаил Светлов",
    cities: ["Санкт-Петербург", "Онлайн"],
    description: "Специализируюсь на работе с финансовыми блоками и отношениями. Мой подход - это честность, глубина и быстрый результат.",
    socials: ["Telegram"],
    schedule: ["2025-11-11T20:00", "2025-11-13T20:00"],
    tags: ["finance", "relations", "resource"],
    pulse: {
      sessionsMonth: 22,
      reviews: ["трансформация", "прорыв", "ясно", "огонь"]
    },
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    telegram: "@michael_svetlov_era",
    status: "approved"
  },
  {
    id: 3,
    name: "Анна Луч",
    cities: ["Сочи"],
    description: "Мастер по работе с телом и поиском ресурса. Если чувствуете выгорание - я помогу вам снова зажечь свой внутренний свет.",
    socials: ["Instagram"],
    schedule: ["2025-11-10T15:00", "2025-11-14T15:00"],
    tags: ["resource", "anxiety"],
    pulse: {
      sessionsMonth: 8,
      reviews: ["нежно", "глубоко", "спокойно", "наполнение"]
    },
    photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
    telegram: "@anna_luch_era",
    status: "approved"
  }
];

const MASTERS_STORAGE_KEY = 'app_masters';

export const loadMasters = (): Master[] => {
  try {
    const stored = localStorage.getItem(MASTERS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading masters:', error);
  }
  return mockMasters;
};

export const saveMasters = (masters: Master[]): void => {
  try {
    localStorage.setItem(MASTERS_STORAGE_KEY, JSON.stringify(masters));
  } catch (error) {
    console.error('Error saving masters:', error);
  }
};

export const updateMasterProfile = (userId: string, profileData: Partial<Master>): Master => {
  const masters = loadMasters();
  const existingMasterIndex = masters.findIndex(m => m.userId === userId);
  
  if (existingMasterIndex >= 0) {
    // Обновляем существующий профиль
    masters[existingMasterIndex] = {
      ...masters[existingMasterIndex],
      ...profileData,
      status: masters[existingMasterIndex].status === 'approved' ? 'approved' : 'pending'
    };
    saveMasters(masters);
    return masters[existingMasterIndex];
  } else {
    // Создаем новый профиль со статусом pending
    const newMaster: Master = {
      id: Math.max(...masters.map(m => m.id), 0) + 1,
      name: profileData.name || '',
      cities: profileData.cities || [],
      description: profileData.description || '',
      socials: profileData.socials || [],
      schedule: profileData.schedule || [],
      tags: profileData.tags || [],
      pulse: profileData.pulse || { sessionsMonth: 0, reviews: [] },
      photo: profileData.photo || '',
      telegram: profileData.telegram || '',
      status: 'pending',
      userId
    };
    masters.push(newMaster);
    saveMasters(masters);
    return newMaster;
  }
};

export const getMasterByUserId = (userId: string): Master | null => {
  const masters = loadMasters();
  return masters.find(m => m.userId === userId) || null;
};

export const getApprovedMasters = (): Master[] => {
  const masters = loadMasters();
  return masters.filter(m => m.status === 'approved');
};

export const getPendingMasters = (): Master[] => {
  const masters = loadMasters();
  return masters.filter(m => m.status === 'pending');
};

export const approveMaster = (masterId: number): void => {
  const masters = loadMasters();
  const updated = masters.map(m => 
    m.id === masterId ? { ...m, status: 'approved' as const } : m
  );
  saveMasters(updated);
};

export const rejectMaster = (masterId: number): void => {
  const masters = loadMasters();
  const updated = masters.map(m => 
    m.id === masterId ? { ...m, status: 'rejected' as const } : m
  );
  saveMasters(updated);
};
