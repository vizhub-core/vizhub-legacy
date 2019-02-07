export const preventDefault = fn => event => {
  event.preventDefault();
  fn();
};
