import React, { Fragment, useContext, useEffect } from 'react';

import { sendEvent } from '../../sendEvent';
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
} from './styles';

import { features, plans, BASIC } from './featuresAndPlans';

import { handleUpgradeClick } from './stripe';

export const PricingPage = () => {
  const { me } = useContext(AuthContext);

  const viewer = (me && me.id) || 'anonymous';

  useEffect(() => {
    sendEvent(`event.pageview.pricing.viewer:${viewer}`);
  }, [viewer]);

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
                    {plan.id === BASIC ? (
                      <Button
                        onClick={handleUpgradeClick(me && me.id)}
                        isDisabled={!me}
                        title={!me ? 'Please sign in to upgrade.' : ''}
                      >
                        Upgrade
                      </Button>
                    ) : null}
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
          </Table>
        </Content>
      </Wrapper>
      <Feedback />
    </>
  );
};
