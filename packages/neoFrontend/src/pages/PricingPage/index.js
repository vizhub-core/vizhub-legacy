import React from 'react';
import { NavBar } from '../../NavBar';
import { Wrapper, Content, HorizontalRule } from '../styles';
import {
  Table,
  Row,
  Left,
  Right,
  FeatureTitle,
  FeatureDescription,
  PlanLabel,
} from './styles';

import { features, plans } from './featuresAndPlans';
import { PlanIncludedSVG, PlanExcludedSVG } from '../../svg';

export const PricingPage = () => (
  <Wrapper>
    <Content>
      <NavBar />
      <Table>
        <Row>
          <Left> </Left>
          <Right>
            {plans.map((plan) => (
              <PlanLabel key={plan.id}>{plan.label}</PlanLabel>
            ))}
          </Right>
        </Row>
        {features.map((feature, i) => (
          <>
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
            {i < features.length - 1 ? <HorizontalRule /> : null}
          </>
        ))}
      </Table>
    </Content>
  </Wrapper>
);
