import Input from './Input'
import Button from './Button'
import useFormulario from '../hooks/useFormulario'

const UserForm = ({ submit }) => {
  const [formulario, handleChange, reset] = useFormulario({
    name: '',
    lastname: '',
    email: '',
  })

  const handleSubmit = e => {
    e.preventDefault()
    submit(formulario)
    reset()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label='Nombre'
        value={formulario.name}
        name='name'
        onChange={handleChange}
        placeholder='Nombre'
      />
      <Input
        label='Apellido'
        value={formulario.lastname}
        name='lastname'
        onChange={handleChange}
        placeholder='Apellido'
      />
      <Input
        label='Correo'
        value={formulario.email}
        name='email'
        onChange={handleChange}
        placeholder='Correo'
      />
      <Button>Enviar</Button>
    </form>
  )
}

export default UserForm
