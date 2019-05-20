import {
  select,
  json,
  tree,
  zoom,
  event,
  stratify
} from 'd3';

const svg = select('svg');
const width = document.body.clientWidth;
const height = document.body.clientHeight;

const margin = { top: 0, right: 50, bottom: 0, left: 75};
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const scale = 1/32;
const thumbnailWidth = 960 * scale;
const thumbnailHeight = 500 * scale;
const nodeWidth = thumbnailWidth * 1.5;
const nodeHeight = thumbnailHeight;
const treeLayout = tree()
  .nodeSize([nodeHeight, nodeWidth])
  .separation(() => 1.2);

const zoomG = svg
    .attr('width', width)
    .attr('height', height)
  .append('g');

const g = zoomG.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

svg.call(zoom().on('zoom', () => {
  zoomG.attr('transform', event.transform);
}));

const buildHierarchy = data => {
  const ids = {};// '-99': true};
  
  data.forEach(d => {
    ids[d.id] = true;
  });
  data.forEach(d => {
    d.forkedFrom = ids[d.forkedFrom]
      ? d.forkedFrom
      : '-99';
  });
  data.push({id: '-99'});
  
  return stratify()
    .id(d => d.id)
    .parentId(d => d.forkedFrom)
    (data);
};

const imageURL = id => `https://vizhub.com/api/visualization/thumbnail/${id}.png`;

//json('https://vizhub.com/api/visualization/metadata')
json('metadata.json')
  .then(data => {
    const root = buildHierarchy(data);
    const links = treeLayout(root).links();
  
    g.selectAll('path').data(links)
      .enter().append('line')
        .attr('x1', d => d.source.y + thumbnailWidth / 2)
        .attr('x2', d => d.target.y - thumbnailWidth / 2)
        .attr('y1', d => d.source.x)
        .attr('y2', d => d.target.x);
    g.selectAll('image').data(root.descendants())
      .enter().append('image')
        .attr('x', d => d.y - thumbnailWidth / 2)
        .attr('y', d => d.x - thumbnailHeight / 2)
        .attr('width', thumbnailWidth)
        .attr('href', (d, i) => imageURL(d.id))
  });
