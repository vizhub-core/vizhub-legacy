import { userData } from './userData';
import { vizId, vizData, vizSnapshots } from './vizData';

export { vizId, vizData };

// This will contain all the data required for the studio page:
//  - Logged in user profile and preferences.
//  - Visualization metadata
//  - Visualization description
//  - Server-computed srcDoc
export const sampleStudioData = {
  vizSnapshots,
  userData,
  authenticatedUserId: '0c82a54f22f775a3ed8b97b2dea74036',
  // vizSrcDoc
  comments: [
    {
      authorUserId: '0c82a54f22f775a3ed8b97b2dea74036',
      date: new Date('Fri Feb 15 2019'),
      content: 'This is the text of the comment'
    },
    {
      authorUserId: 'dashjfdsa8fdsa84hf84389g4839tr43',
      date: new Date(),
      content: 'This is the text of the next comment'
    }
  ]
};
