import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const HierarchyChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data) return;

    const width = 600;
    const height = 400;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(50, 50)');

    const root = d3.hierarchy(data);

    const treeLayout = d3.tree().size([width - 100, height - 100]);
    const treeData = treeLayout(root);

    const links = svg.selectAll('.link')
      .data(treeData.links())
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', d3.linkHorizontal()
        .x(d => d.y)
        .y(d => d.x));

    const nodes = svg.selectAll('.node')
      .data(treeData.descendants())
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.y},${d.x})`);

    nodes.append('circle')
      .attr('r', 5);

    nodes.append('text')
      .attr('x', 13)
      .attr('y', 5)
      .text(d => d.data.id);
  }, [data]);

  return (
    <svg ref={svgRef}></svg>
  );
};

const App = () => {
  const data = {
    "id": "root",
    "children": [
      {
        "id": "1",
        "children": [
          { "id": "7" }
        ]
      },
      {
        "id": "2",
        "children": [
          {
            "id": "4",
            "children": [
              { "id": "5" },
              { "id": "6" }
            ]
          }
        ]
      }
    ]
  };

  return (
    <div>
      <h1>Hierarchy Chart</h1>
      <HierarchyChart data={data} />
    </div>
  );
};

export default App;
