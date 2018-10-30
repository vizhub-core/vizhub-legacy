import { startService } from './service';
import { defaultWaitTime } from './generateImages';

// Sleep for 2 seconds between updates.
const downtime = 2 * 1000;

// Generate images for one visualization at a time,
// with downtime in between.
const updateInterval = defaultWaitTime + downtime;

startService({ updateInterval });
