import React, {
  createContext,
  useContext,
  useRef,
  useCallback,
  useEffect
} from 'react';
import { VizPageDataContext } from '../VizPageDataContext';
import { defaultVizHeight, vizWidth } from '../../../constants';
import { theme } from '../../../theme';

const srcDoc = `<style>body { background-color: pink; }</style>`;
export const VizRunnerContext = createContext();

// Yes, this will be lying around all the time, doing no harm.
const iFrame = document.createElement('iframe');

iFrame.setAttribute('srcDoc', srcDoc);
iFrame.setAttribute('width', vizWidth);
iFrame.style.position = 'fixed';
iFrame.style.border = 0;
iFrame.style['transform-origin'] = '0 0';
iFrame.style['z-index'] = 0;
iFrame.style['background-color'] = '#ffffff';
iFrame.style['box-shadow'] = theme.shadowLight;

export const VizRunnerProvider = ({ children }) => {
  const { visualization } = useContext(VizPageDataContext);
  const vizHeight = visualization.info.height || defaultVizHeight;
  const ref = useRef();

  const setVizRunnerTransform = useCallback(({ x, y, scale }) => {
    iFrame.style.transform = `scale(${scale})`;
    iFrame.style.top = `${y}px`;
    iFrame.style.left = `${x}px`;
  }, []);

  const contextValue = { setVizRunnerTransform };

  useEffect(() => {
    iFrame.setAttribute('height', vizHeight);
  }, [vizHeight]);

  useEffect(() => {
    const div = ref.current;
    div.appendChild(iFrame);
    return () => {
      div.removeChild(iFrame);
    };
  }, [ref]);

  return (
    <div ref={ref}>
      <VizRunnerContext.Provider value={contextValue}>
        {children}
      </VizRunnerContext.Provider>
    </div>
  );
};
