import React, { useState, useEffect } from 'react';
import { NavBar } from '../../NavBar';
import { Wrapper, Content } from '../styles';
import { Stats } from './styles';

export const VizHubStatsPage = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const getData = async () => {
      const eventIDs = [
        'event.pageview',
        'event.pageview.home',
        'event.pageview.viz',
      ];
      const response = await fetch('/api/event/get', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventIDs }),
      });
      setData(await response.json());
    };
    getData();
  }, []);

  return (
    <>
      <NavBar />
      <Wrapper>
        <Content>
          <Stats>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </Stats>
        </Content>
      </Wrapper>
    </>
  );
};
