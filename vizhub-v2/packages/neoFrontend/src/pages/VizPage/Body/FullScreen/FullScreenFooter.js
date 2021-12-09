import React, { useContext } from 'react';
import { FullExitSVG } from '../../../../svg';
import { MiniOrMicroSVG } from '../../../../mobileMods';
import {
  exitFullScreenTooltip,
  enterMiniModeTooltip,
} from '../../../../constants';
import { LargeIcon } from '../../../styles';
import { URLStateContext } from '../../URLStateContext';
import { FullScreenFooterWrapper } from './styles';

export const FullScreenFooter = () => {
  const { exitFullScreen, enterMini } = useContext(URLStateContext);

  return (
    <FullScreenFooterWrapper>
      <LargeIcon
        title={enterMiniModeTooltip}
        leftmost={true}
        onClick={enterMini}
      >
        <MiniOrMicroSVG />
      </LargeIcon>
      <LargeIcon
        rightmost={true}
        onClick={exitFullScreen}
        className="exit-fullscreen-from-fullscreen"
        title={exitFullScreenTooltip}
      >
        <FullExitSVG />
      </LargeIcon>
    </FullScreenFooterWrapper>
  );
};
