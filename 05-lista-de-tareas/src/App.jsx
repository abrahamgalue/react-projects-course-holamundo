/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { combineReducers } from 'redux'
import { useState } from 'react'

/*
Es la manera que tiene redux para ejecutar una función en un dispatch
y tener un mayor control
*/
export const asyncMiddleware = store => next => action => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState)
  }
  return next(action)
}

// Actions Creator

const setPending = () => {
  return { type: 'todos/pending' }
}

const setFulfilled = payload => ({ type: 'todos/fulfilled', payload })

const setError = e => ({ type: 'todos/error', error: e.message })

const setComplete = payload => ({ type: 'todo/complete', payload })

const setFilter = payload => ({ type: 'filter/set', payload })

const setTodo = payload => ({ type: 'todo/add', payload })

/*
thunk funcion es una funcion que por lo que sea va a retrasar su ejecucion
el caso de uso mas común es para hacer un fetching de datos a una API
*/
export const fetchThunk = () => async dispatch => {
  // console.log('soy un thunk', dispatch)
  dispatch(setPending())
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos')
    const data = await response.json()
    const todos = data.slice(0, 10)
    dispatch(setFulfilled(todos))
  } catch (e) {
    dispatch(setError)
  }
}

/* Creamos nuestro reducer de casos o estados de una petición a una API */
const initialFetching = { loading: 'idle', error: null }
export const fetchingReducer = (state = initialFetching, action) => {
  switch (action.type) {
    case 'todos/pending': {
      return { ...state, loading: 'pending' }
    }
    case 'todos/fulfilled': {
      return { ...state, loading: 'succeded' }
    }
    case 'todos/error': {
      return { error: action.error, loading: 'rejected' }
    }
    default:
      return state
  }
}

const filterReducer = (state = 'all', action) => {
  switch (action.type) {
    case 'filter/set':
      return action.payload
    default:
      return state
  }
}

const todosReducer = (state = [], action) => {
  switch (action.type) {
    case 'todos/fulfilled': {
      return action.payload
    }
    case 'todo/add': {
      return state.concat({ ...action.payload })
    }
    case 'todo/complete': {
      const newTodos = state.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, completed: !todo.completed }
        }
        return todo
      })

      return newTodos
    }
    default:
      return state
  }
}

export const reducer = combineReducers({
  /*
  Es una buena practica combinar nuestro reducer y agruparlos
  en aquellos que manejan la misma lógica
  */
  todos: combineReducers({
    entities: todosReducer,
    status: fetchingReducer,
  }),
  filter: filterReducer,
})

const selectTodos = state => {
  const {
    todos: { entities },
    filter,
  } = state

  if (filter === 'complete') {
    return entities.filter(todo => todo.completed)
  }

  if (filter === 'incomplete') {
    return entities.filter(todo => !todo.completed)
  }

  return entities
}

const selectStatus = state => state.todos.status

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch()
  return (
    <li
      style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
      onClick={() => dispatch(setComplete(todo))}
    >
      {todo.title}
    </li>
  )
}

function App() {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()

  const todos = useSelector(selectTodos)
  const status = useSelector(selectStatus)

  const submit = e => {
    e.preventDefault()
    if (!value.trim()) {
      return
    }
    const id = Math.random().toString(36)
    const todo = { title: value, completed: false, id }
    dispatch(setTodo(todo))
    setValue('')
  }

  if (status.loading === 'pending') {
    return <p>Cargando...</p>
  }

  if (status.loading === 'rejected') {
    return <p>{status.error}</p>
  }

  return (
    <div>
      <form onSubmit={submit}>
        <input value={value} onChange={e => setValue(e.target.value)} />
      </form>
      <button onClick={() => dispatch(setFilter('all'))}>Mostrar todos</button>
      <button onClick={() => dispatch(setFilter('complete'))}>
        Completados
      </button>
      <button onClick={() => dispatch(setFilter('incomplete'))}>
        Incompletado
      </button>

      {/* Se ejecuta la función en lugar de ejecutar un caso predefinido en el disptach */}
      <button onClick={() => dispatch(fetchThunk())}>Fetch</button>
      <ul>
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  )
}

export default App
