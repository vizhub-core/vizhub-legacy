import React from 'react';
import { NavBar } from '../../NavBar';
import { Wrapper, Content, Centering, Text } from '../styles';
import { Table, Row } from './styles';

export const PricingPage = () => (
  <Wrapper>
    <Content>
      <NavBar />
      <Table>
        <Row>Row</Row>
        <Row>Row</Row>
        <Row>Row</Row>
      </Table>
    </Content>
  </Wrapper>
);
