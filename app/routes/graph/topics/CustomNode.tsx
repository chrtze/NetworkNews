import { memo, FC} from 'react';
//import { Link } from 'react-router-dom';
import { Handle, Position, NodeProps } from 'reactflow';
import styled from "styled-components";

const isVertical = false;


const CustomNode: FC<NodeProps> = ({ data, selected}) => {
  //const slug = data.label.toLowerCase();
  const SrcHandle = isVertical ? Position.Bottom : Position.Right;
  const TgtHandle = isVertical ? Position.Top : Position.Left;

  const Node = styled.div`
    padding: 10px 20px;
    border-radius: 5px;
    background: ${(props) => props.theme.nodeBg};
    color: ${(props) => props.theme.nodeColor};
    border: 1px solid
      ${(props) => selected ? props.theme.primary : props.theme.nodeBorder};

    .react-flow__handle {
      background: ${(props) => props.theme.primary};
      width: 8px;
      height: 10px;
      border-radius: 3px;
    }
  `;


  return (
    <Node>
      <Handle type="target" position={TgtHandle} />
         <div>
           <strong>{data.label}</strong>
         </div>
      <Handle
        type="source"
        position={SrcHandle}
      />
    </Node>
  );
};

export default memo(CustomNode);

