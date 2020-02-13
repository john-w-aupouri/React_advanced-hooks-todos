import React, { useReducer, useContext } from 'react'
import logo from './logo.svg'
import './App.css'

function appReducer(state, action) {
  switch (action.type) {
    case 'add': {
      return [
        ...state,
        {
          id: Date.now(),
          text: '',
          completed: false,
        }
      ]
    }
    case 'delete': {
      // Seperate out each item from the id equalling the payload
      return state.filter(item => item.id !== action.payload)
    } 
    default: {
      return state
    }
  }
}


const Context = React.createContext()


export default function App() {
  const [state, dispatch] = useReducer(appReducer, [])
  return (
    <Context.Provider value={dispatch}>
      <div className="App">
        <header>
          <img className="App-logo" src={logo} alt="React_logo"></img>
          <h1>Todos App</h1>
          <button onClick={() => dispatch({ type: 'add'})}>
            New Todo
          </button>
        </header>
        <br />
        <TodoList items={state} />
      </div>
    </Context.Provider>  
  )
}


function TodoList({ items }) {
  console.log(items)
  return items.map(
    item => <TodoItem key={item.id} {...item.id} />
  )
}


function TodoItem({ id, completed, text }) {
  const dispatch = useContext(Context)
  console.log(dispatch)
  return (
    <div
      style={{
        width: '400px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 'auto',
        background: '#61dafb',
        border: 'none',
        padding: '15px',
      }}
    >
    <input type="checkbox" checked={completed} />
      <input type="text" defaultValue={text} style={{width: "200px"}} />
      <button onClick={
        () => dispatch({ type: "delete", payload: id})}>
        Delete
      </button>
    </div>
  )
}