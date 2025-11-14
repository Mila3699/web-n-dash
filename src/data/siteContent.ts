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
    pageName: 'Главная страница',
    blocks: [
      {
        id: 'hero-1',
        type: 'hero',
        title: 'Era Academy',
        content: 'Обучение и трансформация через энергетические практики',
        imageUrl: '/src/assets/hero-bg.jpg',
        order: 1
      },
      {
        id: 'button-1',
        type: 'button',
        buttonText: 'Пройти тест',
        buttonLink: '/test',
        order: 2
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
        order: 3
      }
    ]
  },
  {
    pageId: 'training',
    pageName: 'Обучение',
    blocks: [
      {
        id: 'training-hero',
        type: 'hero',
        title: 'Обучение Мастеров',
        content: 'Станьте сертифицированным мастером энергетических практик',
        order: 1
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
