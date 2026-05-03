/**
 * Centralized animation constants to avoid magic numbers
 * Update here to change animation timings globally
 */

export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 1000,
  slowest: 3000,
} as const;

export const SCROLL_TRIGGERS = {
  headerScroll: 10,
  fadeOutDistance: 700,
  parallaxMultiplier: 0.5,
} as const;

export const ANIMATION_DELAYS = {
  none: 0,
  short: 0.5,
  medium: 1,
  long: 1.5,
  veryLong: 3,
} as const;
