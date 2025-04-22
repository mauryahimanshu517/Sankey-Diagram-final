import reducer, {
    addNode,
    removeNode,
    addLink,
    removeLink,
    updateLinkValue,
} from './dataSlice';

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

describe('dataSlice', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, { type: undefined })).toEqual(initialState);
    });

    it('should handle addNode', () => {
        const newNode = { id: 'Groceries' };
        const state = reducer(initialState, addNode(newNode));
        expect(state.nodes).toContainEqual(newNode);
    });

    it('should handle removeNode and related links', () => {
        const state = reducer(initialState, removeNode('Bills'));
        expect(state.nodes.find(n => n.id === 'Bills')).toBeUndefined();
        expect(state.links.find(l => l.source === 'Bills' || l.target === 'Bills')).toBeUndefined();
    });

    it('should handle addLink', () => {
        const newLink = { source: 'Salary', target: 'Groceries', value: 500 };
        const state = reducer(initialState, addLink(newLink));
        expect(state.links).toContainEqual(newLink);
    });

    it('should handle removeLink', () => {
        const linkToRemove = { source: 'Bills', target: 'Mobile Bill' };
        const state = reducer(initialState, removeLink(linkToRemove));
        expect(state.links.find(
            l => l.source === linkToRemove.source && l.target === linkToRemove.target
        )).toBeUndefined();
    });

    it('should handle updateLinkValue', () => {
        const updatedLink = {
            source: 'Bills',
            target: 'Electric Bill',
            value: 1500,
        };
        const state = reducer(initialState, updateLinkValue(updatedLink));
        const link = state.links.find(
            l => l.source === updatedLink.source && l.target === updatedLink.target
        );
        expect(link.value).toBe(1500);
    });
});
