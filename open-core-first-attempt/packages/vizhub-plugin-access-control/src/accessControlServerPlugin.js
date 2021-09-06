import { accessControl } from './accessControl';

export const accessControlServerPlugin = () => ({
  extendServer: accessControl,
});
