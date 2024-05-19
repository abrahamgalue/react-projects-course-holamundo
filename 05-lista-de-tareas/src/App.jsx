import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import TodoItem from './components/TodoItem'
import {
  fetchThunk,
  setFilter,
  setTodo,
  selectTodos,
  selectStatus,
} from './features/todos'

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
    <div className='container'>
      <h1>Todo List</h1>
      <form onSubmit={submit}>
        <input
          placeholder='Read a book'
          value={value}
          className='task-bar'
          onChange={e => setValue(e.target.value)}
        />
      </form>
      <div className='btns-container'>
        <button onClick={() => dispatch(setFilter('all'))}>
          Mostrar todos
        </button>
        <button onClick={() => dispatch(setFilter('complete'))}>
          Completados
        </button>
        <button onClick={() => dispatch(setFilter('incomplete'))}>
          Incompletado
        </button>

        {/* Se ejecuta la función en lugar de ejecutar un caso predefinido en el disptach */}
        <button onClick={() => dispatch(fetchThunk())}>Fetch</button>
      </div>
      <ul>
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  )
}

export default App
