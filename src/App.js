import React, { useReducer, useContext, useEffect, useRef } from 'react'
import logo from './logo.svg'
import './App.css'

function appReducer(state, action) {
  switch (action.type) {
    case 'reset': {
      return action.payload
    }
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
    case 'completed': {
      return state.map(item => {
        if (item.id === action.payload) {
          return {
            ...item,
            completed: !item.completed,
          }
        }
        return item
      })
    } 
    default: {
      return state
    }
  }
}


const Context = React.createContext()

// Custom Hook
function useEffectOnce(cb) {
  // didRun is now an object witn 1 property, current
  const didRun = useRef(false)
  useEffect(() => {
    if (!didRun.current) {
      cb()
      didRun.current = true
    }
  })
}

export default function App() {
  const [state, dispatch] = useReducer(appReducer, [])

  useEffectOnce(() => {
    const raw = localStorage.getItem('data')
    dispatch({ type: 'reset', payload: JSON.parse(raw)})
  })

  useEffect(
    () => {
      localStorage.setItem('data', JSON.stringify(state))
    },
    [state]
  )

  return (
    <Context.Provider value={dispatch}>
      <div className="App">
        <header>
          <a href="https://www.youtube.com/watch?v=YKmiLcXiMMo">
            <img className="App-logo" src={logo} alt="React_logo"></img>
          </a>
          <h1>Todos App</h1>
        </header>
        <br />
        <button onClick={() => dispatch({ type: 'add'})}>
          New Todo
        </button>
        <TodoList items={state} />
      </div>
    </Context.Provider>  
  )
}


function TodoList({ items }) {
  console.log(items)
  return items.map(
    item => <TodoItem key={item.id} {...item} />
  )
}


function TodoItem({ id, completed, text }) {
  const dispatch = useContext(Context)
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
    <input 
      type="checkbox" 
      checked={completed} 
      onChange={
        () => dispatch({ type: "completed", payload: id})
      } 
    />
      <input type="text" defaultValue={text} style={{width: "200px"}} />
      <button onClick={
        () => dispatch({ type: "delete", payload: id})
      }>
        Delete
      </button>
    </div>
  )
}