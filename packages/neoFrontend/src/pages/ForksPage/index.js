import React, { useEffect, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getVizInfoOwner, getUserName } from 'vizhub-presenters';
import { sendEvent } from '../../sendEvent';
import { LoadingScreen } from '../../LoadingScreen';
import { Feedback } from '../../Feedback';
import { NavBar } from '../../NavBar';
import { Vizzes as VizzesPresentation } from '../../VizzesGrid/Vizzes';
import { LiveVizPreview } from '../../VizPreview';
import { AuthContext } from '../../authentication';
import { ErrorContext } from '../../ErrorContext';
import { Wrapper, Content, Centering, Title } from '../styles';
import { usePageData } from './usePageData';
import { Text } from './styles';

// We may want to bring this back.
const showForkedFromViz = false;

export const ForksPage = () => {
  const pageData = usePageData();
  const { setError } = useContext(ErrorContext);
  const { me } = useContext(AuthContext);

  const getUser = useCallback((id) => pageData.usersById[id], [
    pageData.usersById,
  ]);

  useEffect(() => {
    if (pageData && pageData.visualizationInfo) {
      const vizId = pageData.visualizationInfo.id;
      sendEvent([
        'event',
        'event.pageview',
        'event.pageview.forks',
        `event.pageview.forks.viz:${vizId}`,
      ]);
    }
  }, [pageData]);

  if (pageData && pageData.error) {
    setError({
      message: 'Visualization not found.',
      className: 'test-viz-not-found',
    });
    return null;
  }

  if (pageData && pageData.visualizationInfo) {
    const vizInfo = pageData.visualizationInfo;
    const { id } = vizInfo;
    const owner = getVizInfoOwner(pageData.visualizationInfo);
    const ownerUser = getUser(owner);

    return (
      <>
        <NavBar />
        <Wrapper>
          <Content>
            {showForkedFromViz ? (
              <>
                <Centering>
                  <Title>Visualization Home</Title>
                </Centering>
                <Centering>
                  <LiveVizPreview
                    me={me}
                    vizInfo={pageData.visualizationInfo}
                    getUser={getUser}
                  />
                </Centering>
                <Centering>
                  <Title>Description</Title>
                </Centering>
                <Centering>
                  <Text>{pageData.visualizationInfo.description}</Text>
                </Centering>
              </>
            ) : null}
            <Centering>
              <Title>
                Forks of{' '}
                <Link to={`/${getUserName(ownerUser)}/${id}`}>
                  {pageData.visualizationInfo.title}
                </Link>
              </Title>
            </Centering>
            <Centering>
              <VizzesPresentation {...pageData} />
            </Centering>
          </Content>
        </Wrapper>
        <Feedback />
      </>
    );
  } else {
    return <LoadingScreen />;
  }
};
