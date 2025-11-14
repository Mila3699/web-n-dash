export interface ContentBlock {
  id: string;
  type: 'hero' | 'text' | 'image' | 'button' | 'section' | 'gallery';
  title?: string;
  content?: string;
  imageUrl?: string;
  buttonText?: string;
  buttonLink?: string;
  images?: string[]; // For gallery type
  order: number;
}

export interface PageContent {
  pageId: string;
  pageName: string;
  blocks: ContentBlock[];
}

export const defaultSiteContent: PageContent[] = [
  {
    pageId: 'home',
    pageName: 'Главная',
    blocks: [
      {
        id: 'hero-badge',
        type: 'text',
        title: 'Бейдж герой-секции',
        content: 'Метод энерготерапии ERA',
        order: 0
      },
      {
        id: 'hero-title',
        type: 'text',
        title: 'Заголовок герой-секции',
        content: 'Раскройте\nсвой потенциал',
        order: 1
      },
      {
        id: 'hero-subtitle',
        type: 'text',
        title: 'Подзаголовок герой-секции',
        content: 'Трансформация через энергию',
        order: 2
      },
      {
        id: 'hero-cta',
        type: 'button',
        buttonText: 'Записаться на сессию',
        buttonLink: '/masters',
        order: 3
      },
      {
        id: 'hero-test-title',
        type: 'text',
        title: 'Заголовок теста',
        content: 'Анализ вашей энергосистемы',
        order: 4
      },
      {
        id: 'hero-test-desc',
        type: 'text',
        title: 'Описание теста',
        content: 'Пройдите бесплатный тест и получите персональные рекомендации от мастеров ERA',
        order: 5
      },
      {
        id: 'sessions-badge',
        type: 'text',
        title: 'Бейдж секции сессий',
        content: 'Метод энергосессий',
        order: 6
      },
      {
        id: 'sessions-title',
        type: 'text',
        title: 'Заголовок секции сессий',
        content: 'Энергосессии\nКундалини ERA',
        order: 7
      },
      {
        id: 'sessions-subtitle',
        type: 'text',
        title: 'Подзаголовок секции сессий',
        content: 'Прямая передача жизненной энергии для вашей активации и глубокой трансформации',
        order: 8
      },
      {
        id: 'sessions-what-title',
        type: 'text',
        title: 'Что такое энергосессия',
        content: 'Что такое\nЭнергосессия?',
        order: 9
      },
      {
        id: 'sessions-what-desc',
        type: 'text',
        title: 'Описание энергосессии',
        content: 'Это активация вашей внутренней энергии через поле мастера-проводника.\n\nВы лежите, расслабляетесь под музыку — энергия работает сама, высвобождая блоки и наполняя ресурсом.',
        order: 10
      },
      {
        id: 'sessions-feel-title',
        type: 'text',
        title: 'Что вы почувствуете',
        content: 'Что вы\nпочувствуете?',
        order: 11
      },
      {
        id: 'transformation-badge',
        type: 'text',
        title: 'Бейдж секции трансформации',
        content: '8-недельная программа',
        order: 12
      },
      {
        id: 'transformation-title',
        type: 'text',
        title: 'Заголовок секции трансформации',
        content: 'Энергопрактикум\n"Трансформация"',
        order: 13
      },
      {
        id: 'transformation-subtitle',
        type: 'text',
        title: 'Подзаголовок секции трансформации',
        content: 'Раскрытие твоего потенциала через активацию кундалини энергии, очищение энергополя и восстановление твоей энергосистемы',
        order: 14
      },
      {
        id: 'transformation-about',
        type: 'text',
        title: 'О практикуме',
        content: 'Это системная работа с вашей энергоструктурой. Метод энерготерапии ERA объединяет активацию кундалини, чтение и очищение энергополя, а также восстановление энергосистемы для глубинных трансформаций.\n\nЭнергопрактикум работает как катализатор — многократно ускоряет процессы изменений в вашей жизни. События начинают происходить быстрее, возможности раскрываются, нужные люди и ресурсы притягиваются естественным образом.',
        order: 15
      },
      {
        id: 'training-badge',
        type: 'text',
        title: 'Бейдж секции обучения',
        content: 'Профессиональное обучение',
        order: 16
      },
      {
        id: 'training-title',
        type: 'text',
        title: 'Заголовок секции обучения',
        content: 'Станьте\nФасилитатором\nКундалини ERA',
        order: 17
      },
      {
        id: 'training-subtitle',
        type: 'text',
        title: 'Подзаголовок секции обучения',
        content: 'Метод энерготерапии ERA – системная работа через активацию кундалини, очищение и восстановление энергоструктуры человека',
        order: 18
      },
      {
        id: 'training-about',
        type: 'text',
        title: 'Об обучении',
        content: 'Наша цель – помочь вам пробудить ваш внутренний ресурс и стать сильными проводниками трансформации для других.\n\nЭто новое пространство для глубокого изучения энергии Кундалини и развития уникальных навыков энерготерапевта-фасилитатора. Здесь встречаются осознанность, наука и практика.',
        order: 19
      },
      {
        id: 'gallery-1',
        type: 'gallery',
        title: 'Галерея',
        images: [
          '/src/assets/session-1.jpg',
          '/src/assets/session-2.jpg',
          '/src/assets/session-3.jpg',
          '/src/assets/session-4.jpg',
          '/src/assets/session-5.jpg',
          '/src/assets/session-6.jpg'
        ],
        order: 20
      }
    ]
  },
  {
    pageId: 'training',
    pageName: 'Обучение',
    blocks: [
      {
        id: 'training-hero-title',
        type: 'text',
        title: 'Заголовок страницы обучения',
        content: 'Станьте фасилитатором Кундалини ERA',
        order: 0
      },
      {
        id: 'training-hero-subtitle',
        type: 'text',
        title: 'Подзаголовок страницы обучения',
        content: 'Пробудите внутренний ресурс и станьте сильным проводником трансформации',
        order: 1
      }
    ]
  },
  {
    pageId: 'transformation',
    pageName: 'Трансформация',
    blocks: [
      {
        id: 'transformation-hero-title',
        type: 'text',
        title: 'Заголовок страницы трансформации',
        content: 'Энергопрактикум "Трансформация"',
        order: 0
      },
      {
        id: 'transformation-hero-subtitle',
        type: 'text',
        title: 'Подзаголовок страницы трансформации',
        content: '8 недель глубокой работы с вашей энергосистемой',
        order: 1
      }
    ]
  },
  {
    pageId: 'masters',
    pageName: 'Мастера',
    blocks: [
      {
        id: 'masters-hero-badge',
        type: 'text',
        title: 'Бейдж страницы мастеров',
        content: 'Наши энерготерапевты',
        order: 0
      },
      {
        id: 'masters-hero-title',
        type: 'text',
        title: 'Заголовок страницы мастеров',
        content: 'Выберите своего энерготерапевта ERA',
        order: 1
      },
      {
        id: 'masters-hero-subtitle',
        type: 'text',
        title: 'Подзаголовок страницы мастеров',
        content: 'Все наши специалисты прошли сертификацию и обладают глубокими знаниями метода энерготерапии ERA',
        order: 2
      },
      {
        id: 'masters-map-title',
        type: 'text',
        title: 'Заголовок карты',
        content: 'География наших специалистов',
        order: 3
      },
      {
        id: 'masters-filter-title',
        type: 'text',
        title: 'Заголовок фильтра',
        content: 'Фильтр по городам:',
        order: 4
      },
      {
        id: 'masters-filter-all',
        type: 'text',
        title: 'Кнопка "Все города"',
        content: 'Все города',
        order: 5
      },
      {
        id: 'masters-cta-title',
        type: 'text',
        title: 'Заголовок CTA секции',
        content: 'Хотите стать энерготерапевтом ERA?',
        order: 6
      },
      {
        id: 'masters-cta-subtitle',
        type: 'text',
        title: 'Подзаголовок CTA секции',
        content: 'Пройдите обучение и присоединитесь к нашему сообществу профессиональных энерготерапевтов',
        order: 7
      },
      {
        id: 'masters-cta-button',
        type: 'button',
        buttonText: 'Узнать подробнее',
        buttonLink: '/training',
        order: 8
      }
    ]
  }
];

export const loadSiteContent = (): PageContent[] => {
  const saved = localStorage.getItem('siteContent');
  return saved ? JSON.parse(saved) : defaultSiteContent;
};

export const saveSiteContent = (content: PageContent[]) => {
  localStorage.setItem('siteContent', JSON.stringify(content));
};
