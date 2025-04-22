import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nodes: [
    { id: 'Salary' },
    { id: 'Bills' },
    { id: 'Electric Bill' },
    { id: 'Mobile Bill' },
  ],
  links: [
    { source: 'Salary', target: 'Bills', value: 3000 },
    { source: 'Bills', target: 'Electric Bill', value: 1000 },
    { source: 'Bills', target: 'Mobile Bill', value: 2000 },
  ],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addNode: (state, action) => {
      state.nodes.push(action.payload);
    },
    removeNode: (state, action) => {
      state.nodes = state.nodes.filter(node => node.id !== action.payload);
      state.links = state.links.filter(
        link => link.source !== action.payload && link.target !== action.payload
      );
    },
    addLink: (state, action) => {
      state.links.push(action.payload);
    },
    removeLink: (state, action) => {
      state.links = state.links.filter(
        link =>
          !(
            link.source === action.payload.source &&
            link.target === action.payload.target
          )
      );
    },
    updateLinkValue: (state, action) => {
      const link = state.links.find(
        l =>
          l.source === action.payload.source &&
          l.target === action.payload.target
      );
      if (link) {
        link.value = action.payload.value;
      }
    },
  },
});

export const {
  addNode,
  removeNode,
  addLink,
  removeLink,
  updateLinkValue,
} = dataSlice.actions;

export default dataSlice.reducer;
