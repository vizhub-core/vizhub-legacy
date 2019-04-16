import { StateField } from '@datavis-tech/codemirror-6-prerelease';

// This is a CodeMirror 6 extension for presence cursors. For context, see
// https://github.com/datavis-tech/json0-presence-demo
export const presence = (path, userId, submitPresence, applyingRemoteOp) =>
  new StateField({
    init: () => ({}),
    apply: (transaction, state) => {
      if (!applyingRemoteOp()) {
        const { to, from } = transaction.selection.primary;
        submitPresence({
          p: path,
          t: 'text0',
          s: { u: userId, c: 0, s: [[to, from]] }
        });
      }
      return state;
    },
    debugName: 'presence'
  }).extension;
