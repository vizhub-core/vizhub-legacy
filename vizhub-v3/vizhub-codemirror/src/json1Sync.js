import { StateField } from '@codemirror/state';
import { ViewPlugin } from '@codemirror/view';

// Inspired by https://github.com/yjs/y-codemirror.next/blob/main/src/y-sync.js#L141
const changesToOp = (changes) => {
  const op = [];

  // See https://codemirror.net/6/docs/ref/#state.ChangeSet.iterChanges
  // fromA: number,
  // toA: number,
  // fromB: number,
  // toB: number,
  // inserted: Text
  //console.log(changes);
  console.log('"' + JSON.stringify(changes.toJSON()) + '"');

  changes.iterChanges((fromA, toA, fromB, toB, inserted) => {
    const insertedStr = inserted.sliceString(0, inserted.length, '\n');
    //console.log(fromA, toA, fromB, toB, insertedStr);

    //if (fromA !== toA) {
    //  ytext.delete(fromA + adj, toA - fromA)
    //}
    //if (insertText.length > 0) {
    //  ytext.insert(fromA + adj, insertText)
    //}
    //adj += insertText.length - (toA - fromA)
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
          // TODO get correct ops from json0-ot-diff using these two
          //console.log(update.startState.doc.sliceString(0));
          //console.log(update.state.doc.sliceString(0));

          //console.log(update.startState.text.sliceString())
          //console.log(update.state.text.sliceString())
          //let op = [];
          //for (const transaction of update.transactions) {
          //  op = [...op, ...changesToOp(transaction.changes)];
          //}
          shareDBDoc.submitOp(changesToOp(update.changes));
        }
      }

      destroy() {
        this.done = true;
      }
    }
  );
