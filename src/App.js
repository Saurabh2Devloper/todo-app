import React, { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/todos')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const addTodo = () => {
    axios.post('http://localhost:5000/todos', { title, description })
      .then(response => {
        setTodos([...todos, response.data]);
        setTitle('');
        setDescription('');
      })
      .catch(error => {
        console.error('Error adding todo:', error);
      });
  };

  const deleteTodo = id => {
    axios.delete(`http://localhost:5000/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(error => {
        console.error('Error deleting todo:', error);
      });
  };

  const editTodo = (id, newTitle, newDescription) => {
    axios.put(`http://localhost:5000/todos/${id}`, { title: newTitle, description: newDescription })
      .then(response => {
        const updatedTodos = todos.map(todo => (todo._id === id ? response.data : todo));
        setTodos(updatedTodos);
      })
      .catch(error => {
        console.error('Error editing todo:', error);
      });
  };

  return (
    
        <div id='container' style={{margin: 'auto', backgroundColor:'lightblue', maxWidth: '36rem', padding: '1rem'}}>
          <h1 style={{ textAlign:'center', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem'}}>TODO List</h1>
          <input
            type="text"
            placeholder="Title"
            style={{marginBottom: '0.5rem', padding: '0.5rem', width: 'calc(100% - 1rem)'}}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className='text-red-500'
            type="text"
            placeholder="Description"
            style={{marginBottom: '0.5rem', padding: '0.5rem', width: 'calc(100% - 1rem)', color: 'red'}}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button style={{display:"flex" ,alignContent:"center" ,marginLeft:"45%",marginTop:"10px",marginBottom: '0.5rem',backgroundColor:"green",alignItems:"center",textAlign:"center"}} onClick={addTodo}>Add Todo</button>
          <ul style={{listStyle: 'none', padding: '0'}}>
            {todos.map(todo => (
              <li key={todo._id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px'}}>
                <input
                  type="text"
                  value={todo.title}
                  onChange={(e) => editTodo(todo._id, e.target.value, todo.description)}
                  style={{width: '100%'}}
                />
                <input
                  type="text"
                  value={todo.description}
                  onChange={(e) => editTodo(todo._id, todo.title, e.target.value)}
                  style={{width: '100%'}}
                />
                <button style={{backgroundColor:"red"}} onClick={() => deleteTodo(todo._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    
    export default App;
    