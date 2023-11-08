import React, { useEffect } from 'react';
import { DataSet, Network } from 'vis-network/standalone/umd/vis-network.min';
import 'vis-network/styles/vis-network.css';
import { useContext } from 'react';
import { Context } from '../contexts/context.js';

function NodeTree() {
  const { offTopic, setOffTopic } = useContext(Context);
  const toggleOffTopic = () => {
    setOffTopic(!offTopic); // 切换 offTopic 的值
  };
  useEffect(() => {
    // Create some nodes
    var nodesData = [];
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 10; j++)
        // Assign a group number (1 to 5)
        nodesData.push({
          id: i * 10 + j,
          label: `Node ${i * 10 + j}`,
          group: i * 10,
        });
    }

    var nodes = new DataSet(nodesData);

    // Create some edges
    var edgesData = [];
    for (let i = 0; i < 5; i++) {
      for (let j = 1; j < 10; j++)
        edgesData.push({ from: i * 10 + j, to: i * 10 });
    }
    var edges = new DataSet(edgesData);

    // Create a network
    var container = document.getElementById('mynetwork');
    var data = {
      nodes: nodes,
      edges: edges,
    };
    var options = {
      nodes: {
        shape: 'dot',
        size: 16,
      },
      physics: {
        forceAtlas2Based: {
          gravitationalConstant: -26,
          centralGravity: 0.005,
          springLength: 230,
          springConstant: 0.18,
        },
        maxVelocity: 146,
        solver: 'forceAtlas2Based',
        timestep: 0.35,
        stabilization: { iterations: 150 },
      },
    };
    var network = new Network(container, data, options);

    // Clean up when the component unmounts
    return () => {
      network.destroy();
    };
  }, []);

  return (
    <div className="static h-screen">
      <div id="mynetwork" className="absolute top-0 h-full" />
      <div className="absolute grid top-0 left-0 grid-flow-col">
        <button className="btn btn-outline btn-error" onClick={toggleOffTopic}>
          離題警示
        </button>
        <button
          className="btn btn-outline btn-warning"
          onClick={toggleOffTopic}
        >
          離題警示
        </button>
        {offTopic && (
          <div className="alert alert-error ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div>
              <h3 className="font-bold">離題警示</h3>
              <div className="text-xs">
                你們的討論已經離題囉，請專注在該討論的主題上！
              </div>
            </div>
            <div>
              <button
                className="btn btn-sm btn-primary"
                onClick={toggleOffTopic}
              >
                收到
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NodeTree;
