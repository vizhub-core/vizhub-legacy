import { StateField } from '@datavis-tech/codemirror-6-prerelease';

// This is a CodeMirror 6 extension for presence cursors. For context, see
// https://github.com/datavis-tech/json0-presence-demo
export const presence = (path, userId, submitPresence, applyingRemoteOp) =>
  new StateField({
    init: () => ({}),
    apply: (transaction, state) => {
      if (!applyingRemoteOp()) {
        submitPresence({
          p: path,
          t: 'text0',
          s: {
            u: userId,
            c: 0, // TODO increment this (if/when use case emerges)
            s: transaction.selection.ranges.map(range => [
              range.anchor,
              range.head
            ])
          }
        });
      }
      return state;
    },
    debugName: 'presence'
  }).extension;
