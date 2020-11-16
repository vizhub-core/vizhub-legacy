import React, { useContext, useMemo } from 'react';
import { getVizInfo, getUserFullName, getUserName } from 'vizhub-presenters';
import { domain } from '../../../../../constants';
import { useValue } from '../../../../../useValue';
import { LogoSVG } from '../../../../../svg';
import { Avatar } from '../../../../../Avatar';
import { VizPageDataContext } from '../../../VizPageDataContext';
import { VizContext } from '../../../VizContext';
import { AuthorName, Authorship, Title, VizInfo, Wrapper } from './styles';

export const EmbedFooter = () => {
  const { ownerUser } = useContext(VizPageDataContext);
  const { viz$ } = useContext(VizContext);
  const vizInfo = useValue(viz$, getVizInfo);

  const href = useMemo(() => {
    return `${domain}/${getUserName(ownerUser)}/${vizInfo.id}`;
  }, [ownerUser, vizInfo]);

  return (
    <Wrapper target="_blank" rel="noopener noreferrer" href={href}>
      <VizInfo>
        <Title>{vizInfo.title}</Title>
        <Authorship>
          <Avatar size={31} user={ownerUser} />
          <AuthorName>{getUserFullName(ownerUser)}</AuthorName>
        </Authorship>
      </VizInfo>
      <LogoSVG height={26} />
    </Wrapper>
  );
};
