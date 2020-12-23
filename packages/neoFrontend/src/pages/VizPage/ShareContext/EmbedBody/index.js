import React, { useState, useMemo, useContext } from 'react';
import { useLocation } from 'react-router';
import { getVizTitle, vizWidth, getVizHeight } from 'vizhub-presenters';
import {
  enableWhiteLabelEmbeding,
  enablePreviewEmbeding,
} from '../../../../featureFlags';
import { domain } from '../../../../constants';
import { isMobile } from '../../../../mobileMods';
import { useValue } from '../../../../useValue';
import { VizContext } from '../../VizContext';
import { SubSectionDescription, FormRow, DescriptionRow } from '../../styles';
import { RadioButton } from '../../RadioButton';
import { Input } from '../../../../Input';
import { TextCopier } from '../TextCopier';
import { IFrame } from '../styles';

const VIZ = 'Embed visualization';
const WHITELABEL = 'Embed white-label visualization';
const PREVIEW = 'Embed visualization preview';

// This is the default used by YouTube for their embeds.
const defaultEmbedWidth = 560;

export const EmbedBody = () => {
  const { pathname } = useLocation();
  const { viz$ } = useContext(VizContext);
  const [embedType, setEmbedType] = useState(VIZ);
  const title = useValue(viz$, getVizTitle);

  const vizHeight = useValue(viz$, getVizHeight);
  const [width, setWidth] = useState(defaultEmbedWidth);
  const height = useMemo(() => Math.round((width * vizHeight) / vizWidth), [
    width,
    vizHeight,
  ]);

  const src = useMemo(() => `${domain}${pathname}?mode=embed`, [pathname]);

  const html = useMemo(
    () =>
      [
        '<iframe',
        `width="${width}"`,
        `height="${height}"`,
        `src="${src}"`,
        `title="${title}"`,
        'frameborder="0"',
        '></iframe>',
      ].join(' '),
    [src, title, width, height]
  );

  const previewHeight = isMobile ? 162 : 300;
  const previewWidth = (vizWidth / vizHeight) * previewHeight;

  const hasSettings = enableWhiteLabelEmbeding || enablePreviewEmbeding;
  return (
    <>
      <SubSectionDescription>Embed preview</SubSectionDescription>
      <IFrame
        frameBorder="0"
        width={previewWidth}
        height={previewHeight}
        title={title}
        src={src}
      />
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
      <DescriptionRow>Width</DescriptionRow>
      <FormRow>
        <Input value={width} onChange={setWidth} size="grow" />
      </FormRow>
      <SubSectionDescription>Embed snippet</SubSectionDescription>
      <TextCopier text={html} />
    </>
  );
};
