/**
 * Simply Talk - Master Placeholders File
 * All owner-supplied placeholders are defined once here.
 * In development/preview, unresolved placeholders are marked clearly
 * so the owner can easily spot and replace them.
 */

export interface PlaceholdersConfig {
  COMPANY_NAME: string;
  REGISTERED_ADDRESS: string;
  PHONE: string;
  EMAIL: string;
  TEAM_EMAIL: string;
  WHATSAPP_DEMO_NUMBER: string;
  APP_URL: string;
  RATING: string | null;
  REVIEW_QUOTE: {
    quote: string;
    author: string;
    business: string;
    sourceUrl?: string;
  } | null;
  PRICING: {
    BASIC_MONTHLY: string;
    TEAM_MONTHLY: string;
    ENTERPRISE_MONTHLY: string;
  };
  PARTNER_COMMISSION_RATE: string;
  YEARLY_PRICING_ENABLED: boolean;
}

export const PLACEHOLDERS: PlaceholdersConfig = {
  COMPANY_NAME: 'SimplyTalk',
  REGISTERED_ADDRESS: '[123 Business Street, Suite 400, City, Country]',
  PHONE: '[+1 (555) 019-2834]',
  EMAIL: '[hello@simplytalk.ai]',
  TEAM_EMAIL: '[team@simplytalk.ai]',
  WHATSAPP_DEMO_NUMBER: '15550192834', // For https://wa.me/
  APP_URL: '#/login', // Link to dashboard / app
  // Per Section 4.1 & 4.2: Show only as visible placeholder or hide in production unless filled
  RATING: null, // e.g. "4.9/5 by early users"
  REVIEW_QUOTE: null, // e.g. { quote: "...", author: "...", business: "..." }
  PRICING: {
    BASIC_MONTHLY: '[$ TO CONFIRM]',
    TEAM_MONTHLY: '[$ TO CONFIRM]',
    ENTERPRISE_MONTHLY: '[$ TO CONFIRM]',
  },
  PARTNER_COMMISSION_RATE: '[COMMISSION % TO CONFIRM]',
  YEARLY_PRICING_ENABLED: false, // Per Section 5.4: toggle hidden behind config flag
};

/** Helper to test if a string value is an unresolved placeholder */
export function isPlaceholder(val: string | null | undefined): boolean {
  if (!val) return false;
  return val.trim().startsWith('[') && val.trim().endsWith(']');
}
