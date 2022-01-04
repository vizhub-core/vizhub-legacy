import { Viz, Timestamp } from 'vizhub-entities';

export const ts1: Timestamp = 1638100000;

// The first ever viz.
// Special because it's the only one not forked from another.
export const primordialViz: Viz = {
  id: 'viz1',
  vizInfo: {
    id: 'viz1',
    owner: 'user1',
    title: 'Primordial Viz',
    createdTimestamp: ts1,
    lastUpdatedTimestamp: ts1,
  },
  vizContent: {
    id: 'viz1',
    files: { '7548392': { name: 'index.html', text: '<body>Hello</body>' } },
  },
};
