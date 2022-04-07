import { setup } from './setup';
import { EditorView, ViewPlugin } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
//import { javascript } from '@codemirror/lang-javascript';
import { json1Sync } from 'codemirror-ot';

const getAtPath = ({ shareDBDoc, path }) =>
  path.reduce((accumulator, key) => accumulator[key], shareDBDoc.data);

export const createEditor = ({
  shareDBDoc,
  path,
  additionalExtensions,
  debug = false,
}) =>
  new EditorView({
    state: EditorState.create({
      doc: getAtPath({ shareDBDoc, path }),
      extensions: [setup, json1Sync({ shareDBDoc, path, debug })],
      ...additionalExtensions,
      ...[
        ViewPlugin.fromClass(
          class {
            // Listen for changes to the CodeMirror editor view via this extension.
            // Possibly a simpler way?
            update(update) {
              console.log(update.changes);
              changeSet.iterChanges((fromA, toA, fromB, toB, inserted) => {
                console.log({
                  fromA,
                  toA,
                  fromB,
                  toB,
                  inserted: inserted.sliceString(0, inserted.length, '\n'),
                });
              });
            }
          }
        ),
      ],
      //extensions: [setup, javascript()],
    }),
  });
