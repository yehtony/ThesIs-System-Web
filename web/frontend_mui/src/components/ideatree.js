import React, { useEffect } from 'react';
import { DataSet, Network } from 'vis-network/standalone/umd/vis-network.min';
import 'vis-network/styles/vis-network.css';
import { useContext } from 'react';
import { Context } from '../contexts/context.js';
import ChatBot from './chatbot.js';
import ChatBotNew from './chatbotnew.js'
// import img_idea from './img/soft-scraps-icons/idea.png';
// import img_info from './img/soft-scraps-icons/info.png';
// import img_question from './img/soft-scraps-icons/idea.png';
// import img_experiment from './img/soft-scraps-icons/idea.png';
// import img_record from './img/soft-scraps-icons/idea.png';

export default function NodeTree() {
  const { offTopic, setOffTopic } = useContext(Context);
  const toggleOffTopic = () => {
    setOffTopic(!offTopic); // 切换 offTopic 的值
  };
  useEffect(() => {
    var network = null;
    const draw = () => {
      // // Create some nodes
      var nodesData = [];
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 7; j++)
          // Assign a group number (1 to 5)
          nodesData.push({
            id: i * 7 + j,
            // label: `Node ${i * 7 + j}`,
            label: `Node ${i * 7 + j}\nThis node has a fixed width`,
            group: i,
          });
      }

      var nodes = new DataSet(nodesData);

      // Create some edges
      var edgesData = [];
      for (let i = 0; i < 5; i++) {
        for (let j = 1; j < 3; j++)
          edgesData.push({ from: i * 7 + j, to: i * 7 });
      }
      for (let i = 0; i < 5; i++) {
        for (let j = 1; j < 3; j++)
          for (let k = 1; k < 3; k++)
            edgesData.push({ from: i * 7 + j * 2 + k, to: i * 7 + j });
      }
      var edges = new DataSet(edgesData);

      // Create a network
      var container = document.getElementById('mynetwork');
      var data = {
        nodes: nodes,
        edges: edges,
      };
      // var options = {
      //   nodes: {
      //     shape: 'dot',
      //     size: 16,
      //   },
      //   physics: {
      //     forceAtlas2Based: {
      //       gravitationalConstant: -26,
      //       centralGravity: 0.005,
      //       springLength: 230,
      //       springConstant: 0.18,
      //     },
      //     maxVelocity: 146,
      //     solver: 'forceAtlas2Based',
      //     timestep: 0.35,
      //     stabilization: { iterations: 150 },
      //   },
      // };
      // nodes = [
      //   { id: 1, shape: 'image', image: img_idea },
      //   { id: 2, shape: 'image', image: '2.png' },
      //   { id: 3, shape: 'image', image: '3.png' },
      //   {
      //     id: 4,
      //     shape: 'image',
      //     image: '4.png',
      //     label: 'pictures by this guy!',
      //   },
      //   { id: 5, shape: 'image', image: '5.png' },
      //   { id: 6, shape: 'image', image: '6.png' },
      //   { id: 7, shape: 'image', image: '7.png' },
      //   { id: 8, shape: 'image', image: '8.png' },
      //   { id: 9, shape: 'image', image: '9.png' },
      //   { id: 10, shape: 'image', image: '10.png' },
      //   { id: 11, shape: 'image', image: '11.png' },
      //   { id: 12, shape: 'image', image: '12.png' },
      //   { id: 13, shape: 'image', image: '13.png' },
      //   { id: 14, shape: 'image', image: '14.png' },
      //   {
      //     id: 15,
      //     shape: 'image',
      //     image: 'missing.png',
      //     brokenImage: 'missingBrokenImage.png',
      //     label: 'when images\nfail\nto load',
      //   },
      //   {
      //     id: 16,
      //     shape: 'image',
      //     image: 'anotherMissing.png',
      //     brokenImage: '9.png',
      //     label: 'fallback image in action',
      //   },
      // ];

      // // create connections between people
      // // value corresponds with the amount of contact between two people
      // edges = [
      //   { from: 1, to: 2 },
      //   { from: 2, to: 3 },
      //   { from: 2, to: 4 },
      //   { from: 4, to: 5 },
      //   { from: 4, to: 10 },
      //   { from: 4, to: 6 },
      //   { from: 6, to: 7 },
      //   { from: 7, to: 8 },
      //   { from: 8, to: 9 },
      //   { from: 8, to: 10 },
      //   { from: 10, to: 11 },
      //   { from: 11, to: 12 },
      //   { from: 12, to: 13 },
      //   { from: 13, to: 14 },
      //   { from: 9, to: 16 },
      // ];

      // // create a network
      // var container = document.getElementById('mynetwork');
      // var data = {
      //   nodes: nodes,
      //   edges: edges,
      // };
      var options = {
        nodes: {
          shape: 'box',
          borderWidth: 2,
          size: 40,
          // color: {
          //   // border: '#406897',
          //   // background: '#6AAFFF',
          // },
          font: { color: '#eeeeee' },
          // shapeProperties: {
          //   useBorderWithImage: true,
          // },
          // image: img_idea,
          // label: 'imagePadding{2,10,8,20}+size',
          imagePadding: { right: 60, bottom: 60 },
          color: {
            // border: 'green',
            // background: 'yellow',
            highlight: { border: 'yellow', background: 'green' },
            hover: { border: 'orange', background: 'grey' },
          },
        },
        edges: {
          color: 'black',
          arrows: 'to',
        },
        physics: {
          forceAtlas2Based: {
            gravitationalConstant: -26,
            centralGravity: 0.002,
            springLength: 180,
            springConstant: 0.18,
          },
          maxVelocity: 146,
          solver: 'forceAtlas2Based',
          timestep: 0.35,
          stabilization: { iterations: 150 },
        },
        layout: {
          // hierarchical: {
          //   direction: 'DU',
          //   sortMethod: "directed",
          // },
          // smooth: true,
          // arrows: "to",
        },
      };

      network = new Network(container, data, options);
    };

    window.addEventListener('load', draw);

    // Called when the component is unmounted
    return () => {
      window.removeEventListener('load', draw);
      if (network) {
        network.destroy();
      }
    };
  }, []);

  return (
    <div className="h-screen static">
      <div id="mynetwork" className='h-screen'/>
      <div className="absolute top-0 right-0">
        <ChatBotNew />
      </div>
      {/* <div className="absolute top-0 right-0">
          <ChatBot />
        </div> */}
      {/* <div className="absolute grid top-0 left-0 grid-flow-col">
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
      </div> */}
    </div>
  );
}
