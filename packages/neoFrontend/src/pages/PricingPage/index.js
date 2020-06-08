import React from 'react';
import { NavBar } from '../../NavBar';
import { Wrapper, Content } from '../styles';
import {
  Table,
  Row,
  Left,
  Right,
  FeatureTitle,
  FeatureDescription,
} from './styles';

import { PlanIncludedSVG, PlanExcludedSVG } from '../../svg';

export const PricingPage = () => (
  <Wrapper>
    <Content>
      <NavBar />
      <Table>
        <Row>
          <Left>
            <FeatureTitle>Public Visualizations</FeatureTitle>
            <FeatureDescription>
              Visualizations publicly accessible for viewing and forking.
            </FeatureDescription>
          </Left>
          <Right>
            <PlanIncludedSVG />
            <PlanExcludedSVG />
          </Right>
        </Row>
        <Row>Row</Row>
        <Row>Row</Row>
      </Table>
    </Content>
  </Wrapper>
);
