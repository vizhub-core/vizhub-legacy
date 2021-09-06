// Disallow all writes for now.
export const vizWrite = (context, next) => {
  next(new Error('Unauthorized'));
};
