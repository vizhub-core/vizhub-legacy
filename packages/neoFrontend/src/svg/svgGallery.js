import React from 'react';
import { LogoSVG } from './LogoSVG';
import { ForkSVG } from './ForkSVG';
import { CloseSVG } from './CloseSVG';
import { PullSVG } from './PullSVG';
import { SettingsSVG } from './SettingsSVG';
import { ShareSVG } from './ShareSVG';
import { ArrowLeftSVG } from './ArrowLeftSVG';
import { ArrowRightSVG } from './ArrowRightSVG';

export const SVGGallery = () => (
  <>
    <LogoSVG height={40} />
    <ForkSVG height={40} />
    <ArrowLeftSVG height={40} />
    <ArrowRightSVG height={40} />
    <CloseSVG height={40} />
    <PullSVG height={40} />
    <SettingsSVG height={40} />
    <ShareSVG height={40} />
  </>
);
