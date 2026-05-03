import React from 'react';

/**
 * Centralized TypeScript type definitions
 * Ensures type safety across components
 */

// Navigation
export interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  mobile?: boolean;
}

// Programs
export interface Program {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  stats: string;
  color: string;
}

export interface ProgramCardProps {
  program: Program;
}

// Sponsors
export type SponsorTier = 'Platinum' | 'Gold' | 'Silver' | 'Bronze';

export interface Sponsor {
  id: number;
  name: string;
  logo: string;
  tier: SponsorTier;
}

export interface SponsorCardProps {
  sponsor: Sponsor;
}

// UI Components
export interface SocialIconProps {
  icon: React.ReactNode;
  label?: string;
}

export interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: string;
}

export interface TierBadgeProps {
  tier: SponsorTier;
}

export interface StatisticCardProps {
  title: string;
  value: string;
  change: string;
  positive?: boolean;
}

// API/Form related
export interface NewsletterSubscription {
  email: string;
}

export interface DonationRequest {
  amount: number;
}

export type SubscriptionStatus = 'idle' | 'loading' | 'success' | 'error';
