export const accessControlServerPlugin = () => ({
  extendServer: (expressApp, shareDBConnection, pages) => {
    console.log('here');
  }
})
