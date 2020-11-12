export const xorSwap = ([a, b]) => {
  //force both to be numbers
  let from = +a;
  let to = +b;

  //since we are dealing with numbers, we could do an XOR swap
  //which is a swap that doesn't need a third variable
  //http://en.wikipedia.org/wiki/XOR_swap_algorithm
  if (to < from) {
    from = from ^ to;
    to = from ^ to;
    from = from ^ to;
  }

  return [from, to];
};

export const range = (possibleFrom, possibleTo) => {
  let [from, to] = xorSwap([possibleFrom, possibleTo]);

  return Array.from({ length: to - from + 1 })
    .fill(from)
    .map((n, index) => n + index);
};
