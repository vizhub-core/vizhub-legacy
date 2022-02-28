import ShareDB from 'sharedb';
import json1 from 'ot-json1';
import { Gateways } from '../src/Gateways';
import { MemoryGateways } from '../src/MemoryGateways';
import { DatabaseGateways } from '../src/DatabaseGateways';
import { shareDBConnection } from './shareDBConnection';

ShareDB.types.register(json1.type);

//
//   `testDB`
//
// If true, DatabaseGateways is used in tests (run before deploying).
// If false, MemoryGateways is used in tests (faster, run during dev).
// With `npm test`, this is false.
// With `npm run test-db`, this is true.
const testDB = process.env.VIZHUB_TEST_DATABASE === 'true';

// Create a Gateways instance that is empty.
export const initGateways = (): Gateways =>
  testDB ? DatabaseGateways(new ShareDB().connect()) : MemoryGateways();
