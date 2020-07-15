import React, { useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LoadingScreen } from '../../LoadingScreen';
import { Wrapper, Content, Centering, Title } from '../styles';
import { NavBar } from '../../NavBar';
import { Vizzes as VizzesPresentation } from '../../VizzesGrid/Vizzes';
import { LiveVizPreview } from '../../VizPreview';
import { AuthContext } from '../../authentication';
import { ErrorContext } from '../../ErrorContext';
import { usePageData } from './usePageData';
import { Text } from './styles';
import { getVizInfoOwner, getUserName } from 'vizhub-presenters';

// We may want to bring this back.
const showForkedFromViz = false;

export const ForksPage = () => {
  const pageData = usePageData();
  const { setError } = useContext(ErrorContext);
  const { me } = useContext(AuthContext);

  const getUser = useCallback((id) => pageData.usersById[id], [
    pageData.usersById,
  ]);

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
      <Wrapper>
        <Content>
          <NavBar />
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
    );
  } else {
    return <LoadingScreen />;
  }
};
