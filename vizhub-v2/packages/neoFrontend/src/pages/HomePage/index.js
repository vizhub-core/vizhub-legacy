import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { sendEvent } from "../../sendEvent";
import { showSortOptions } from "../../featureFlags";
import { LoadingScreen } from "../../LoadingScreen";
import { NavBar } from "../../NavBar";
import { Button } from "../../Button";
//import { Feedback } from '../../Feedback';
import { useVizzesSort } from "../../VizzesGrid/VizzesSortForm";
import { Wrapper, WideContent } from "../styles";
import { HtmlStylesOverride, HorizontalSplit } from "./styles";
import { HomePageDataProvider } from "./HomePageDataContext";
import { Vizzes } from "./Vizzes";
import { Banner } from "./Banner";
import { Sort } from "./Sort";

export const HomePage = () => {
  const [sort, handleSortChange] = useVizzesSort();

  useEffect(() => {
    sendEvent("event.pageview.home");
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
          <Banner />
        }
        <Wrapper>
          <WideContent>
            <HorizontalSplit>
              {showSortOptions ? (
                <Sort value={sort} onChange={handleSortChange} />
              ) : null}
              <Link to="/create-viz">
                <Button isFilled>Create Viz</Button>
              </Link>
            </HorizontalSplit>
            <Vizzes />
          </WideContent>
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
