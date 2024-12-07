import './App.css';
import { useEffect, useState } from 'react';
export const BASE_URL = process.env.REACT_APP_BASE_URL;

function App() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const url = BASE_URL + '/api/items';
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    setItems(data);
  };

  const addItem = async () => {
    if (!title) {
      return;
    }
    const item = { title };

    const url = BASE_URL + '/api/items';
    console.log(url);
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    console.log(res);
    if (res.ok) {
      setMessage('Item added successfully');
      setTitle('');
      fetchItems();
    } else {
      setMessage('Failed to add item');
    }
  }    
  return (
    <div className="App">
      <h1>Todo App</h1>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={addItem}>Add</button>
      {message && <p>{message}</p>}
      <ul>
        {items && items.map && items.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
