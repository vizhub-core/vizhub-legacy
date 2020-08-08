import React, { useState, useMemo, useContext } from 'react';
import { useLocation } from 'react-router';
import { getVizTitle } from 'vizhub-presenters';
import {
  enableWhiteLabelEmbeding,
  enablePreviewEmbeding,
} from '../../../../featureFlags';
import { domain } from '../../../../constants';
import { isMobile } from '../../../../mobileMods';
import { useValue } from '../../../../useValue';
import { VizContext } from '../../VizContext';
import { SubSectionDescription, Spacer } from '../../styles';
import { RadioButton } from '../../RadioButton';
import { TextCopier } from '../TextCopier';
import { Preview } from './styles';

const VIZ = 'Embed visualization';
const WHITELABEL = 'Embed white-label visualization';
const PREVIEW = 'Embed visualization preview';

const iframeDefaultProps = {
  height: isMobile ? 162 : 300,
};

export const EmbedBody = () => {
  const { pathname } = useLocation();
  const { viz$ } = useContext(VizContext);
  const [embedType, setEmbedType] = useState(VIZ);
  const title = useValue(viz$, getVizTitle);

  const src = useMemo(() => {
    return `${domain}${pathname}?mode=embed`;
  }, [pathname]);

  const html = useMemo(() => {
    return `<iframe src="${src}" title="${title}" height="${iframeDefaultProps.height}"></iframe>`;
  }, [src, title]);

  const hasSettings = enableWhiteLabelEmbeding || enablePreviewEmbeding;

  return (
    <>
      <Preview {...iframeDefaultProps} title={title} src={src} />
      {hasSettings && (
        <>
          <SubSectionDescription>Embed Settings</SubSectionDescription>
          <RadioButton.Group
            vertical
            onChange={setEmbedType}
            currentValue={embedType}
          >
            <RadioButton value={VIZ} />
            {enableWhiteLabelEmbeding && <RadioButton value={WHITELABEL} />}
            {enablePreviewEmbeding && <RadioButton value={PREVIEW} />}
          </RadioButton.Group>
        </>
      )}
      <Spacer height={22} />
      <TextCopier text={html} />
    </>
  );
};
