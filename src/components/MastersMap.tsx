import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MastersMapProps {
  cities: string[];
  selectedCity: string | null;
  onCityClick: (city: string) => void;
  customMapImage?: string; // Опциональное изображение карты
}

// Координаты городов России
const cityCoordinates: Record<string, [number, number]> = {
  'Москва': [37.6173, 55.7558],
  'Санкт-Петербург': [30.3141, 59.9311],
  'Сочи': [39.7303, 43.5855],
  'Онлайн': [37.6173, 55.7558], // Используем координаты Москвы для "Онлайн"
  'Весь Мир': [37.6173, 55.7558], // Используем координаты Москвы для "Весь Мир"
};

export const MastersMap = ({ cities, selectedCity, onCityClick, customMapImage }: MastersMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  // Если есть пользовательское изображение карты, показываем его
  if (customMapImage) {
    return (
      <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-soft border border-border">
        <img 
          src={customMapImage} 
          alt="Карта мастеров" 
          className="w-full h-full object-contain bg-muted"
        />
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-brand-green">
            {cities.filter(c => c !== 'Онлайн' && c !== 'Весь Мир').length} городов
          </p>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (!mapContainer.current) return;

    // Инициализация карты
    mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZS1kZW1vIiwiYSI6ImNtNGsyZ3NrcTBlMWoya3NjOXA4dHFnaDUifQ.yMhqAhr08HbeXSgen_vFyg';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [50, 60], // Центр России
      zoom: 3,
    });

    // Добавление контролов навигации
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Cleanup
    return () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      map.current?.remove();
    };
  }, []);

  // Обновление маркеров при изменении городов
  useEffect(() => {
    if (!map.current) return;

    // Удаляем старые маркеры
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Фильтруем уникальные города (исключаем "Онлайн" и "Весь Мир")
    const uniqueCities = [...new Set(cities)].filter(
      city => city !== 'Онлайн' && city !== 'Весь Мир'
    );

    // Добавляем новые маркеры
    uniqueCities.forEach(city => {
      const coordinates = cityCoordinates[city];
      if (!coordinates) return;

      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.style.width = '30px';
      el.style.height = '30px';
      el.style.borderRadius = '50%';
      el.style.cursor = 'pointer';
      el.style.transition = 'all 0.3s ease';
      
      if (selectedCity === city) {
        el.style.backgroundColor = 'hsl(42, 26%, 55%)'; // accent color
        el.style.border = '3px solid hsl(25, 35%, 20%)';
        el.style.transform = 'scale(1.2)';
      } else {
        el.style.backgroundColor = 'hsl(25, 35%, 20%)'; // primary color
        el.style.border = '2px solid hsl(42, 26%, 55%)';
      }

      el.addEventListener('click', () => {
        onCityClick(city);
      });

      const marker = new mapboxgl.Marker(el)
        .setLngLat(coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<div style="padding: 8px; font-weight: 600;">${city}</div>`)
        )
        .addTo(map.current!);

      markersRef.current.push(marker);
    });

    // Подстраиваем карту под маркеры
    if (uniqueCities.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      uniqueCities.forEach(city => {
        const coordinates = cityCoordinates[city];
        if (coordinates) {
          bounds.extend(coordinates);
        }
      });
      map.current.fitBounds(bounds, { padding: 50, maxZoom: 10 });
    }
  }, [cities, selectedCity, onCityClick]);

  return (
    <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-soft border border-border">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};
