/**
 * Утилиты для защиты от XSS-атак
 */

/**
 * Экранирует HTML-символы для предотвращения XSS
 */
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Валидирует и санитизирует URL
 * Разрешены только http, https, mailto и tel протоколы
 */
export function sanitizeUrl(url: string): string {
  const allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:'];
  
  try {
    const urlObj = new URL(url);
    
    if (!allowedProtocols.includes(urlObj.protocol)) {
      console.warn('Blocked potentially dangerous URL protocol:', urlObj.protocol);
      return '#';
    }
    
    return url;
  } catch {
    // Если URL невалидный, возвращаем безопасный fallback
    console.warn('Invalid URL detected:', url);
    return '#';
  }
}

/**
 * Безопасное открытие внешней ссылки
 * Защита от tabnabbing (window.opener exploit)
 */
export function safeOpenLink(url: string, target: string = '_blank'): void {
  const sanitizedUrl = sanitizeUrl(url);
  
  if (sanitizedUrl === '#') {
    console.error('Attempted to open invalid URL');
    return;
  }
  
  const newWindow = window.open(sanitizedUrl, target, 'noopener,noreferrer');
  
  // Дополнительная защита для старых браузеров
  if (newWindow) {
    newWindow.opener = null;
  }
}

/**
 * Валидация данных из localStorage
 * Предотвращает загрузку вредоносных данных
 */
export function safeParseJSON<T>(jsonString: string, fallback: T): T {
  try {
    const parsed = JSON.parse(jsonString);
    
    // Базовая проверка типа
    if (parsed === null || typeof parsed !== 'object') {
      return fallback;
    }
    
    return parsed as T;
  } catch (error) {
    console.warn('Failed to parse JSON safely:', error);
    return fallback;
  }
}

/**
 * Валидация строки (удаление потенциально опасных символов)
 */
export function sanitizeString(input: string, maxLength: number = 1000): string {
  // Удаляем все управляющие символы кроме переводов строк и табуляции
  const cleaned = input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  
  // Ограничиваем длину
  return cleaned.slice(0, maxLength).trim();
}

/**
 * Валидация email адреса
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

/**
 * Валидация телефона
 */
export function isValidPhone(phone: string): boolean {
  // Разрешаем цифры, пробелы, дефисы, скобки и знак +
  const phoneRegex = /^[\d\s\-\(\)\+]{7,20}$/;
  return phoneRegex.test(phone);
}

/**
 * Создает безопасный Telegram URL
 */
export function createTelegramUrl(username: string): string {
  // Удаляем все кроме букв, цифр и подчеркиваний
  const cleanUsername = username.replace(/[^a-zA-Z0-9_]/g, '');
  
  if (!cleanUsername) {
    return '#';
  }
  
  return `https://t.me/${cleanUsername}`;
}

/**
 * Создает безопасный WhatsApp URL
 */
export function createWhatsAppUrl(phone: string, message?: string): string {
  // Удаляем все кроме цифр
  const cleanPhone = phone.replace(/\D/g, '');
  
  if (!cleanPhone) {
    return '#';
  }
  
  let url = `https://wa.me/${cleanPhone}`;
  
  if (message) {
    const sanitizedMessage = encodeURIComponent(sanitizeString(message, 500));
    url += `?text=${sanitizedMessage}`;
  }
  
  return url;
}

/**
 * Content Security Policy заголовки (для информации)
 */
export const CSP_HEADERS = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
  'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
  'font-src': ["'self'", 'https://fonts.gstatic.com'],
  'img-src': ["'self'", 'data:', 'https:'],
  'connect-src': ["'self'", 'https://t.me', 'https://wa.me'],
};
