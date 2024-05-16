import { combineReducers } from "redux"
import { makeFetchingReducer, makeSetReducer, reduceReducers, makeCrudReducer } from "./utils"

// Actions Creator

export const setPending = () => {
  return { type: 'todos/pending' }
}

const setActions = (type, payload) => ({ type, payload });

// export const setFulfilled = payload => ({ type: 'todos/fulfilled', payload })

export const setFulfilled = payload => setActions('todos/fulfilled', payload);

export const setError = e => ({ type: 'todos/rejected', error: e.message })

export const setComplete = payload => ({ type: 'todo/complete', payload })

export const setFilter = payload => ({ type: 'filter/set', payload })

export const setTodo = payload => setActions('todo/add', payload)

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

const filterReducer = makeSetReducer([
  'filter/set'
])

const fetchingReducer = makeFetchingReducer([
  'todos/pending',
  'todos/fulfilled',
  'todos/rejected'
])

const fullfilledReducer = makeSetReducer(['todos/fulfilled'])
const crudReducer = makeCrudReducer(['todo/add', 'todo/complete'])

export const todosReducer = reduceReducers(crudReducer, fullfilledReducer)

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