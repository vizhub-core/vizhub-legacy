import React, { useContext } from "react";
import { AuthContext } from "../../../authentication";
import { Banner } from "../styles";
import { Right, Left } from "./styles";
import styled from "styled-components";

const RedBanner = styled.div`
  background-color: #ff6441;
  color: black;
  text-align: center;
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
`;

export const DesktopLayout = ({
  Logo,
  Search,
  AboutLink,
  ForumLink,
  PricingLink,
  AuthSection,
  isHomePage,
}) => {
  const { me } = useContext(AuthContext);

  return (
    <>
      <RedBanner>
        VizHub 3 coming soon! The site will be down during the transition on
        January 2, 2024.
      </RedBanner>
      <Banner isHomePage={isHomePage}>
        <Left>{Logo}</Left>
        <Right
          className="test-user-navbar-section"
          data-test-is-authenticated={Boolean(me)}
        >
          {Search}
          {AboutLink}
          {ForumLink}
          {PricingLink}
          {AuthSection}
        </Right>
      </Banner>
    </>
  );
};
