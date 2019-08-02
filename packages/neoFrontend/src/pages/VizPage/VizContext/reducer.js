export const reducer = (viz, action) => {
  switch (action.type) {
    case 'contentChange':
      return action.content !== viz.content
        ? { info: viz.info, content: action.content }
        : viz;
    default:
      throw new Error();
  }
};
