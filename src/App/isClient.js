// True if the app is running in the client.
// False if the app is running in the server (server side rendering).
export let isClient = false;

export const setIsClient = () => {
  isClient = true;
};
