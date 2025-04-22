// store.ts
import { configureStore } from '@reduxjs/toolkit';
import sankeyReducer from './features/sankey/sankeySlice';

export const store = configureStore({
    reducer: {
        sankey: sankeyReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;