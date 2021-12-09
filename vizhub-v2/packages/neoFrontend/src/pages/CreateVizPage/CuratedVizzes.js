import React from 'react';
import { isProd } from '../../constants';
import { Vizzes } from '../../VizzesGrid/Vizzes';
import { useTemplates } from './useTemplates';
import { Section, SectionTitle, SeeMore } from './styles';

// Sanity check during development.
const checkForDuplicates = (ids) => {
  const lookup = {};
  ids.forEach((id) => {
    if (lookup[id]) {
      console.log('duplicate id: ' + id);
    }
    lookup[id] = true;
  });
};

export const CuratedVizzes = ({ children, ids, more }) => {
  if (!isProd) {
    checkForDuplicates(ids);
  }
  const { usersById, visualizationInfos } = useTemplates(ids);
  return (
    <Section>
      <SectionTitle>{children}</SectionTitle>
      <Vizzes usersById={usersById} visualizationInfos={visualizationInfos} />
      {more ? <SeeMore href={more}>see more</SeeMore> : null}
    </Section>
  );
};
