// components/SankeyEditor.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addNode, addLink, removeNode, removeLink, updateNode, updateLink } from '../features/sankey/sankeySlice';

const SankeyEditor: React.FC = () => {
    const dispatch = useDispatch();
    const nodes = useSelector((state: RootState) => state.sankey.nodes);
    const links = useSelector((state: RootState) => state.sankey.links);

    const [newNodeName, setNewNodeName] = useState('');
    const [newLinkSource, setNewLinkSource] = useState('');
    const [newLinkTarget, setNewLinkTarget] = useState('');
    const [newLinkValue, setNewLinkValue] = useState<number | string>('');

    const handleAddNode = () => {
        if (newNodeName) {
            dispatch(addNode({ id: newNodeName, name: newNodeName }));
            setNewNodeName('');
        }
    };

    const handleAddLink = () => {
        if (newLinkSource && newLinkTarget && newLinkValue) {
            dispatch(addLink({ source: newLinkSource, target: newLinkTarget, value: Number(newLinkValue) }));
            setNewLinkSource('');
            setNewLinkTarget('');
            setNewLinkValue('');
        }
    };

    const handleRemoveNode = (id: string) => {
        dispatch(removeNode(id));
    };

    const handleRemoveLink = (source: string, target: string) => {
        dispatch(removeLink({ source, target }));
    };

    const handleUpdateNode = (id: string) => {
        const updatedNodeName = prompt('Enter new node name');
        if (updatedNodeName) {
            dispatch(updateNode({ id, name: updatedNodeName }));
        }
    };

    const handleUpdateLink = (source: string, target: string) => {
        const updatedValue = prompt('Enter new link value');
        if (updatedValue && !isNaN(Number(updatedValue))) {
            dispatch(updateLink({ source, target, value: Number(updatedValue) }));
        }
    };

    return (
        <div className="editor-container">
            <h3>Manage Sankey Diagram</h3>

            <div>
                <h4>Add Node</h4>
                <input
                    type="text"
                    value={newNodeName}
                    onChange={(e) => setNewNodeName(e.target.value)}
                    placeholder="Node name"
                />
                <button onClick={handleAddNode}>Add Node</button>
            </div>

            <div>
                <h4>Add Link</h4>
                <input
                    type="text"
                    value={newLinkSource}
                    onChange={(e) => setNewLinkSource(e.target.value)}
                    placeholder="Source Node"
                />
                <input
                    type="text"
                    value={newLinkTarget}
                    onChange={(e) => setNewLinkTarget(e.target.value)}
                    placeholder="Target Node"
                />
                <input
                    type="number"
                    value={newLinkValue}
                    onChange={(e) => setNewLinkValue(e.target.value)}
                    placeholder="Link Value"
                />
                <button onClick={handleAddLink}>Add Link</button>
            </div>

            <div>
                <h4>Nodes</h4>
                <ul>
                    {nodes.map((node) => (
                        <li key={node.id}>
                            {node.name}
                            <button onClick={() => handleUpdateNode(node.id)}>Edit</button>
                            <button onClick={() => handleRemoveNode(node.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h4>Links</h4>
                <ul>
                    {links.map((link, index) => (
                        <li key={index}>
                            {link.source} → {link.target} : {link.value}
                            <button onClick={() => handleUpdateLink(link.source, link.target)}>Edit</button>
                            <button onClick={() => handleRemoveLink(link.source, link.target)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SankeyEditor;
