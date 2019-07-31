export const createReducer = options => (state, action) => {
  const { realtimeModules, submitContentOp } = options;
  const { diffMatchPatch, jsondiff, produce, json0 } = realtimeModules || {};

  console.log(action);

  switch (action.type) {
    case 'fileChange':
      let oldText;
      let fileIndex;

      const files = state.viz.content.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.name === action.name) {
          oldText = file.text;
          fileIndex = i;
          break;
        }
      }

      // TODO throttle this execution?
      const contentOp = jsondiff(oldText, action.text, diffMatchPatch).map(
        opComponent => ({
          ...opComponent,
          p: ['files', fileIndex, 'text'].concat(opComponent.p)
        })
      );
      submitContentOp(contentOp);

      return {
        viz: produce(state.viz, draftViz => {
          json0.type.apply(draftViz.content, contentOp);
        })
      };
    default:
      throw new Error();
  }
};
