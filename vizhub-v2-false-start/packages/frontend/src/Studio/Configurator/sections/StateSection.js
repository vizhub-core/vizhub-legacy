import React from 'react';
import { Section } from '../Section';
import { Widget, WidgetTitle, WidgetValue } from '../styles';

export const StateSection = () => (
  <Section title="State" id="state">
    <Widget>
      <WidgetTitle>Color</WidgetTitle>
      <WidgetValue fill="#e66465" />
    </Widget>
    <Widget isLast={true}>
      <WidgetTitle>Color</WidgetTitle>
      <WidgetValue fill="#e66465" />
    </Widget>
  </Section>
);
