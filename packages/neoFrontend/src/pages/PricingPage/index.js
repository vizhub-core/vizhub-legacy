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

import { features, plans } from './featuresAndPlans';
import { PlanIncludedSVG, PlanExcludedSVG } from '../../svg';

export const PricingPage = () => (
  <Wrapper>
    <Content>
      <NavBar />
      <Table>
        {features.map((feature) => (
          <Row key={feature.title}>
            <Left>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </Left>
            <Right>
              {plans.map((plan) =>
                feature.plans[plan.id] ? (
                  <PlanIncludedSVG />
                ) : (
                  <PlanExcludedSVG />
                )
              )}
            </Right>
          </Row>
        ))}
      </Table>
    </Content>
  </Wrapper>
);
