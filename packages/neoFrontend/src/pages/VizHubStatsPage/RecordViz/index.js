import React from 'react';
import { utcDay } from 'd3-time';
import { utcFormat } from 'd3-time-format';
import { scaleUtc, scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import { area, curveStep } from 'd3-shape';
import { Wrapper, SVG } from './styles';

const width = 400;
const height = 90;
const maxEntries = 90;

const Chart = ({ timeseries, interval, format, maxValue }) => {
  const now = new Date();
  const endDate = interval.floor(now);
  const startDate = interval.offset(now, -maxEntries);
  const dates = interval.range(startDate, endDate);
  const data = dates.map((date) => ({
    date,
    value: timeseries[format(date)] || 0,
  }));
  const xScale = scaleUtc(extent(dates), [0, width]);
  const yScale = scaleLinear([0, maxValue], [height, 0]);
  const areaGenerator = area()
    .x((d) => xScale(d.date))
    .y1((d) => yScale(d.value))
    .y0(yScale(0))
    .curve(curveStep);
  return (
    <SVG width={width} height={height}>
      <path d={areaGenerator(data)} />
    </SVG>
  );
};

export const RecordViz = ({ record, maxValue }) => {
  return (
    <Wrapper>
      <div>
        {record.id} ({record.all.all})
      </div>
      <Chart
        timeseries={record.days}
        interval={utcDay}
        format={utcFormat('%Y-%m-%d')}
        maxValue={maxValue}
      />
    </Wrapper>
  );
};
