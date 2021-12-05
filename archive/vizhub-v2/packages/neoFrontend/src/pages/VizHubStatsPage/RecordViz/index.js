import React from 'react';
import { scaleUtc, scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import { area, curveStep } from 'd3-shape';
import { Wrapper, SVG } from './styles';

const width = 900;
const height = 100;
const maxEntries = 90;

const Chart = ({ timeseries, maxValue, format, d3TimeInterval }) => {
  const now = new Date();
  const endDate = d3TimeInterval.ceil(now);
  const startDate = d3TimeInterval.offset(now, -maxEntries);
  const dates = d3TimeInterval.range(startDate, endDate);
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

export const RecordViz = ({ record, maxValue, interval }) => {
  const { format, recordKey, d3TimeInterval } = interval;
  const timeseries = record[recordKey];

  return (
    <Wrapper>
      <div>
        {record.id} ({record.all.all})
      </div>
      <Chart
        timeseries={timeseries}
        maxValue={maxValue}
        format={format}
        d3TimeInterval={d3TimeInterval}
      />
    </Wrapper>
  );
};
