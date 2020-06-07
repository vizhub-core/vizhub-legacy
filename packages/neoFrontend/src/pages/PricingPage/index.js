import React from 'react';
import { NavBar } from '../../NavBar';
import { Wrapper, Content}  from '../styles';
import { Table, Row, Left, Right } from './styles';

export const PricingPage = () => (
  <Wrapper>
    <Content>
      <NavBar />
      <Table>
        <Row><Left>Left</Left><Right>Right</Right></Row>
        <Row>Row</Row>
        <Row>Row</Row>
      </Table>
    </Content>
  </Wrapper>
);
