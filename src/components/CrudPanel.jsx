import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNode,
  removeNode,
  addLink,
  removeLink,
  updateLinkValue
} from '../redux/dataSlice';

const CrudPanel = () => {
  const dispatch = useDispatch();
  const { nodes, links } = useSelector((state) => state.data);

  const [nodeId, setNodeId] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [value, setValue] = useState('');

  const [editLink, setEditLink] = useState(null);

  const handleAddNode = () => {
    if (nodeId) {
      dispatch(addNode({ id: nodeId }));
      setNodeId('');
    }
  };

  const handleRemoveNode = (id) => {
    dispatch(removeNode(id));
  };

  const handleAddLink = () => {
    if (from && to && value) {
      dispatch(addLink({ source: from, target: to, value: +value }));
      setFrom('');
      setTo('');
      setValue('');
    }
  };

  const handleUpdateLink = () => {
    if (from && to && value) {
      dispatch(updateLinkValue({ source: from, target: to, value: +value }));
      setFrom('');
      setTo('');
      setValue('');
      setEditLink(null);
    }
  };

  const handleRemoveLink = (source, target) => {
    dispatch(removeLink({ source, target }));
  };

  const handleEditLink = (link) => {
    setFrom(link.source);
    setTo(link.target);
    setValue(link.value);
    setEditLink(link);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', marginTop: '10px' }}>
      <h3>Manage Nodes</h3>
      <input
        type="text"
        placeholder="Node ID"
        value={nodeId}
        onChange={(e) => setNodeId(e.target.value)}
      />
      <button onClick={handleAddNode}>Add Node</button>

      <ul>
        {nodes.map((node) => (
          <li key={node.id}>
            {node.id}
            <button onClick={() => handleRemoveNode(node.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3 style={{ marginTop: '20px' }}>Manage Links</h3>
      <input
        type="text"
        placeholder="From"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />
      <input
        type="text"
        placeholder="To"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <input
        placeholder="Value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="number"
      />
      {!editLink ? (
        <button onClick={handleAddLink}>Add Link</button>
      ) : (
        <button onClick={handleUpdateLink}>Update Link</button>
      )}

      <ul>
        {links.map((link, idx) => (
          <li key={idx}>
            {link.source} → {link.target} (${link.value})
            <button onClick={() => handleEditLink(link)}>Edit</button>
            <button onClick={() => handleRemoveLink(link.source, link.target)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrudPanel;
