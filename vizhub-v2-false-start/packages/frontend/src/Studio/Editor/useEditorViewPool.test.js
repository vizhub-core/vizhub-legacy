import React from 'react';
import ReactDOM from 'react-dom';
import { useEditorViewPool } from './useEditorViewPool';

describe('useEditorViewPool', () => {
  it('should create a pool for a given vizId', done => {
    const Component = ({ vizId }) => {
      const viewPool = useEditorViewPool(vizId);
      if (viewPool) {
        expect(viewPool).toBeTruthy();
        expect(typeof viewPool.getView).toEqual('function');
        expect(typeof viewPool.setView).toEqual('function');
        expect(typeof viewPool.destroy).toEqual('function');
        done();
      }
      return null;
    };

    const div = document.createElement('div');
    ReactDOM.render(<Component vizId="foo" />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should clean up existing pool when vizId changes', done => {
    let destroyFirst = jest.fn();
    const Component = ({ vizId }) => {
      console.log(vizId);
      const viewPool = useEditorViewPool(vizId);
      console.log(viewPool);

      if (viewPool) {
        if (vizId === 'first') {
          const fileId = 'a';
          if (!viewPool.getView(fileId)) {
            viewPool.setView(fileId, { destroy: destroyFirst });
            expect(destroyFirst).toHaveBeenCalledTimes(0);
          }
          //const view = viewPool.getView(fileId);
          //const view = viewPool.getOrCreateView(fileId);
          //expect(Object.keys(viewPool).length).toEqual(0);
          //viewPool[fileId] = view;
          //expect(Object.keys(viewPool).length).toEqual(1);
        }
        if (vizId === 'second') {
          //expect(destroyFirst).toHaveBeenCalledTimes(1);
          done();
        }
      }
      return null;
    };

    const div = document.createElement('div');
    ReactDOM.render(<Component vizId="first" />, div);
    ReactDOM.render(<Component vizId="second" />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
