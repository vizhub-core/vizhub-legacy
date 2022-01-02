// True if the app is running in the client.
// False if the app is running in the server (server side rendering).
export const isClient = typeof window !== 'undefined';
