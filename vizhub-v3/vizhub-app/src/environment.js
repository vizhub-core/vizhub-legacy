// True if the app is running in the client.
// False if the app is running in the server (server side rendering).
export const isClient = typeof window !== 'undefined';

// True if the build is for production (with SSL and WSS enabled).
// False if the build is for local development.
export const isProd = false;
