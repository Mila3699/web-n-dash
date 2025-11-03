/**
 * Rate Limiter - защита от спама и DDoS атак на клиентской стороне
 */

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  blockDurationMs?: number;
}

interface RateLimitEntry {
  count: number;
  firstRequest: number;
  blocked?: number;
}

class RateLimiter {
  private storage: Map<string, RateLimitEntry> = new Map();
  private readonly STORAGE_KEY = 'era_rate_limit';

  constructor() {
    // Загружаем данные из localStorage при инициализации
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        this.storage = new Map(Object.entries(data));
      }
    } catch (error) {
      console.error('Failed to load rate limit data:', error);
    }
  }

  private saveToStorage() {
    try {
      const data = Object.fromEntries(this.storage.entries());
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save rate limit data:', error);
    }
  }

  /**
   * Проверяет, разрешен ли запрос для данного ключа
   * @param key - уникальный идентификатор (например, 'contact_form', 'telegram_link')
   * @param config - конфигурация лимитов
   * @returns объект с информацией о доступности запроса
   */
  checkLimit(
    key: string,
    config: RateLimitConfig
  ): { allowed: boolean; retryAfter?: number; message?: string } {
    const now = Date.now();
    const entry = this.storage.get(key);

    // Проверяем, заблокирован ли пользователь
    if (entry?.blocked && entry.blocked > now) {
      const retryAfter = Math.ceil((entry.blocked - now) / 1000);
      return {
        allowed: false,
        retryAfter,
        message: `Слишком много запросов. Попробуйте через ${retryAfter} секунд.`,
      };
    }

    // Если нет записи или окно истекло, создаем новую
    if (!entry || now - entry.firstRequest > config.windowMs) {
      this.storage.set(key, {
        count: 1,
        firstRequest: now,
      });
      this.saveToStorage();
      return { allowed: true };
    }

    // Проверяем лимит
    if (entry.count >= config.maxRequests) {
      const blockDuration = config.blockDurationMs || config.windowMs * 2;
      entry.blocked = now + blockDuration;
      this.saveToStorage();

      const retryAfter = Math.ceil(blockDuration / 1000);
      return {
        allowed: false,
        retryAfter,
        message: `Превышен лимит запросов. Попробуйте через ${retryAfter} секунд.`,
      };
    }

    // Увеличиваем счетчик
    entry.count++;
    this.storage.set(key, entry);
    this.saveToStorage();

    return { allowed: true };
  }

  /**
   * Сбрасывает лимит для конкретного ключа
   */
  reset(key: string) {
    this.storage.delete(key);
    this.saveToStorage();
  }

  /**
   * Очищает все данные о лимитах
   */
  clearAll() {
    this.storage.clear();
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

// Singleton instance
export const rateLimiter = new RateLimiter();

/**
 * Debounce функция - откладывает выполнение до прекращения вызовов
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  waitMs: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return function (this: any, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(this, args);
      timeoutId = null;
    }, waitMs);
  };
}

/**
 * Throttle функция - ограничивает частоту выполнения
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limitMs: number
): (...args: Parameters<T>) => void {
  let lastRun = 0;
  let timeoutId: NodeJS.Timeout | null = null;

  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now();

    if (now - lastRun >= limitMs) {
      func.apply(this, args);
      lastRun = now;
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastRun = Date.now();
        timeoutId = null;
      }, limitMs - (now - lastRun));
    }
  };
}

/**
 * Предустановленные конфигурации для разных типов действий
 */
export const rateLimitPresets = {
  // Для форм обратной связи
  contactForm: {
    maxRequests: 3,
    windowMs: 60000, // 1 минута
    blockDurationMs: 300000, // 5 минут блокировки
  },
  // Для переходов по внешним ссылкам
  externalLink: {
    maxRequests: 10,
    windowMs: 60000, // 1 минута
    blockDurationMs: 60000, // 1 минута блокировки
  },
  // Для API запросов
  apiRequest: {
    maxRequests: 20,
    windowMs: 60000, // 1 минута
    blockDurationMs: 120000, // 2 минуты блокировки
  },
  // Для кнопок записи
  bookingButton: {
    maxRequests: 5,
    windowMs: 60000, // 1 минута
    blockDurationMs: 180000, // 3 минуты блокировки
  },
};
