import React from "react";

interface SafeHtmlTextProps {
  content: string;
  className?: string;
}

/**
 * Безопасный компонент для отображения текста с базовым форматированием
 * Поддерживает только <strong> теги для выделения жирным
 * Все содержимое автоматически экранируется React
 */
export const SafeHtmlText = ({ content, className }: SafeHtmlTextProps) => {
  // Разделяем текст по тегам <strong>
  const parts = content.split(/(<strong>.*?<\/strong>)/g);
  
  return (
    <p className={className}>
      {parts.map((part, index) => {
        // Если это тег strong
        if (part.startsWith('<strong>') && part.endsWith('</strong>')) {
          const text = part.replace(/<\/?strong>/g, '');
          // React автоматически экранирует текст внутри тегов
          return <strong key={index}>{text}</strong>;
        }
        // Обычный текст - React автоматически экранирует
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </p>
  );
};
