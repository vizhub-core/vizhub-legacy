import React from 'react';
import ReactDOM from 'react-dom';
import { useEditorViewPool } from './useEditorViewPool';

describe('useEditorViewPool', () => {
  it('should create a pool for a given vizId', done => {
    const Component = ({ vizId }) => {
      const viewPool = useEditorViewPool(vizId);
      if (viewPool) {
        expect(viewPool).toBeTruthy();
        expect(Object.keys(viewPool).length).toEqual(0);
        done();
      }
      return null;
    };

    const div = document.createElement('div');
    ReactDOM.render(<Component vizId="foo" />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
