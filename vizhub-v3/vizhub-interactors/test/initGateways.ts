import { Gateways } from '../src/Gateways';
import { MemoryGateways } from '../src/MemoryGateways';

// TODO create DatabaseGateways if testDB.
// If true, DatabaseGateways is used in tests (run before deploying).
// If false, MemoryGateways is used in tests (faster, run during dev).
// With `npm test`, this is false.
// With `npm run testDB`, this is true.
// const testDB = process.env.VIZHUB_TEST_DATABASE === 'true';

// Create a Gateways instance that is empty.
export const initGateways = (): Gateways => MemoryGateways();
