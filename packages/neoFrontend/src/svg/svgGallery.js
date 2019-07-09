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
    <ForkSVG />
    <ArrowLeftSVG />
    <ArrowRightSVG />
    <CloseSVG />
    <PullSVG />
    <SettingsSVG />
    <ShareSVG />
  </>
);
