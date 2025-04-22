// src/App.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';

// Mock components
jest.mock('./components/Header', () => () => <div data-testid="header">Header</div>);
jest.mock('./components/CrudPanel', () => () => <div data-testid="crud-panel">CrudPanel</div>);
jest.mock('./components/SankeyChart', () => () => <div data-testid="sankey-chart">SankeyChart</div>);

describe('App', () => {
    test('renders Header, CrudPanel, and SankeyChart', () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );

        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByTestId('crud-panel')).toBeInTheDocument();
        expect(screen.getByTestId('sankey-chart')).toBeInTheDocument();
    });
});
