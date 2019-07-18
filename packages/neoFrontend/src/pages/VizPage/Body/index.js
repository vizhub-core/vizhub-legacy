import React, { useContext, useState, useCallback } from 'react';
import { NavBar } from '../../../NavBar';
import { VizPageDataContext } from '../VizPageDataContext';
import { ForkingContext } from '../ForkingContext';
import { Wrapper, Bottom, TorsoWrapper, Torso, HorizontalRule } from './styles';
import { Head } from './Head';
import { VizFrame } from './VizFrame';
import { TitleBar } from './TitleBar';
import { DescriptionSection } from './DescriptionSection';
import { FullScreen } from './FullScreen';

/*

How to handle runner iframe?

Woule like to have low-level control over:

 - positioning
 - transitions in position
 - when the srcDoc attribute is reset

Do not want to tear down and re-create on each view change.

Approaches:

 - Have a persistent DOM node that is always in the same place in the DOM tree.
 - Have a persistent DOM node that is attached and detached from DOM tree as needed.

Cases to handle:

 - Within viewer
   - Need to scroll nicely
   - Ideally could simply attach to DOM here
     - Would get scrolling and Z ordering "for free"
 - Full screen
 - Mini view
 - Transitions
   - Would need to do transition "outside" DOM tree.
*/

export const Body = () => {
  const {
    visualization,
    ownerUser,
    forkedFromVisualizationInfo,
    forkedFromVisualizationOwnerUserName
  } = useContext(VizPageDataContext);

  const onFork = useContext(ForkingContext);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const onFullScreen = useCallback(() => {
    setIsFullScreen(true);
  }, [setIsFullScreen]);

  const onExitFullScreen = useCallback(() => {
    setIsFullScreen(false);
  }, [setIsFullScreen]);

  return isFullScreen ? (
    <FullScreen onExitFullScreen={onExitFullScreen} />
  ) : (
    <Wrapper>
      <NavBar />
      <Head onFork={onFork} />
      <Bottom>
        <TorsoWrapper>
          <Torso>
            <VizFrame
              vizHeight={visualization.info.height}
              onFullScreen={onFullScreen}
            />
            <TitleBar title={visualization.title} />
            <HorizontalRule />
            <DescriptionSection
              visualization={visualization}
              ownerUser={ownerUser}
              forkedFromVisualizationInfo={forkedFromVisualizationInfo}
              forkedFromVisualizationOwnerUserName={
                forkedFromVisualizationOwnerUserName
              }
            />
            <HorizontalRule />
          </Torso>
        </TorsoWrapper>
      </Bottom>
    </Wrapper>
  );
};
