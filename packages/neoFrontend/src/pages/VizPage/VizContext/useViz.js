import { useReducer } from 'react';

function reducer(viz, action) {
  switch (action.type) {
    case 'fileChange':
      return {
        ...viz,
        content: {
          ...viz.content,
          files: viz.content.files.map(file =>
            file.name === action.name ? { ...file, text: action.text } : file
          )
        }
      };
    default:
      throw new Error();
  }
}

export const useViz = initialViz => {
  const [viz, dispatch] = useReducer(reducer, initialViz);

  // TODO useCallback
  const onFileChange = name => text => {
    dispatch({ type: 'fileChange', name, text });
  };

  return { viz, onFileChange };
};
