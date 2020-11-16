import React, { useState, useMemo, useContext, useCallback } from 'react';
import { useLocation } from 'react-router';
import { getVizTitle, getVizFiles, getFile } from 'vizhub-presenters';
import { VizLinkBuilder } from '../../../../utils/viz';
import { isMobile } from '../../../../mobileMods';
import { useValue } from '../../../../useValue';
import { Input, Autocomplete } from '../../../../Input';
import { VizContext } from '../../VizContext';
import { URLStateContext } from '../../URLStateContext';
import { modes } from '../../URLStateContext/modes';
import { SubSectionDescription, Spacer, FormRow } from '../../styles';
import { TextCopier } from '../TextCopier';
import { Preview } from './styles';

const iframeDefaultProps = {
  height: isMobile ? 162 : 300,
};

export const SnippetBody = () => {
  const { pathname } = useLocation();
  const { viz$ } = useContext(VizContext);
  const { activeFile = 'index.html', selectedLines } = useContext(
    URLStateContext
  );
  const title = useValue(viz$, getVizTitle);
  const files = useValue(viz$, getVizFiles);

  const [file, setFile] = useState(activeFile);
  const [suggestedFile, setSuggestedFile] = useState(activeFile);
  const [fileSuggestions, setFileSuggestions] = useState([]);

  const allPossibleFileSuggestions = useMemo(() => {
    return files.map((file) => ({ id: file.name, value: file.name }));
  }, [files]);

  const handleFileSuggestionChange = useCallback(
    (fileName) => {
      setFileSuggestions(
        allPossibleFileSuggestions.filter(({ value: name }) =>
          name.toLowerCase().includes(fileName.toLowerCase())
        )
      );
      setSuggestedFile(fileName);
    },
    [allPossibleFileSuggestions, setFileSuggestions]
  );

  const handleFileSelect = useCallback(
    (fileName) => {
      setFile(fileName);
      setSuggestedFile(fileName);
      setFileSuggestions([]);
    },
    [setFile, setSuggestedFile]
  );

  const [highlight, setHighlight] = useState(selectedLines);
  const [height, setHeight] = useState(iframeDefaultProps.height);

  const fileExists = Boolean(getFile(files, suggestedFile));

  const vizLinkBuilder = useMemo(() => {
    return VizLinkBuilder(pathname);
  }, [pathname]);

  const src = useMemo(() => {
    if (file) {
      return vizLinkBuilder
        .setMode(modes.snippet)
        .setFile(file)
        .setLines(highlight)
        .get();
    }

    return '';
  }, [vizLinkBuilder, highlight, file]);

  const html = useMemo(() => {
    return `<iframe src="${src}" title="${title}" height="${height}"></iframe>`;
  }, [src, title, height]);

  return (
    <>
      <Preview height={height} title={title} src={src} />
      <form>
        <SubSectionDescription>Snippet settings</SubSectionDescription>

        <FormRow>Choose which file to embed code from *(requried)</FormRow>
        <FormRow>
          <Autocomplete
            value={suggestedFile}
            items={fileSuggestions}
            onChange={handleFileSuggestionChange}
            onSelect={handleFileSelect}
            size="grow"
          />
        </FormRow>

        <FormRow>Highlight specific lines of code</FormRow>
        <FormRow>
          <Input
            value={highlight}
            onChange={setHighlight}
            size="grow"
            placeholder="e.g '14' for a single line, 14,15,16, 14-16 or 14,15-17 for multiple"
          />
        </FormRow>

        <FormRow>Control iframe height</FormRow>
        <FormRow>
          <Input value={height} onChange={setHeight} size="grow" />
        </FormRow>
      </form>
      <Spacer height={22} />
      {fileExists && <TextCopier text={html} />}
    </>
  );
};
