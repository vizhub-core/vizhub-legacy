import React, { useEffect } from 'react';
import { sendEvent } from '../../sendEvent';
import { NavBar } from '../../NavBar';
import { Wrapper, Content } from '../styles';
import { Entries, Entry, EntryTitle, PageTitle, PlayListTitle } from './styles';
import { data } from './data';

const id = (youTubeURL) => {
  const startIndex = youTubeURL.indexOf('v=');
  return youTubeURL.substring(startIndex + 2, startIndex + 13);
};

const imgSrc = (id) => `https://img.youtube.com/vi/${id}/mqdefault.jpg`;

export const Datavis2020Page = () => {
  useEffect(() => {
    sendEvent('event.pageview.datavis-2020');
  }, []);

  return (
    <Wrapper>
      <Content>
        <NavBar />
        <PageTitle>Datavis 2020</PageTitle>
        <PlayListTitle>
          <p class="has-small-font-size">
            <a
              rel="noreferrer noopener"
              href="https://www.youtube.com/watch?v=30lR5BlcO48&amp;list=PL9yYRbwpkykuK6LSMLH3bAaPpXaDUXcLV"
              target="_blank"
            >
              YouTube Playlist
            </a>
            {' | '}
            <a
              rel="noreferrer noopener"
              href="https://drive.google.com/drive/folders/1DYYRUq_-QSbDI62Y1xCxawrQeBv9b_dA?usp=sharing"
              target="_blank"
            >
              Slides in Google Drive
            </a>
          </p>
        </PlayListTitle>
        <Entries>
          {data.map(({ title, blogPostURL, startingVizURL, youTubeURL }) => (
            <Entry href={blogPostURL ? blogPostURL : youTubeURL}>
              <EntryTitle>{title}</EntryTitle>
              {youTubeURL ? (
                <img width="100%" src={imgSrc(id(youTubeURL))} alt={title} />
              ) : null}
            </Entry>
          ))}
        </Entries>
      </Content>
    </Wrapper>
  );
};
