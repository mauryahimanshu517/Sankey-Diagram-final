jest.mock('chart.js');
jest.mock('chartjs-chart-sankey');

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SankeyChart from './SankeyChart'; // adjust path if needed

const mockStore = configureStore([]);

describe('SankeyChart', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            data: {
                nodes: [{ id: 'Salary' }, { id: 'Rent' }],
                links: [{ source: 'Salary', target: 'Rent', value: 1000 }],
            },
        });
    });

    test('renders SankeyChart canvas', () => {
        render(
            <Provider store={store}>
                <SankeyChart />
            </Provider>
        );

        const canvas = screen.getByTestId('sankey-canvas'); // ✅ use test ID
        expect(canvas).toBeInTheDocument();
    });

});
