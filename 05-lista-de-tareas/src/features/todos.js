import { combineReducers } from "redux"
import { asyncMac, mac, mat, makeFetchingReducer, makeSetReducer, reduceReducers, makeCrudReducer } from "./utils"

/* Make Async Type o mat */

const asyncTodos = mat('todos')

const [setPending, setFulfilled, setError] = asyncMac(asyncTodos)
export const setComplete = mac('todo/complete', 'payload')
export const setFilter = mac('filter/set', 'payload')
export const setTodo = mac('todo/add', 'payload')

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
    dispatch(setError(e.message))
  }
}

const filterReducer = makeSetReducer([
  'filter/set'
])

const fetchingReducer = makeFetchingReducer(asyncTodos)

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

export const selectFilter = state => state.filter