export const reducer = realtimeModulesRef => (state, action) => {
  const { diffMatchPatch, jsondiff, produce, json0 } =
    realtimeModulesRef.current || {};
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

      return {
        viz: produce(state.viz, draftViz => {
          json0.type.apply(draftViz.content, contentOp);
        }),
        contentOp
        //infoOp
      };
    default:
      throw new Error();
  }
};
