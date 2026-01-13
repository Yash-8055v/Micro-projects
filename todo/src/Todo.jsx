import React from 'react'
import './Todo.css'
import { useState } from 'react'
export default function () {
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState("");

  const updateTodo = (event) => {
    setTodo(event.target.value);
    
  }
  
  const addTodo = () => {
    const newTodo = {
      id: Date.now(),
      title: todo,
      isComplete: false
    }
    
    if (!(todo == "")) {
      setTodos([...todos, newTodo])
    }
    
    console.log(todos)
    setTodo("")
  }
  
  return (
    <div>
    <h1>Todo App</h1>
    
    <div className='Addtodo'>
      
        <input type="text" placeholder='write todo...' value={todo} onChange={updateTodo}/>
        <button onClick={addTodo}>Add</button>
      
    </div>

      <h3>All todos</h3>
        
         
    <div className='todos'>
        {
          
          todos.map((todo) => (
            <ul>
              <li key={todo.id}>{todo.title}<button>Delete</button></li>
            </ul>
          ))
        }
          
        
      
    </div>
    </div>
  )
}
