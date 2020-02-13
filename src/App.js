import React, { useReducer } from 'react'
// import logo from './logo.svg'
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
    default:
      break;
  }
}

function App() {
  const [state, dispatch] = useReducer(appReducer, [])
  return (
    <div className="App">
      <h1>Todos App</h1>
      <button onClick={() => dispatch({ type: 'add'})}>
        New Todo
      </button>
      {state.map(item => (
        <div key={item.id}>{item.id}</div>
      ))}
    </div>
  )
}

export default App
