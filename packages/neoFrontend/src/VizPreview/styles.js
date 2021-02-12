import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Z_ABOVE } from '../styles';
import { isMobile } from '../mobileMods';
import { PrivacyNotice } from '../PrivacyNotice';

export const VizPreviews = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${isMobile ? 'center' : 'space-between'};
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 6px 12px 6px;
  color: ${(props) => props.theme.dark};
  position: relative;
  text-align: left;
`;

// Inspired by https://vega.github.io/vega/
export const ImageLink = styled(Link)`
  width: 230px;
  height: 120px;
  background-position: left top;
  background-size: cover;
  overflow: hidden;
  position: relative;
  transition: background-position 3s;
  box-shadow: ${(props) => props.theme.shadow};
  border-top-right-radius: ${(props) => props.theme.borderRadiusLarge}px;
  border-top-left-radius: ${(props) => props.theme.borderRadiusLarge}px;
  &:hover {
    background-position: right bottom;
  }
`;

export const VizPreviewFooter = styled.div`
  box-shadow: ${(props) => props.theme.shadow};
  background-color: #ffffff;
  border-bottom-right-radius: ${(props) => props.theme.borderRadiusLarge}px;
  border-bottom-left-radius: ${(props) => props.theme.borderRadiusLarge}px;
  box-sizing: border-box;
  z-index: ${Z_ABOVE};
  width: 230px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2px 5px 5px 5px;
`;

export const VizPreviewTitle = styled(Link)`
  width: 100%;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: currentcolor;
  flex: 1;
  margin-bottom: 2px;
`;

export const Bottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const VizPrivacyNotice = styled(PrivacyNotice)`
  position: absolute;
  padding: 0 8px 0 8px;
  color: white;
  margin-top: 10px;
  margin-left: 0px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;
