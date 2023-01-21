import { memo, FC, CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { Handle, Position, NodeProps } from 'reactflow';

const sourceHandleStyleA: CSSProperties = { left: 50 };
const sourceHandleStyleB: CSSProperties = {
  right: 50,
  left: 'auto',
};

const CustomNode: FC<NodeProps> = ({ data, xPos, yPos }) => {
  const slug = data.label.toLowerCase();

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className='text-center'>
        <div>
          <strong>{data.label}</strong>
        </div>
        <Link to={"/topics/graph/" + slug}>View</Link>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
      />
    </>
  );
};

export default memo(CustomNode);
