import { setupRealtimeViz } from './setupRealtimeViz';
import { saveAndRestoreChanges } from './saveAndRestoreChanges';

export const realtime = my => () => {
  before(setupRealtimeViz(my));
  it('should save and restore changes', saveAndRestoreChanges(my));
};
