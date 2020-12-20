import React, { useState, useEffect } from 'react';
import { sendEvent } from '../../sendEvent';
import { NavBar } from '../../NavBar';
import { Wrapper, Content } from '../styles';
import { Stats } from './styles';

export const VizHubStatsPage = () => {
  const [data, setData] = useState();
  const [RecordViz, setRecordViz] = useState();

  useEffect(() => {
    import('./RecordViz').then((module) => {
      setRecordViz(() => module.RecordViz);
    });
  }, []);

  useEffect(() => {
    sendEvent('event.pageview.stats');
  }, []);

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
            {data && RecordViz
              ? data.map((record) => {
                  return <RecordViz key={record.id} record={record} />;
                })
              : null}
          </Stats>
        </Content>
      </Wrapper>
    </>
  );
};
