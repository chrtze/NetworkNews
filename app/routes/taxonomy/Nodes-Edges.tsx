const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

export const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Aerospace Industry' },
    position,
  },
  {
    id: '2',
    type: 'custom',
    data: { label: 'Commercial Aviation' },
    position,
  },
  {
    id: '3',
    type: 'custom',
    data: { label: 'Military Aviation' },
    position,
  },
  {
    id: '4',
    type: 'custom',
    data: { label: 'Space' },
    position,
  },
  {
    id: '5',
    type: 'custom',
    data: { label: 'Unmanned' },
    position,
  },
  {
    id: '6',
    type: 'custom',
    data: { label: 'Contracts' },
    position,
  },
];

export const initialEdges = [
  { id: 'e12', source: '1', target: '2', type: edgeType, animated: true },
  { id: 'e13', source: '1', target: '3', type: edgeType, animated: true },
  { id: 'e14', source: '1', target: '4', type: edgeType, animated: true },
  { id: 'e15', source: '1', target: '5', type: edgeType, animated: true },
  { id: 'e16', source: '1', target: '6', type: edgeType, animated: true },
];
