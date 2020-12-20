import React, { useState, useEffect } from 'react';
import { utcDay } from 'd3-time';
import { utcFormat } from 'd3-time-format';
import { scaleUtc, scaleLinear } from 'd3-scale';
import { extent, max } from 'd3-array';
import { area } from 'd3-shape';
import { sendEvent } from '../../sendEvent';
import { NavBar } from '../../NavBar';
import { Wrapper, Content } from '../styles';
import { Stats } from './styles';

const width = 300;
const height = 100;
const maxEntries = 90;

const Chart = ({ timeseries, interval, format }) => {
  const now = new Date();
  const endDate = interval.floor(now);
  const startDate = interval.offset(now, -maxEntries);
  const dates = interval.range(startDate, endDate);
  const data = dates.map((date) => ({
    date,
    value: timeseries[format(date)] || 0,
  }));
  const xScale = scaleUtc(extent(dates), [0, width]);
  const yScale = scaleLinear([0, max(data, (d) => d.value)], [height, 0]);
  const areaGenerator = area()
    .x((d) => xScale(d.date))
    .y1((d) => yScale(d.value))
    .y0(yScale(0));
  return (
    <svg width={width} height={height}>
      <path d={areaGenerator(data)} />
    </svg>
  );
};

const RecordViz = ({ record }) => {
  return (
    <div>
      <div>{record.id}</div>
      <Chart
        timeseries={record.days}
        interval={utcDay}
        format={utcFormat('%Y-%m-%d')}
      />
    </div>
  );
};

export const VizHubStatsPage = () => {
  const [data, setData] = useState();

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
            {data
              ? data.map((record) => (
                  <RecordViz key={record.id} record={record} />
                ))
              : null}
          </Stats>
        </Content>
      </Wrapper>
    </>
  );
};
