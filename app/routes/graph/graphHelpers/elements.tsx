import React from 'react';
import { MarkerType, Position } from 'reactflow';

const position = { x: 0, y: 0 };
const edgeType = 'SmoothStep';

export const initialNodes = [
    {id: '1', data: { label: 'Node 1' },position},
    {id: '2', data: { label: 'Node 2' },position},
    {id: '3', data: { label: 'Node 3' },position},
    {id: '4', data: { label: 'Node 3' },position},
    {id: '5', data: { label: 'Node 4' },position}
];

export const initialEdges = [
    { id: 'e12', source: '1', target: '2', type: edgeType, animated: true, style: { stroke: '#0ea5e9' }},
    { id: 'e13', source: '1', target: '3', type: edgeType, animated: true, style: { stroke: '#0ea5e9' }},
    { id: 'e24', source: '2', target: '4', type: edgeType, animated: true, style: { stroke: '#0ea5e9' }},
    { id: 'e35', source: '3', target: '5', type: edgeType, animated: true, style: { stroke: '#0ea5e9' }},
];
