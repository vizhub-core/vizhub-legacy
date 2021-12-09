import React, { useRef, useCallback, useEffect } from 'react';

export const ExitableWrapper = ({
  className,
  children,
  onExit,
  onKeyDown,
  ...rest
}) => {
  const wrapperRef = useRef();

  useEffect(() => {
    const hanldeGlobalClick = (event) => {
      // shortcut if the wrapper is not ready or if the event.target is not in the dom
      if (!wrapperRef.current || !event.target.isConnected) return;

      // do exit if the click target outside of the wrapper
      if (!wrapperRef.current.contains(event.target)) {
        onExit();
      }
    };

    document.addEventListener('click', hanldeGlobalClick);
    return () => {
      document.removeEventListener('click', hanldeGlobalClick);
    };
  }, [onExit]);

  const handleKeyDown = useCallback(
    (event) => {
      if (onKeyDown) onKeyDown(event);

      if (event.key === 'Escape') {
        onExit();
      }
    },
    [onKeyDown, onExit]
  );

  return (
    <div
      className={className}
      ref={wrapperRef}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {children}
    </div>
  );
};
