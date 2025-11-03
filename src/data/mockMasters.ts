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
    telegram: "@anastasia_solo_era"
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
    telegram: "@elena_volkova_era"
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
    telegram: "@michael_svetlov_era"
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
    telegram: "@anna_luch_era"
  }
];
