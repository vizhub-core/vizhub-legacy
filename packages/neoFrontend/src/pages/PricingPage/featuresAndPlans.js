export const FREE = 'free';
const PRO = 'pro';

export const features = [
  {
    title: 'Public Visualizations',
    description:
      'Visualizations publicly accessible for viewing, forking and editing (all public content is MIT Licensed).',
    plans: { [FREE]: true, [PRO]: true },
  },
  {
    title: 'Export Code',
    description:
      'Export code for use in downstream workflows (standard ES6 modules).',
    plans: { [FREE]: true, [PRO]: true },
  },
  {
    title: 'Real-time Collaboration',
    description:
      'Manage collaborators who can edit with you in real time. Broadcast your changes live to all viewers.',
    plans: { [FREE]: true, [PRO]: true },
  },
  {
    title: 'Unfurling',
    description:
      'Share links with rich previews to your public work in social media (works great in Twitter, Facebook, Slack).',
    plans: { [FREE]: true, [PRO]: true },
  },
  {
    title: 'Private Visualizations',
    description:
      'Make your visualizations private to you and your collaborators only, with no licensing restrictions.',
    plans: { [FREE]: false, [PRO]: true },
  },
];

export const plans = [
  { id: FREE, label: 'Free' },
  {
    id: PRO,
    label: 'Pro',
    subtext: ['$10 / month', '30 day free trial'],
  },
];
