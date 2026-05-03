/**
 * Image URL validation and sanitization utilities
 * Prevents XSS attacks through malicious image URLs
 */

// Whitelist trusted image sources
const TRUSTED_DOMAINS = [
  'cdn-icons-png.flaticon.com',
  'ugc.production.linktr.ee',
  'blogger.googleusercontent.com',
  'vectorseek.com',
  '1.bp.blogspot.com',
  '2.bp.blogspot.com',
  'clipground.com',
  'evolvix.my.id',
  'media-hosting.imagekit.io',
  'imagekit.io',
];

/**
 * Validates if a URL belongs to a trusted domain
 */
export function isValidImageUrl(url: string): boolean {
  if (!url) return false;

  try {
    const parsedUrl = new URL(url);
    return TRUSTED_DOMAINS.some((domain) => parsedUrl.hostname?.includes(domain));
  } catch {
    return false;
  }
}

/**
 * Sanitizes an image URL, returning null if untrusted
 */
export function sanitizeImageUrl(url: string): string | null {
  if (!isValidImageUrl(url)) {
    console.warn(`Untrusted image URL blocked: ${url}`);
    return null;
  }
  return url;
}

/**
 * Get a fallback placeholder SVG for failed images
 */
export function getPlaceholderSvg(text: string = 'Not Found'): string {
  return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23333" width="100" height="100"/%3E%3Ctext fill="%23fff" x="50" y="50" text-anchor="middle" dy=".3em" font-size="12" font-family="sans-serif"%3E${encodeURIComponent(text)}%3C/text%3E%3C/svg%3E`;
}
