import React, { Fragment } from 'react';
import { NavBar } from '../../NavBar';
import { Button } from '../../Button';
import { Wrapper, Content, HorizontalRule } from '../styles';
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

import { handleUpgradeClick } from './stripe';

export const PricingPage = () => {
  return (
    <>
      <NavBar />
      <Wrapper>
        <Content>
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
              <Fragment key={feature.title}>
                <Row>
                  <Left>
                    <FeatureTitle>{feature.title}</FeatureTitle>
                    <FeatureDescription>{feature.description}</FeatureDescription>
                  </Left>
                  <Right>
                    {plans.map((plan) => (
                      <Fragment key={plan.id}>
                        {feature.plans[plan.id] ? (
                          <PlanIncludedSVG />
                        ) : (
                          <PlanExcludedSVG />
                        )}
                      </Fragment>
                    ))}
                  </Right>
                </Row>
                {i < features.length - 1 ? <HorizontalRule /> : null}
              </Fragment>
            ))}
            <Row>
              <Left />
              <Right>
                {plans.map((plan) => (
                  <Fragment key={plan.id}>
                    {plan.id === FREE ? (
                      <EmptySpace key={plan.id} />
                    ) : (
                      <Button key={plan.id} onClick={handleUpgradeClick}>
                        Upgrade
                      </Button>
                    )}
                  </Fragment>
                ))}
              </Right>
            </Row>
          </Table>
        </Content>
      </Wrapper>
    </>
  );
};
