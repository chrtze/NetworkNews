import { useCallback, useState, useContext } from 'react';
import ReactFlow, { 
  useNodesState, 
  useEdgesState, 
  addEdge, 
  Controls, 
  Background, 
  ConnectionLineType,
  useReactFlow,
  ReactFlowProvider,
  useUpdateNodeInternals
} from 'reactflow';
import styled, { ThemeProvider } from 'styled-components';

import dagre from 'dagre';
import { Outlet } from "@remix-run/react";

import CustomNode from './topics/CustomNode';
import { initialNodes } from './topics/nodes';
import { initialEdges } from './topics/edges'

import { darkTheme, lightTheme } from '~/styles/DLTheme';
import reactFlowStyles from 'reactflow/dist/style.css';
import styles from '~/styles/flow.css';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

function UpdateNode(nodeID) {
  const updateNodeInternals = useUpdateNodeInternals();

  updateNodeInternals(nodeID);
}

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
    console.log(node.id);

    return node;
  });

  return { nodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
);

const ReactFlowStyled = styled(ReactFlow)`
  background-color: ${(props) => props.theme.bg};
`;

const ControlsStyled = styled(Controls)`
  button {
    background-color: ${(props) => props.theme.controlsBg};
    color: ${(props) => props.theme.controlsColor};
    border-bottom: 1px solid ${(props) => props.theme.controlsBorder};

    &:hover {
      background-color: ${(props) => props.theme.controlsBgHover};
    }

    path {
      fill: currentColor;
    }
  }
`;

export async function onNodeClick(event, node) {
  console.log('click node', event, node);
}

const nodeTypes = {
  custom: CustomNode,
};

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [mode, setMode] = useState('dark');
  const theme = mode === 'light' ? lightTheme : darkTheme;

  const toggleMode = () => {
    setMode((m) => (m === 'light' ? 'dark' : 'light'));
  };

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
    <ThemeProvider theme={theme}>
    <ReactFlowStyled
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
    <div className="controls">
      <button onClick={() => toggleMode()} className='rounded-md bg-zinc-600 text-sky-600 font-extrabold'> Change Mode </button>
      <button onClick={() => onLayout('TB')} className='rounded-md  bg-zinc-600 text-sky-600 font-extrabold'>vertical layout</button>
      <button onClick={() => onLayout('LR')} className='rounded-md  bg-zinc-600 text-sky-600 font-extrabold'>horizontal layout</button>
    </div>
    <ControlsStyled />
    <Background gap={16} />
  </ReactFlowStyled>
  </ThemeProvider>
  );
}

export default function Topics() {
  return (
  <div className="app flex flex-row">
    <div className="layoutflow">
    <ReactFlowProvider>
        <Flow/>
      </ReactFlowProvider>
    </div>
    <div className='basis-1/6 bg-zinc-800'>
      <Outlet/>
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