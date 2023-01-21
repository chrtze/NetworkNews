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
  Panel
} from 'reactflow';
import styled, { ThemeProvider } from 'styled-components';

import dagre from 'dagre';
import {Submit, UpRightArrow} from '~/icons/';

import CustomNode from './topics/CustomNode';
import { initialNodes, initialEdges } from './graphHelpers/elements';

import { darkTheme, lightTheme } from '~/styles/DLTheme';
import reactFlowStyles from 'reactflow/dist/style.css';
import styles from '~/styles/flow.css';

const proOptions = { hideAttribution: true };

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

const ReactFlowStyled = styled(ReactFlow)`
  background-color: ${(props) => props.theme.bg};
`;

const control = {
  
}

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
      isVertical ? setViewport({ x: 400, y: 300, zoom: 1.5 }, { duration: 1100 }) : setViewport({ x: 150, y: 300, zoom: 1.5 }, { duration: 1100 });
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
      proOptions={proOptions}
    >
    <div className="controls">
      <button onClick={() => toggleMode()} className='flowButton'> change mode </button>
      <button onClick={() => onLayout('TB')} className='flowButton'>vertical layout</button>
      <button onClick={() => onLayout('LR')} className='flowButton'>horizontal layout</button>
    </div>
    <Panel position="top-left" className="annotationTopLeft"> 👇 Interact with AI Assistant 👇 </Panel>
    <Panel position="top-left" className="AI-Pannel"> 
      <div className="grid grid-rows-2">
          <div className="row-span-2 text-zinc-200 pl-1 rounded-t-md"> &gt; How can i help today? </div>
          <div className="bg-slate-800 pl-1 text-zinc-200 rounded-b-md"> &gt; please bring up current events surrounding Boeing
            <button className='rounded-full align-middle ml-4'> <Submit/> </button>
          </div>
      </div>
    </Panel>
    <Panel position="top-right" className="annotationTopRight"> 👆 Control Layout and Theme 👆</Panel>
    <Panel position="bottom-left" className="annotationBottomLeft"> 👈 Zoom and <br/> 👈 Pan </Panel>
    <Panel position="top-left" className="pointyThing"> 🧨 I don't work because this is the tutorial! 🧨 </Panel>
    <Panel position="top-left" className="upRightArrow"> <UpRightArrow/> </Panel>
    <ControlsStyled showInteractive={false}/>
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
    <div className='grid grid-rows-6 basis-1/6 bg-zinc-800'>
      <div className="rounded-lg m-3 border-dotted border-2 border-sky-500 text-3xl text-center font-extrabold bg-zinc-800">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-violet-500">
          Welcome to the graph!
        </span>
      </div>
      <div className="row-span-2 text-center">
        <span className="text-xl  bg-clip-text text-transparent bg-gradient-to-r to-cyan-500 from-violet-500">
          This is a tutorial page to explore and get your bearing. Feel free to click around and see what network based news is all about!
        </span>
      </div>
      <div className=" row-span-3 bg-sky-500">

      </div>
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