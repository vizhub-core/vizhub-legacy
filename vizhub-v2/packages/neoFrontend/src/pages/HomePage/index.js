import React, { useEffect } from 'react';
import { sendEvent } from '../../sendEvent';
import { showSortOptions } from '../../featureFlags';
import { LoadingScreen } from '../../LoadingScreen';
import { NavBar } from '../../NavBar';
//import { Feedback } from '../../Feedback';
import { useVizzesSort } from '../../VizzesGrid/VizzesSortForm';
import { Wrapper, Content } from '../styles';
import { HomePageDataProvider } from './HomePageDataContext';
import { Vizzes } from './Vizzes';
//import { Banner } from './Banner';
import { Sort } from './Sort';
import { HtmlStylesOverride } from './styles';

export const HomePage = () => {
  const [sort, handleSortChange] = useVizzesSort();

  useEffect(() => {
    sendEvent('event.pageview.home');
  }, []);

  return (
    <>
      <HtmlStylesOverride />
      <HomePageDataProvider sort={sort} fallback={<LoadingScreen />}>
        <NavBar isHomePage={true} showSearch />
        {
          // The thing at the top that says
          // "You're minutes away from creating a data visualization."
          // Removed as not required. Let the content speak for itself.
          // "Get started" CTA not required, as users will end up there after
          // logging in and noticing "Create viz" in the user dropdown.
          // <Banner />
        }
        <Wrapper>
          <Content>
            {showSortOptions ? (
              <Sort value={sort} onChange={handleSortChange} />
            ) : null}
            <Vizzes />
          </Content>
        </Wrapper>
      </HomePageDataProvider>
      {
        // The thing on the left that says "Feedback" and links to the forum.
        // Removed as not required. Forum link is in the navbar.
        // <Feedback />
      }
    </>
  );
};
