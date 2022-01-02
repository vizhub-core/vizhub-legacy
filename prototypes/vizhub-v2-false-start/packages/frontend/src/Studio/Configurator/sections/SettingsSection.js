import React from 'react';
import { Section } from '../Section';
import { Item } from '../styles';

export const SettingsSection = () => (
  <Section title="Settings" id="settings">
    <Item>Auto-resize</Item>
    <Item>Height</Item>
    <Item>Background color</Item>
    <Item>Privacy</Item>
    <Item>Collaborators</Item>
  </Section>
);
