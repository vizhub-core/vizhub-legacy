export const FREE = 'free';
export const PRO = 'pro';

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
      'Unlimited collaborators who can edit with you in real time. Broadcast your changes live to all viewers.',
    plans: { [FREE]: true, [PRO]: true },
  },
  {
    title: 'Unfurling',
    description:
      'Share links with rich previews to your public work in social media. Works great in Twitter, Facebook, Slack and more.',
    plans: { [FREE]: true, [PRO]: true },
  },
  {
    title: 'Private Vizzes',
    description: 'Make your vizs private to you and your collaborators only.',
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
