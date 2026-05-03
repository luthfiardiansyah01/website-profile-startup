import { useEffect, useState } from 'react';

/**
 * Hook to retrieve CSRF token from meta tag or cookie
 * Used for protecting forms against CSRF attacks
 */
export function useCsrfToken(): string | null {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Try to get token from meta tag first
    const metaToken = document
      .querySelector('meta[name="csrf-token"]')
      ?.getAttribute('content');

    if (metaToken) {
      setToken(metaToken);
      return;
    }

    // Fallback: get from cookie
    const cookies = document.cookie.split(';');
    const csrfCookie = cookies.find((c) => c.trim().startsWith('csrf-token='));
    if (csrfCookie) {
      const cookieToken = csrfCookie.split('=')[1];
      setToken(cookieToken);
    }
  }, []);

  return token;
}
