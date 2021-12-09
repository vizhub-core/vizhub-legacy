// Returns the Unix timestamp for the present.
export const timestamp = () => Math.floor(new Date().getTime() / 1000);
export const toDate = (timestamp) => new Date(timestamp * 1000);
