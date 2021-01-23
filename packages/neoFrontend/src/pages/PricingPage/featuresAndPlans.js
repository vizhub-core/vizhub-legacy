import { showProPlan, showNeoPricing } from '../../featureFlags'

export const FREE = 'free';
export const BASIC = 'basic';
export const PRO = 'pro';

const oldFeatures = [
  {
    title: 'Private Vizzes',
    description: 'Make your vizzes private to you and your collaborators only.',
    plans: { [FREE]: false, [BASIC]: true },
  },
  {
    title: 'Public Vizzes',
    description:
      'Unlimited vizzes publicly accessible for viewing, forking and editing.',
    plans: { [FREE]: true, [BASIC]: true },
  },
  {
    title: 'Export',
    description:
      'Export code for use in downstream workflows (standard ES6 modules).',
    plans: { [FREE]: true, [BASIC]: true },
  },
  {
    title: 'Real-time Collaboration',
    description:
      'Unlimited collaborators who can edit with you in real time. Broadcast your changes live to all viewers.',
    plans: { [FREE]: true, [BASIC]: true },
  },
  {
    title: 'Unfurling',
    description:
      'Share links with rich previews to your public work in social media. Works great in Twitter, Facebook, Slack and more.',
    plans: { [FREE]: true, [BASIC]: true },
  },
];

const neoFeatures = [
  {
    title: 'Vizzes with HTML, CSS & JavaScript',
    plans: { [FREE]: true, [BASIC]: true, [PRO]: true },
  },
  {
    title: 'ES6 Modules',
    plans: { [FREE]: true, [BASIC]: true, [PRO]: true },
  },
  {
    title: 'Export',
    plans: { [FREE]: true, [BASIC]: true, [PRO]: true },
  },
  {
    title: 'Package.json',
    plans: { [FREE]: true, [BASIC]: true, [PRO]: true },
  },
  {
    title: 'React with JSX',
    plans: { [FREE]: true, [BASIC]: true, [PRO]: true },
  },
  {
    title: 'Real-Time Broadcast',
    plans: { [FREE]: true, [BASIC]: true, [PRO]: true },
  },
  {
    title: 'Embedding',
    plans: { [FREE]: true, [BASIC]: true, [PRO]: true },
  },
  {
    title: 'Snippet Embedding',
    plans: { [FREE]: true, [BASIC]: true, [PRO]: true },
  },
  {
    title: 'Real-Time Collaboration 2 editors',
    plans: { [FREE]: true, [BASIC]: true, [PRO]: true },
  },
  {
    title: 'Private Vizzes',
    plans: { [FREE]: false, [BASIC]: true, [PRO]: true },
  },
  {
    title: 'Unlimited Collaborators',
    plans: { [FREE]: false, [BASIC]: false, [PRO]: true },
  },
  {
    title: 'Whitelabel Embedding',
    plans: { [FREE]: false, [BASIC]: false, [PRO]: true },
  },
]

export const features = showNeoPricing ? neoFeatures : oldFeatures;

export const plans = [
  { id: FREE, label: 'Free' },
  {
    id: BASIC,
    label: 'Basic',
    subtext: ['$4 / month'],
  },
  showProPlan &&   {
    id: PRO,
    label: 'Pro',
    subtext: ['$12 / month'],
  },
].filter(Boolean);
