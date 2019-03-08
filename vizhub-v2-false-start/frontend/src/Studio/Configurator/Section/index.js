import React, { useContext } from 'react';
import { ArrowRightSVG, ArrowDownSVG } from '../../../icons';
import { URLStateContext } from '../../../urlState';
import { Wrapper, Header, HeaderIcon, HeaderTitle, Body } from './styles';

export const Section = ({ id, title, children }) => {
  const { activeSection, setActiveSection } = useContext(URLStateContext);
  const isActive = id === activeSection;
  const toggle = () => setActiveSection(isActive ? null : id);

  return (
    <Wrapper>
      <Header onClick={toggle}>
        <HeaderIcon>
          {isActive ? <ArrowDownSVG /> : <ArrowRightSVG />}
        </HeaderIcon>
        <HeaderTitle>{title}</HeaderTitle>
      </Header>
      {isActive ? <Body>{children}</Body> : null}
    </Wrapper>
  );
};
