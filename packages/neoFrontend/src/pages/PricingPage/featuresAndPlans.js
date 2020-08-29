export const FREE = 'free';
export const BASIC = 'basic';

export const features = [
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

export const plans = [
  { id: FREE, label: 'Free' },
  {
    id: BASIC,
    label: 'Basic',
    subtext: ['$4 / month'],
  },
];
