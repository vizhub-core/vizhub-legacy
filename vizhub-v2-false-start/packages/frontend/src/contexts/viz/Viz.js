export class Document {
  // Returns an object containing the "vizData", documented in vizhub-core.
  // The object should updated according to immutable update patterns.
  getData() {
    throw Error();
  }

  // Submit a json0 OT OP (operation).
  submitOp(op) {
    throw Error();
  }

  // Callback is invoked with new data when data changes.
  // Returns an unsubscribe function.
  subscribe(callback) {
    throw Error();
  }
}
