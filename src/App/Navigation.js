import React, { useEffect, useState, useMemo, useRef, useReducer } from 'react';
import { LogoSVG } from '../svg/LogoSVG';
import { classed } from './classed';
import { isClient } from './isClient';

const { max, min } = Math;

const LogoLink = classed('logo-link', 'a');

const heightFake = 30;
const reducer = (top, { delta, height }) => {
  const newTop = min(max(top + delta, -heightFake), 0);
  console.log(newTop);
  return newTop;
};

export const Navigation = ({ linkLogoToHome = true }) => {
  const ref = useRef();
  const [height, setHeight] = useState(null);
  const [top, dispatch] = useReducer(reducer, 0);

  // Get height defined in CSS.
  useEffect(() => {
    if (isClient) {
      setHeight(parseFloat(window.getComputedStyle(ref.current).height));
    }
  }, []);

  // Implement show/hide on page scroll.
  useEffect(() => {
    if (isClient && height !== null) {
      let previousScroll = window.pageYOffset;
      const callback = () => {
        const currentScroll = window.pageYOffset;
        const delta = previousScroll - currentScroll;
        previousScroll = currentScroll;
        dispatch({ delta, height });
      };
      window.addEventListener('scroll', callback);
      return () => {
        // TODO verify that this is working
        console.log('removing scroll listener');
        window.removeEventListener('scroll', callback);
      };
    }
  }, [height]);

  const style = useMemo(() => ({ top }), [top]);

  return (
    <div className="navigation" ref={ref} style={style} data-theme="dark">
      {linkLogoToHome ? (
        <LogoLink href="/">
          <LogoSVG />
        </LogoLink>
      ) : (
        <LogoSVG />
      )}
    </div>
  );
};
