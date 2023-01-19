import { useCallback } from 'react';
import ReactFlow, { 
  useNodesState, 
  useEdgesState, 
  addEdge, 
  Controls, 
  Background, 
  ConnectionLineType,
  useReactFlow,
  ReactFlowProvider,
  Panel
} from 'reactflow';

import type { Connection, Node, Edge } from 'reactflow';
import dagre from 'dagre';
import { Outlet } from "@remix-run/react";


import CustomNode from './CustomNode';
import { initialNodes } from './nodes';
import { initialEdges } from './edges'

import reactFlowStyles from 'reactflow/dist/style.css';
import styles from '~/styles/flow.css';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));


const getLayoutedElements = (nodes, edges, direction = 'LR') => {
  const isVertical = direction === 'TB';
  const nodeWidth = isVertical ? 110 : 200;
  const nodeHeight = isVertical ? 60: 20;
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isVertical ? 'top' : 'left';
    node.sourcePosition = isVertical ? 'bottom' : 'right';

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
);

export async function onNodeClick(event, node) {
  console.log('click node', event, node);
}

const nodeTypes = {
  custom: CustomNode,
};

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, type: ConnectionLineType.SmoothStep, animated: true }, eds)
      ),
    []
  );

  const { setViewport } = useReactFlow();

  const onLayout = useCallback(
    (direction) => { const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes,edges,direction);
      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
      const isVertical = direction === 'TB';
      isVertical ? setViewport({ x: -200, y: 300, zoom: 0.7 }, { duration: 1100 }) : setViewport({ x: 300, y: 50, zoom: 0.6 }, { duration: 1100 });
    }, [nodes, edges]);

  return (
  <ReactFlow
  nodes={nodes}
  onNodesChange={onNodesChange}
  edges={edges}
  onEdgesChange={onEdgesChange}
  onConnect={onConnect}
  nodeTypes={nodeTypes}
  onNodeClick= { onNodeClick }
  nodesDraggable={false}
  fitView
  >
  {/* <Panel position="top-left" className='basis-1'>
    <div className="rounded-lg m-1 border-dotted border-2 border-sky-500 text-3xl text-center font-extrabold bg-zinc-800">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-violet-500">
          How can i help?
        </span>
    </div>
    <div className="rounded-lg m-1 border-dotted border-2 border-sky-500 text-3xl text-center font-extrabold bg-zinc-800">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-violet-500">
        </span>
    </div>
  </Panel> */}
  <div className="controls">
    <button onClick={() => onLayout('TB')}>vertical layout</button>
    <button onClick={() => onLayout('LR')}>horizontal layout</button>
  </div>
  <Controls />
  <Background gap={16} />
</ReactFlow>
  );
}

export default function Graph() {
  return (
  <div className="app flex flex-row">
    <div className="layoutflow">
      <ReactFlowProvider>
        <Flow/>
      </ReactFlowProvider>
    </div>
    <div className='basis-1/6 bg-zinc-800'>
      <Outlet />
    </div>
  </div>
  );
}

export function links() {
  return [
    { rel: 'stylesheet', href: reactFlowStyles },
    { rel: 'stylesheet', href: styles },
  ];
}