import React, { useContext, useMemo } from 'react';
import { getVizInfo, getUserName } from 'vizhub-presenters';
import { domain } from '../../../../../constants';
import { useValue } from '../../../../../useValue';
import { LogoSVG } from '../../../../../svg';
import { VizPageDataContext } from '../../../VizPageDataContext';
import { VizContext } from '../../../VizContext';
import { Wrapper, LogoWrapper, LogoText } from './styles';

export const EmbedFooter = () => {
  const { ownerUser } = useContext(VizPageDataContext);
  const { viz$ } = useContext(VizContext);
  const vizInfo = useValue(viz$, getVizInfo);

  const href = useMemo(() => {
    return `${domain}/${getUserName(ownerUser)}/${vizInfo.id}`;
  }, [ownerUser, vizInfo]);

  return (
    <Wrapper>
      <LogoText>view in </LogoText>
      <LogoWrapper target="_blank" rel="noopener noreferrer" href={href}>
        <LogoSVG height={26} />
      </LogoWrapper>
    </Wrapper>
  );
};
