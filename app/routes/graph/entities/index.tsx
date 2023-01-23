import reactFlowStyles from 'reactflow/dist/style.css';
import styles from '~/styles/forceLayout.css';

export default function EntityIndex() {
  return (
    <h1>Index Filler</h1>
  );
}

export function links() {
  return [
    { rel: 'stylesheet', href: reactFlowStyles },
    { rel: 'stylesheet', href: styles },
  ];
}
