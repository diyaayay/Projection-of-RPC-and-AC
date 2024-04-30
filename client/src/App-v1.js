import React, { useRef, useEffect } from 'react';
import { select, hierarchy, tree, linkHorizontal } from 'd3';

const TreeChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data) return;

    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const svg = select(svgRef.current);
    const { width, height } = svgRef.current.getBoundingClientRect();

    const root = hierarchy(data);
    const treeLayout = tree().size([height - margin.top - margin.bottom, width - margin.left - margin.right]);
    treeLayout(root);

    const nodes = root.descendants();

    const link = svg.selectAll('.link')
      .data(root.links())
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', linkHorizontal()
        .x(d => d.y)
        .y(d => d.x));

    const node = svg.selectAll('.node')
      .data(nodes)
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.y},${d.x})`);

    node.append('circle')
      .attr('r', 5);

    node.append('text')
      .attr('dy', '.31em')
      .attr('x', d => d.children ? -13 : 13)
      .style('text-anchor', d => d.children ? 'end' : 'start')
      .text(d => d.data.id);
  }, [data]);

  return <svg ref={svgRef} style={{width: "100%", height: "100%"}}></svg>;
};

const data2={
    "id": "root",
    "children": [
      {
        "id": "A",
        "children": [
          {
            "id": "A1"
          },
          {
            "id": "A2"
          }
        ]
      },
      {
        "id": "B",
        "children": [
          {
            "id": "B1"
          },
          {
            "id": "B2",
            "children": [
              {
                "id": "B2a"
              },
              {
                "id": "B2b"
              }
            ]
          }
        ]
      }
    ]
  };
  const data3={"id": "root",
  "children": [
      {"id": "1",
      "children": [
              {
                  "id": "7"
              },
              {
                "id": "8"
            }
          ]  
      },
      {"id": "2",
      "children": [
              { "id": "4",
              "children": [
                      {
                          "id": "5"
                      },
                      {
                          "id": "6"
                      }
                  ]
                 
              },
              { "id": "9",
              "children": [
                      {
                          "id": "5"
                      },
                      {
                          "id": "6"
                      }
                  ]
                 
              }
          ]
          
      }
  ]
  
};


const App = () => {
  const data = {
    "id": "root",
    "interval": "root",
    "startTime": "root",
    "type": "root",
    "children": [
      {
        "id": "1",
        "interval": "4",
        "startTime": "00:00",
        "type": "SNAPSHOT",
        "children": [
          {
            "id": "7",
            "interval": "168",
            "startTime": "00:00",
            "type": "BACKUP"
          }
        ]
      },
      {
        "id": "2",
        "interval": "24",
        "startTime": "00:00",
        "type": "SNAPSHOT",
        "children": [
          {
            "id": "4",
            "interval": "24",
            "startTime": "00:00",
            "type": "BACKUP",
            "children": [
              {
                "id": "5",
                "interval": "168",
                "startTime": "00:00",
                "type": "CLOUD_BACKUP"
              },
              {
                "id": "6",
                "interval": "720",
                "startTime": "00:00",
                "type": "CLOUD_BACKUP"
              }
            ]
          }
        ]
      }
    ]
};
  
  return (
    <div style={{width: "100vw", height: "100vh"}}>
      <h1>Sampling</h1>
      <TreeChart data={data3} />
    </div>
  );
};

export default App;
