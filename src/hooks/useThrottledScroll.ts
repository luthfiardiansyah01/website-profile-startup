import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for throttled scroll events with passive flag optimization
 * Prevents jank and improves performance on scroll-heavy pages
 *
 * @param callback - Function to execute on scroll
 * @param delay - Throttle delay in milliseconds (default: 16ms for ~60fps)
 */
export function useThrottledScroll(
  callback: () => void,
  delay: number = 16
): void {
  const lastCallRef = useRef(0);
  const timeoutRef = useRef<number>();

  const handleScroll = useCallback(() => {
    const now = Date.now();
    const elapsed = now - lastCallRef.current;

    if (elapsed >= delay) {
      lastCallRef.current = now;
      callback();
    } else {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        lastCallRef.current = Date.now();
        callback();
      }, delay - elapsed);
    }
  }, [callback, delay]);

  useEffect(() => {
    // Use passive: true to prevent event blocking
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [handleScroll]);
}
