import { COUNTRIES } from './siteContent.js'

export const VISA_PRICING_PER_COUNTRY = 45

export const VISA_PURPOSE_OPTIONS = [
  'Tourism',
  'Business',
  'Family visit',
  'Relocation',
  'Transit',
  'Study',
  'Conference / Event',
  'Other',
]

export const ENTRY_METHOD_OPTIONS = ['Air', 'Land', 'Sea']

export const PASSPORT_TYPE_OPTIONS = [
  { value: 'ordinary', label: 'Ordinary (Tourist)' },
  { value: 'diplomatic', label: 'Diplomatic' },
  { value: 'official', label: 'Official' },
  { value: 'other', label: 'Other' },
]

export const TRAVELING_WITH_OPTIONS = [
  { value: 'alone', label: 'Alone' },
  { value: 'adults', label: 'With another adult(s)' },
  { value: 'children', label: 'With children or minors' },
]

export const DATES_FLEXIBILITY_OPTIONS = [
  { value: 'fixed', label: 'Fixed' },
  { value: 'flexible', label: 'Flexible' },
]

export const PHONE_DIAL_CODES = [
  { code: '+1', country: 'US / CA', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+233', country: 'Ghana', flag: '🇬🇭' },
  { code: '+255', country: 'Tanzania', flag: '🇹🇿' },
  { code: '+265', country: 'Malawi', flag: '🇲🇼' },
  { code: '+260', country: 'Zambia', flag: '🇿🇲' },
  { code: '+256', country: 'Uganda', flag: '🇺🇬' },
  { code: '+250', country: 'Rwanda', flag: '🇷🇼' },
  { code: '+221', country: 'Senegal', flag: '🇸🇳' },
  { code: '+229', country: 'Benin', flag: '🇧🇯' },
  { code: '+220', country: 'The Gambia', flag: '🇬🇲' },
  { code: '+27', country: 'South Africa', flag: '🇿🇦' },
  { code: '+234', country: 'Nigeria', flag: '🇳🇬' },
  { code: '+254', country: 'Kenya', flag: '🇰🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
  { code: '+39', country: 'Italy', flag: '🇮🇹' },
  { code: '+34', country: 'Spain', flag: '🇪🇸' },
  { code: '+41', country: 'Switzerland', flag: '🇨🇭' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+64', country: 'New Zealand', flag: '🇳🇿' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
]

export const COMMON_NATIONALITIES = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Ghana',
  'Tanzania',
  'Malawi',
  'Zambia',
  'Uganda',
  'Rwanda',
  'Senegal',
  'Benin',
  'The Gambia',
  'Nigeria',
  'Kenya',
  'South Africa',
  'Netherlands',
  'Belgium',
  'Switzerland',
  'Sweden',
  'Norway',
  'Denmark',
  'Ireland',
  'Italy',
  'Spain',
  'Portugal',
  'Austria',
  'China',
  'India',
  'Japan',
  'South Korea',
  'Brazil',
  'Mexico',
  'New Zealand',
  'Singapore',
  'United Arab Emirates',
  'Other',
]

export const COMMON_COUNTRIES = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Ghana',
  'Tanzania',
  'Malawi',
  'Zambia',
  'Uganda',
  'Rwanda',
  'Senegal',
  'Benin',
  'The Gambia',
  'Nigeria',
  'Kenya',
  'South Africa',
  'Netherlands',
  'Belgium',
  'Switzerland',
  'Sweden',
  'Norway',
  'Denmark',
  'Ireland',
  'Italy',
  'Spain',
  'Portugal',
  'Austria',
  'China',
  'India',
  'Japan',
  'South Korea',
  'Brazil',
  'Mexico',
  'New Zealand',
  'Singapore',
  'United Arab Emirates',
  'Other',
]

export const MULTI_COUNTRY_STEP_LABELS = [
  'Select Countries',
  'Multi-Country Overview',
  'Start Your Request',
  'Review Your Answers',
  'Secure Payment',
]

export const SINGLE_COUNTRY_STEP_LABELS = [
  'Start Your Request',
  'Review Your Answers',
  'Secure Payment',
  'Request Received',
]
