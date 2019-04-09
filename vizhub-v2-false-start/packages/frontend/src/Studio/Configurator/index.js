import React, { useContext } from 'react';
import { VizContext, URLStateContext } from '../../contexts';
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
  const { activeFileId, selectFile, toggleConfigurator } = useContext(
    URLStateContext
  );
  const { vizData } = useContext(VizContext);

  // Preload code font and CodeMirror JS,
  // so the user doesn't need to wait for these to load when they open a file.
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
        <FilesSection
          vizData={vizData}
          activeFileId={activeFileId}
          selectFile={selectFile}
        />
        <SettingsSection />
        <PreferencesSection />
      </Body>
    </Wrapper>
  );
};
