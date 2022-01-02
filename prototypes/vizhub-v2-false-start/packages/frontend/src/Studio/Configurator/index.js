import React, { useContext } from 'react';
import { URLStateContext } from '../../contexts';
import { ArrowBackSVG } from '../../svg';
import { useCodeMirror } from '../Editor/useCodeMirror';
import { Wrapper, Header, HeaderIcon, HeaderTitle, Body } from './styles';
import { usePreloadFont } from './usePreloadFont';

import {
  StateSection,
  FilesSection,
  SettingsSection,
  PreferencesSection
} from './sections';

export const Configurator = ({ preloadFontFamily }) => {
  const { toggleConfigurator } = useContext(URLStateContext);

  // Preload code font and CodeMirror JS,
  // so the user doesn't need to wait for these
  // to load when they open a file.
  usePreloadFont(preloadFontFamily);
  useCodeMirror();

  return (
    <Wrapper>
      <Header onClick={toggleConfigurator}>
        <HeaderIcon>
          <ArrowBackSVG fill={'white'} />
        </HeaderIcon>
        <HeaderTitle>Configurator</HeaderTitle>
      </Header>
      <Body>
        <StateSection />
        <FilesSection />
        <SettingsSection />
        <PreferencesSection />
      </Body>
    </Wrapper>
  );
};
