import { StateField } from '@codemirror/state';
import { ViewPlugin } from '@codemirror/view';

const changesToOp = (changes) => {
  const op = [];

  // See https://codemirror.net/6/docs/ref/#state.ChangeSet.iterChanges
  // fromA: number,
  // toA: number,
  // fromB: number,
  // toB: number,
  // inserted: Text

  changes.iterChanges((fromA, toA, fromB, toB, inserted) => {
    console.log(fromA, toA, fromB, toB, inserted);
  });

  return op;
};

// Inspired by https://github.com/codemirror/collab/blob/cffa435ca5a7a0b3f46f59afdb45db4c9765b54e/src/collab.ts#L60
// Inspired by https://codemirror.net/6/examples/collab/
export const json1Sync = ({ shareDBDoc, path = [] }) =>
  ViewPlugin.fromClass(
    class {
      constructor(view) {
        this.view = view;
      }

      update(update) {
        if (update.docChanged) {
          //let op = [];
          //for (const transaction of update.transactions) {
          //  op = [...op, ...changesToOp(transaction.changes)];
          //}
          shareDBDoc.submitOp(
            update.transactions.reduce(
              (accumulator, transaction) => [
                ...accumulator,
                ...changesToOp(transaction.changes),
              ],
              []
            )
          );
        }
      }

      destroy() {
        this.done = true;
      }
    }
  );
