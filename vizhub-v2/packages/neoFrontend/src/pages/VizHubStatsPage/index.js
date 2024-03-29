import React, { useState, useEffect, useMemo } from 'react';
import { utcFormat } from 'd3-time-format';
import { utcHour } from 'd3-time';
import { max } from 'd3-array';
import { sendEvent } from '../../sendEvent';
import { NavBar } from '../../NavBar';
import { Wrapper, Content } from '../styles';
import { Stats } from './styles';

//const interval = {
//  recordKey: 'days',
//  d3TimeInterval: utcDay,
//  format: utcFormat('%Y-%m-%d'),
//};
const interval = {
  recordKey: 'hours',
  d3TimeInterval: utcHour,
  format: utcFormat('%Y-%m-%dT%H'),
};

export const VizHubStatsPage = () => {
  const [data, setData] = useState();
  const [RecordViz, setRecordViz] = useState();

  // Lazy load RecordViz because it's the only thing
  // in the VizHub codebase that uses many KBs of D3 modules.
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
        'event.pageview.home',
        'event.pageview.viz',
        'event.pageview.profile',
        'event.pageview.forks',
        'event.pageview.pricing',
        'event.pageview.create-viz',
        'event.pageview.stats',
        'event.pageview.search',
        'event.pageview.datavis-2020',
        'event.pageview.contact',
        'event.pageview.terms',
        'event.interaction.viz.fork',
        'event.interaction.viz.delete',
        'event.interaction.viz.upvote',
        'event.interaction.viz.undo-upvote',
      ];
      const response = await fetch('/api/event/get', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventIDs }),
      });
      const data = await response.json();
      const lookup = {};
      for (const record of data) {
        lookup[record.id] = record;
      }
      const sortedData = eventIDs.map((id) => lookup[id]).filter(Boolean);
      setData(sortedData);
    };
    getData();
  }, []);

  // Use the max value across events, so that the Y scale
  // for all charts is the same.
  const maxValue = useMemo(
    () =>
      data
        ? max(data, (record) => max(Object.values(record[interval.recordKey])))
        : 0,
    [data]
  );

  return (
    <>
      <NavBar />
      <Wrapper>
        <Content>
          Last 90 hours:
          <Stats>
            {data && RecordViz
              ? data.map((record) => {
                  return (
                    <RecordViz
                      key={record.id}
                      record={record}
                      maxValue={maxValue}
                      interval={interval}
                    />
                  );
                })
              : null}
          </Stats>
        </Content>
      </Wrapper>
    </>
  );
};
