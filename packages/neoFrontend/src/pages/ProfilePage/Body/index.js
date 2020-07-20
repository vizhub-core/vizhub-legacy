import React, { useContext, useMemo } from 'react';
import { usersMatch } from 'vizhub-presenters';
import { ProfilePageDataContext } from '../ProfilePageDataContext';
import { ProfilePane } from '../ProfilePane';
import { AuthContext } from '../../../authentication';
import { NavBar } from '../../../NavBar';
import { Vizzes } from '../../../VizzesGrid/Vizzes';
import { Wrapper, Content, Centering } from '../../styles';
import { Feedback, FeedbackWrapper } from './styles';

export const Body = () => {
  const profilePageData = useContext(ProfilePageDataContext);
  const { user, visualizationInfos } = profilePageData;
  const { me } = useContext(AuthContext);

  const isMyProfile = usersMatch(me, user);

  const vizzesUsersMap = useMemo(() => {
    return { [user.id]: user };
  }, [user]);

  const searchProps = useMemo(() => {
    return { redirectPath: `/${user.userName}` };
  }, [user.userName]);

  return (
    <>
      <NavBar showSearch searchProps={searchProps} />
      <Wrapper>
        <Content>
          <ProfilePane user={user} />
          <Centering>
            <Vizzes
              className="test-profile-page-viz-previews"
              visualizationInfos={visualizationInfos}
              usersById={vizzesUsersMap}
            />
          </Centering>
        </Content>
      </Wrapper>

      {isMyProfile ? (
        <a
          href="https://github.com/datavis-tech/vizhub-issue-tracker/issues/new"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FeedbackWrapper>
            <Feedback>Feedback</Feedback>
          </FeedbackWrapper>
        </a>
      ) : null}
    </>
  );
};
