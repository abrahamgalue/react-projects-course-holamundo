import { combineReducers } from "redux"

// Actions Creator

export const setPending = () => {
  return { type: 'todos/pending' }
}

export const setFulfilled = payload => ({ type: 'todos/fulfilled', payload })

export const setError = e => ({ type: 'todos/error', error: e.message })

export const setComplete = payload => ({ type: 'todo/complete', payload })

export const setFilter = payload => ({ type: 'filter/set', payload })

export const setTodo = payload => ({ type: 'todo/add', payload })

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
    dispatch(setError(e))
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

/* Creamos nuestro reducer de casos o estados de una petición a una API */
const initialFetching = { loading: 'idle', error: null }

const fetchingReducer = (state = initialFetching, action) => {
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

export const selectTodos = state => {
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

export const selectStatus = state => state.todos.status