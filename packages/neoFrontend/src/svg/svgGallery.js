import React from 'react';
import { LogoSVG } from './LogoSVG';
import { ForkSVG } from './ForkSVG';
import { CloseSVG } from './CloseSVG';
import { PullSVG } from './PullSVG';
import { SettingsSVG } from './SettingsSVG';
import { ShareSVG } from './ShareSVG';
import { ArrowLeftSVG } from './ArrowLeftSVG';
import { ArrowRightSVG } from './ArrowRightSVG';
import { VoteSVG } from './VoteSVG';
import { SpinnerSVG } from './SpinnerSVG';

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
    <VoteSVG />
    <VoteSVG down={true} />
    <SpinnerSVG />
  </>
);

//full.svg
//mini.svg
//split.svg
//up-vote.svg
