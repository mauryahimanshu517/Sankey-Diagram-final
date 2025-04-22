import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import CrudPanel from './CrudPanel';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {
    addNode,
    removeNode,
    addLink,
    removeLink,
    updateLinkValue,
} from '../redux/dataSlice';

jest.mock('../redux/dataSlice', () => ({
    addNode: jest.fn(),
    removeNode: jest.fn(),
    addLink: jest.fn(),
    removeLink: jest.fn(),
    updateLinkValue: jest.fn(),
}));

const mockStore = configureStore([]);

const setup = (storeState) => {
    const store = mockStore(storeState);
    store.dispatch = jest.fn(); // spy on dispatch
    render(
        <Provider store={store}>
            <CrudPanel />
        </Provider>
    );
    return store;
};

describe('CrudPanel', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should add a node', () => {
        const store = setup({ data: { nodes: [], links: [] } });

        fireEvent.change(screen.getByPlaceholderText('Node ID'), {
            target: { value: 'A' },
        });
        fireEvent.click(screen.getByText('Add Node'));

        expect(addNode).toHaveBeenCalledWith({ id: 'A' });
        expect(store.dispatch).toHaveBeenCalled();
    });

    it('should delete a node', () => {
        const store = setup({ data: { nodes: [{ id: 'X' }], links: [] } });

        // If there are multiple "Delete" buttons, target the right one
        const deleteButtons = screen.getAllByText('Delete');
        fireEvent.click(deleteButtons[0]);

        expect(removeNode).toHaveBeenCalledWith('X');
        expect(store.dispatch).toHaveBeenCalled();
    });

    it('should add a link', () => {
        const store = setup({ data: { nodes: [], links: [] } });

        fireEvent.change(screen.getByPlaceholderText('From'), {
            target: { value: 'A' },
        });
        fireEvent.change(screen.getByPlaceholderText('To'), {
            target: { value: 'B' },
        });
        fireEvent.change(screen.getByPlaceholderText('Value'), {
            target: { value: '10' },
        });

        fireEvent.click(screen.getByText('Add Link'));

        expect(addLink).toHaveBeenCalledWith({ source: 'A', target: 'B', value: 10 });
        expect(store.dispatch).toHaveBeenCalled();
    });

    it('should edit and update a link', () => {
        const link = { source: 'X', target: 'Y', value: 5 };
        const store = setup({ data: { nodes: [], links: [link] } });

        const editButtons = screen.getAllByText('Edit');
        fireEvent.click(editButtons[0]);

        fireEvent.change(screen.getByPlaceholderText('Value'), {
            target: { value: '15' },
        });

        fireEvent.click(screen.getByText('Update Link'));

        expect(updateLinkValue).toHaveBeenCalledWith({
            source: 'X',
            target: 'Y',
            value: 15,
        });
        expect(store.dispatch).toHaveBeenCalled();
    });

    it('should remove a link', () => {
        const link = { source: 'X', target: 'Y', value: 10 };
        const store = setup({ data: { nodes: [], links: [link] } });

        const deleteButtons = screen.getAllByText('Delete');
        fireEvent.click(deleteButtons[0]);

        expect(removeLink).toHaveBeenCalledWith({ source: 'X', target: 'Y' });
        expect(store.dispatch).toHaveBeenCalled();
    });
});
