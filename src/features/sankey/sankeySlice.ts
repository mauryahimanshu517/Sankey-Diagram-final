// features/sankey/sankeySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SankeyNode {
    id: string;
    name: string;
}

export interface SankeyLink {
    source: string;
    target: string;
    value: number;
}

export interface SankeyData {
    nodes: SankeyNode[];
    links: SankeyLink[];
}

const initialState: SankeyData = {
    nodes: [
        { id: 'salary', name: 'Salary' },
        { id: 'bills', name: 'Bills' },
        { id: 'electric', name: 'Electric Bill' },
        { id: 'mobile', name: 'Mobile Bill' },
    ],
    links: [
        { source: 'salary', target: 'bills', value: 3000 },
        { source: 'bills', target: 'electric', value: 1000 },
        { source: 'bills', target: 'mobile', value: 2000 },
    ],
};

const sankeySlice = createSlice({
    name: 'sankey',
    initialState,
    reducers: {
        setData(state, action: PayloadAction<SankeyData>) {
            return action.payload;
        },
        addNode(state, action: PayloadAction<SankeyNode>) {
            state.nodes.push(action.payload);
        },
        addLink(state, action: PayloadAction<SankeyLink>) {
            state.links.push(action.payload);
        },
        removeNode(state, action: PayloadAction<string>) {
            state.nodes = state.nodes.filter(node => node.id !== action.payload);
            state.links = state.links.filter(
                link => link.source !== action.payload && link.target !== action.payload
            );
        },
        removeLink(state, action: PayloadAction<{ source: string; target: string }>) {
            state.links = state.links.filter(
                link => !(link.source === action.payload.source && link.target === action.payload.target)
            );
        },
        updateNode(state, action: PayloadAction<SankeyNode>) {
            const nodeIndex = state.nodes.findIndex(node => node.id === action.payload.id);
            if (nodeIndex !== -1) {
                state.nodes[nodeIndex] = action.payload;
            }
        },
        updateLink(state, action: PayloadAction<SankeyLink>) {
            const linkIndex = state.links.findIndex(
                link => link.source === action.payload.source && link.target === action.payload.target
            );
            if (linkIndex !== -1) {
                state.links[linkIndex] = action.payload;
            }
        },
    },
});

export const { setData, addNode, addLink, removeNode, removeLink, updateNode, updateLink } = sankeySlice.actions;
export default sankeySlice.reducer;
