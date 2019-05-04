import React, { useContext } from 'react';
import { withTheme } from 'styled-components';
import { StudioDataContext, VizContext } from '../../contexts';
import { OwnerInfo } from './OwnerInfo';
import {
  FullScreen,
  /*Fork,*/
  Edit,
  Upvote,
  Downvote,
  Share,
  Download
} from './Actions';
import { Comments } from './Comments';
import { ForkedFrom } from './ForkedFrom';
import { formatViewCount } from './formatViewCount';
import { Header } from './Header';
import { Runner } from './Runner';
import {
  Wrapper,
  Padded,
  TitleActions,
  Description,
  TitleViewCount,
  Actions,
  Title,
  SmallText,
  Provenance
} from './styles';

export const Viewer = withTheme(({ theme }) => {
  const { userData, authenticatedUserId, comments, vizSnapshots } = useContext(
    StudioDataContext
  );

  const { vizData } = useContext(VizContext);

  const {
    ownerUserId,
    viewCount,
    upvotes,
    downvotes,
    publishDateISOString,
    forkedFromVizId
  } = vizData;

  const { title } = vizData.working;

  const publishDate = new Date(publishDateISOString);
  const authenticatedUserData = userData[authenticatedUserId];
  const ownerUserData = userData[ownerUserId];

  let forkedFromUserData;
  if (forkedFromVizId) {
    const forkedFromVizData = vizSnapshots[forkedFromVizId].data;
    forkedFromUserData = userData[forkedFromVizData.ownerUserId];
  }
  console.log(forkedFromUserData);

  return (
    <Wrapper>
      <Header
        authenticatedUserData={authenticatedUserData}
        height={theme.headerHeight}
      />
      <Runner vizData={vizData} />
      <TitleActions>
        <Padded>
          <TitleViewCount>
            <Title>{title}</Title>
            <SmallText>{formatViewCount(viewCount)} views</SmallText>
          </TitleViewCount>
        </Padded>
        <Actions>
          <Upvote upvotes={upvotes} />
          <Downvote downvotes={downvotes} />
          <Share />
          {/*<Fork />*/}
          <Edit />
          <Download />
          <FullScreen />
        </Actions>
      </TitleActions>
      <Provenance>
        <OwnerInfo user={ownerUserData} publishDate={publishDate} />
        <ForkedFrom
          forkedFromVizId={forkedFromVizId}
          forkedFromUserData={forkedFromUserData}
        />
      </Provenance>
      <Padded>
        <Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Description>
        <Comments userData={userData} comments={comments} />
      </Padded>
    </Wrapper>
  );
});
