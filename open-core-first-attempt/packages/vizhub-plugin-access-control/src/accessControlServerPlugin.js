import { accessControl } from './accessControl';

export const accessControlServerPlugin = () => ({
  extendServer: ({ shareDBBackend }) => {
    accessControl(shareDBBackend);
  },
});
