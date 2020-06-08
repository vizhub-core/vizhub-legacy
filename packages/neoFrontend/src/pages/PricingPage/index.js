import React from 'react';
import { NavBar } from '../../NavBar';
import { Wrapper, Content, HorizontalRule, Button } from '../styles';
import {
  Table,
  Row,
  Left,
  Right,
  FeatureTitle,
  FeatureDescription,
  PlanLabel,
  EmptySpace,
} from './styles';

import { features, plans, FREE } from './featuresAndPlans';
import { PlanIncludedSVG, PlanExcludedSVG } from '../../svg';

export const PricingPage = () => (
  <Wrapper>
    <Content>
      <NavBar />
      <Table>
        <Row>
          <Left />
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
        <Row>
          <Left />
          <Right>
            {plans.map((plan) =>
              plan.id === FREE ? <EmptySpace /> : <Button>Upgrade</Button>
            )}
          </Right>
        </Row>
      </Table>
    </Content>
  </Wrapper>
);
