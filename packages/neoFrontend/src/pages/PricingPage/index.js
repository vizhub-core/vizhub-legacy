import React, { Fragment, useContext } from 'react';
import { NavBar } from '../../NavBar';
import { Button } from '../../Button';
import { Feedback } from '../../Feedback';
import { PlanIncludedSVG, PlanExcludedSVG } from '../../svg';
import { AuthContext } from '../../authentication';
import { Wrapper, Content } from '../styles';
import { HorizontalRule } from '../../styles';
import {
  Table,
  Row,
  Left,
  Right,
  FeatureTitle,
  FeatureDescription,
  PlanWrapper,
  PlanLabel,
  PlanSubtext,
  EmptySpace,
} from './styles';

import { features, plans, FREE } from './featuresAndPlans';

import { handleUpgradeClick } from './stripe';

export const PricingPage = () => {
  const { me } = useContext(AuthContext);

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
                  <PlanWrapper key={plan.id}>
                    <PlanLabel>{plan.label}</PlanLabel>
                    {plan.subtext
                      ? plan.subtext.map((text) => (
                          <PlanSubtext key={text}>{text}</PlanSubtext>
                        ))
                      : null}
                  </PlanWrapper>
                ))}
              </Right>
            </Row>
            {features.map((feature, i) => (
              <Fragment key={feature.title}>
                <Row>
                  <Left>
                    <FeatureTitle>{feature.title}</FeatureTitle>
                    <FeatureDescription>
                      {feature.description}
                    </FeatureDescription>
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
                      <EmptySpace />
                    ) : (
                      <Button
                        onClick={handleUpgradeClick(me.id)}
                        disabled={!me}
                        title={!me ? 'Please log in to upgrade.' : ''}
                      >
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
      <Feedback />
    </>
  );
};
