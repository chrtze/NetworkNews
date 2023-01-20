import React, { useCallback, MouseEvent, useState } from 'react';
import ReactFlow, {
  Background,
  Panel,
  ProOptions,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  useReactFlow,
  NodeOrigin,
  NodeMouseHandler,
  addEdge,
  OnConnect,
  Controls
} from 'reactflow';
import 'reactflow/dist/style.css';

import useForceLayout from './useForceLayout';
import { initialNodes, initialEdges } from './initialElements';

// import styles from '~/styles/forceLayout.css';

const proOptions: ProOptions = { account: 'paid-pro', hideAttribution: true };

type ExampleProps = {
  strength: number;
  distance: number;
};

const nodeOrigin: NodeOrigin = [0, 0];

const defaultEdgeOptions = { style: { stroke: '#ff66aa', strokeWidth: 3 } };

function ReactFlowPro({ strength, distance }: ExampleProps) {
  const { project } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useForceLayout({ strength, distance });

  const onConnect: OnConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      proOptions={proOptions}
      onConnect={onConnect}
      nodeOrigin={nodeOrigin}
      defaultEdgeOptions={defaultEdgeOptions}
      fitView
    >
      <Panel position="top-left">
        <b>How to use:</b> Click anywhere on the panel to add nodes, click a node to add a connection
      </Panel>
      <Controls/>
      <Background />
    </ReactFlow>
  );
}

function ReactFlowWrapper(props: ExampleProps) {
  return (
    <ReactFlowProvider>
      <ReactFlowPro {...props} />
    </ReactFlowProvider>
  );
}

export default ReactFlowWrapper;
