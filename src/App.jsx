import React, { useState, useEffect } from 'react';
import './App.css';

const useFetch = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('Fetch error:', err));
  }, [url]);

  return data;
};

const App = () => {
  const [dataType, setDataType] = useState('todos');
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const data = useFetch(`https://jsonplaceholder.typicode.com/${dataType}`);

  const handleShowRawData = (dataItem) => {
    setModalData(JSON.stringify(dataItem, null, 2));
    setShowModal(true);
  };

  const renderTodos = () => {
    return (
      <div className="grid">
        {data.map((todo) => (
          <div className="card" key={todo.id}>
            <h3>{todo.title}</h3>
            <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
            <button className="raw-button" onClick={() => handleShowRawData(todo)}>View raw</button>
          </div>
        ))}
      </div>
    );
  };

  const renderPosts = () => {
    return data.map((post) => (
      <div className="card" key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <button className="raw-button" onClick={() => handleShowRawData(post)}>View raw</button>
      </div>
    ));
  };

  return (
    <div className="container">
      {showModal && (
        <div className="modal">
          <pre>{modalData}</pre>
          <button onClick={() => setShowModal(false)}>Close</button>
        </div>
      )}
      <button className="fetch-button" onClick={() => setDataType('todos')}>Fetch Todos</button>
      <button className="fetch-button" onClick={() => setDataType('posts')}>Fetch Posts</button>
      <div className="data-display">
        {data ? (dataType === 'todos' ? renderTodos() : renderPosts()) : <p>Loading...</p>}
      </div>
    </div>
  );
};

export default App;
