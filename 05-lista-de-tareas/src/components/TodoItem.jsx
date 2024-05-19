import { useDispatch } from 'react-redux'
import { setComplete } from '../features/todos'

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch()
  return (
    <li
      style={{
        textDecoration: todo.completed ? 'line-through' : null,
      }}
      onClick={() => dispatch(setComplete(todo))}
    >
      <input
        id={`todo-${todo.id}`}
        type='checkbox'
        checked={todo.completed}
        readOnly
      />
      <span style={{ opacity: todo.completed ? '0.5' : null }}>
        {todo.title}
      </span>
    </li>
  )
}

export default TodoItem
