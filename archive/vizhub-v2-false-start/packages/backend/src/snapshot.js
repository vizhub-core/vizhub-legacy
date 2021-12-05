// Generates a "snapshot" that the client can ingest
// using the ShareDB Doc ingestSnapshot method.
export const snapshot = ({ version, data }) => ({
  v: version,
  data
});
