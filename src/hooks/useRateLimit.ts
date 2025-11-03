import { useState, useCallback } from 'react';
import { rateLimiter, rateLimitPresets } from '@/lib/rateLimit';
import { useToast } from '@/hooks/use-toast';

type PresetKey = keyof typeof rateLimitPresets;

interface UseRateLimitOptions {
  key: string;
  preset?: PresetKey;
  maxRequests?: number;
  windowMs?: number;
  blockDurationMs?: number;
  onBlock?: (retryAfter: number) => void;
  showToast?: boolean;
}

/**
 * Hook для управления rate limiting в компонентах
 */
export function useRateLimit(options: UseRateLimitOptions) {
  const { toast } = useToast();
  const [isBlocked, setIsBlocked] = useState(false);
  const [retryAfter, setRetryAfter] = useState<number | null>(null);

  const checkLimit = useCallback(() => {
    const config = options.preset
      ? rateLimitPresets[options.preset]
      : {
          maxRequests: options.maxRequests || 10,
          windowMs: options.windowMs || 60000,
          blockDurationMs: options.blockDurationMs,
        };

    const result = rateLimiter.checkLimit(options.key, config);

    if (!result.allowed) {
      setIsBlocked(true);
      setRetryAfter(result.retryAfter || null);

      if (options.showToast !== false) {
        toast({
          title: 'Превышен лимит запросов',
          description: result.message || 'Пожалуйста, подождите перед следующей попыткой.',
          variant: 'destructive',
        });
      }

      if (options.onBlock && result.retryAfter) {
        options.onBlock(result.retryAfter);
      }

      // Автоматически снимаем блокировку после истечения времени
      if (result.retryAfter) {
        setTimeout(() => {
          setIsBlocked(false);
          setRetryAfter(null);
        }, result.retryAfter * 1000);
      }

      return false;
    }

    setIsBlocked(false);
    setRetryAfter(null);
    return true;
  }, [options, toast]);

  const reset = useCallback(() => {
    rateLimiter.reset(options.key);
    setIsBlocked(false);
    setRetryAfter(null);
  }, [options.key]);

  return {
    checkLimit,
    isBlocked,
    retryAfter,
    reset,
  };
}
