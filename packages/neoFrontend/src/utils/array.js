export const range = (possibleFrom, possibleTo) => {
  //force both to be numbers
  let from = +possibleFrom;
  let to = +possibleTo;

  //since we are dealing with numbers, we could do an XOR swap
  //which is a swap that doesn't need a third variable
  //http://en.wikipedia.org/wiki/XOR_swap_algorithm
  if (to < from) {
    from = from ^ to;
    to = from ^ to;
    from = from ^ to;
  }

  return Array.from({ length: to - from + 1 })
    .fill(from)
    .map((n, index) => n + index);
};
