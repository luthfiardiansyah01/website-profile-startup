/**
 * Centralized color constants to follow DRY principle
 * Update here to change colors globally
 */

export const COLORS = {
  primary: {
    cyan: '#00f0ff',
    pink: '#ff00c8',
    purple: '#9c27b0',
  },
  background: {
    dark: '#0a0a1f',
    darker: '#12122a',
  },
  text: {
    white: '#ffffff',
    muted: 'rgba(255, 255, 255, 0.7)',
    dimmed: 'rgba(255, 255, 255, 0.5)',
  },
  gradients: {
    cyan_to_pink: 'from-[#00f0ff] to-[#ff00c8]',
    pink_to_purple: 'from-[#ff00c8] to-[#9c27b0]',
    purple_to_indigo: 'from-[#9c27b0] to-[#6d28d9]',
    cyan_to_blue: 'from-[#00f0ff] to-[#3b82f6]',
  },
} as const;
