// src/App.js

import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    fetch('/items')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching items:', error));
  };

  const addItem = () => {
    fetch('/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: itemName })
    })
    .then(response => response.json())
    .then(data => {
      setItems([...items, data]);
      setItemName('');
    })
    .catch(error => console.error('Error adding item:', error));
  };

  const deleteItem = (itemId) => {
    fetch(`/items/${itemId}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      setItems(items.filter(item => item._id !== itemId));
    })
    .catch(error => console.error('Error deleting item:', error));
  };

  return (
    <div className="App">
      <h1>React CRUD App</h1>

      <form onSubmit={(e) => { e.preventDefault(); addItem(); }}>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Enter item name"
          required
        />
        <button type="submit">Add Item</button>
      </form>

      <ul>
        {items.map(item => (
          <li key={item._id}>
            {item.name}
            <button onClick={() => deleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
