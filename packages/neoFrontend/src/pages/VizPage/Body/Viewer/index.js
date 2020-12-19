import React, {
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect,
} from 'react';
import PerfectScrollbar from 'perfect-scrollbar';
import {
  getVizInfo,
  getVizHeight,
  getVizUpvotes,
  getUpvoteCount,
  getDidVote,
  upvoteOp,
  isVizInfoPrivate,
} from 'vizhub-presenters';
import { useValue } from '../../../../useValue';
import { AuthContext } from '../../../../authentication';
import { Centering } from '../../../styles';
import { HorizontalRule } from '../../../../styles';
import { VizPageDataContext } from '../../VizPageDataContext';
import { VizContext } from '../../VizContext';
import { useListener } from '../useListener';
import { Wrapper, Scroller, ViewerContent, ViewerFooter } from './styles';
import { VizFrame } from './VizFrame';
import { TitleBar } from './TitleBar';
import { DescriptionSection } from './DescriptionSection';
import { Resizer } from './Resizer';
import { GlobalScrollbarStyle } from './GlobalScrollbarStyle';

export const Viewer = () => {
  const {
    ownerUser,
    forkedFromVisualizationInfo,
    forkedFromVisualizationOwnerUserName,
    usersWhoUpvoted,
  } = useContext(VizPageDataContext);

  const { viz$, submitVizInfoOp } = useContext(VizContext);
  const { me } = useContext(AuthContext);

  const vizInfo = useValue(viz$, getVizInfo);
  const vizHeight = useValue(viz$, getVizHeight);

  const upvotes = useValue(viz$, getVizUpvotes);
  const upvoteCount = getUpvoteCount(upvotes);
  const didVote = getDidVote(upvotes, me);
  const canVote = !!me;

  // TODO use this pattern with title
  const handleUpvote = useCallback(() => {
    if (me) {
      submitVizInfoOp(upvoteOp(me.id, upvotes));
    }
  }, [submitVizInfoOp, me, upvotes]);

  const scrollerRef = useRef();
  const perfectScrollbarRef = useRef();

  useEffect(() => {
    perfectScrollbarRef.current = new PerfectScrollbar(scrollerRef.current);
    return () => {
      perfectScrollbarRef.current.destroy();
      perfectScrollbarRef.current = undefined;
    };
  }, []);

  const updateScrollbar = useCallback(() => {
    if (perfectScrollbarRef.current) {
      perfectScrollbarRef.current.update();
    }
  }, []);

  useListener('resize', updateScrollbar, window);

  // Breakpoints for responsive layout.
  const [size, setSize] = useState();
  const setWidth = useCallback(
    (width) => {
      setSize(width < 500 ? 'small' : width < 700 ? 'medium' : 'large');
      updateScrollbar();
    },
    [setSize, updateScrollbar]
  );

  // Set title in browser tab.
  useEffect(() => {
    const title = document.title;

    document.title = vizInfo.title;

    return () => {
      document.title = title;
    };
  }, [vizInfo.title]);

  const isPrivate = isVizInfoPrivate(vizInfo);

  return (
    <Wrapper className="test-viewer">
      <Resizer />
      <GlobalScrollbarStyle />
      <Scroller ref={scrollerRef}>
        <Centering>
          <ViewerContent>
            <VizFrame
              vizHeight={vizHeight}
              scrollerRef={scrollerRef}
              setWidth={setWidth}
            />
            <TitleBar
              title={vizInfo.title}
              vizId={vizInfo.id}
              canVote={canVote}
              didVote={didVote}
              upvoteCount={upvoteCount}
              onUpvoteClick={handleUpvote}
              isPrivate={isPrivate}
              usersWhoUpvoted={usersWhoUpvoted}
            />
            <HorizontalRule />
            <DescriptionSection
              vizInfo={vizInfo}
              ownerUser={ownerUser}
              forkedFromVisualizationInfo={forkedFromVisualizationInfo}
              forkedFromVisualizationOwnerUserName={
                forkedFromVisualizationOwnerUserName
              }
              size={size}
            />
            <HorizontalRule />
            <ViewerFooter title="All public code in VizHub is released under the MIT License.">
              MIT Licensed
            </ViewerFooter>
          </ViewerContent>
        </Centering>
      </Scroller>
    </Wrapper>
  );
};
