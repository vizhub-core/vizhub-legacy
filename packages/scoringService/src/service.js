import { serverGateways } from 'vizhub-server-gateways';
import { UpdateScores } from 'vizhub-use-cases';

const noop = () => {};

// The amount of time between recomputation of scores.
const seconds = 1000;
const minutes = 60 * seconds;
const hours = 60 * minutes;
const downTime = 1 * hours;

export const startService = async () => {
  const gateways = await serverGateways();

  const updateScores = new UpdateScores(gateways);

  console.log('Scoring service starting...');

  let loop = () => {
    console.log('Scoring all vizzes...');
    Promise.all([
      updateScores.execute(),
      new Promise(resolve => setTimeout(resolve, downTime))
    ]).then(loop);
  }
  loop();

  return {
    stopService: () => {
      loop = noop;
    }
  };
};
