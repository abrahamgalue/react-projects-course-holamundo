import { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Input from './components/Input'
import Button from './components/Button'
import Container from './components/Container'
import Section from './components/Section'
import Balance from './components/Balance'
import { compoundInterest, formatter } from './logic/utils'

function App() {
  const [balance, setBalance] = useState('')

  const handleSubmit = ({ deposit, contribution, years, rate }) => {
    const val = compoundInterest(
      Number(deposit),
      Number(contribution),
      Number(years),
      Number(rate)
    )
    setBalance(formatter.format(val))
  }

  return (
    <Container>
      <Section>
        <Formik
          initialValues={{
            deposit: '',
            contribution: '',
            years: '',
            rate: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={Yup.object({
            deposit: Yup.number()
              .required('Obligatorio')
              .typeError('Debe ser un número')
              .min(1, 'El valor mínimo es 1'),
            contribution: Yup.number()
              .required('Obligatorio')
              .typeError('Debe ser un número')
              .min(1, 'El valor mínimo es 1'),
            years: Yup.number()
              .required('Obligatorio')
              .typeError('Debe ser un número')
              .min(1, 'El valor mínimo es 1')
              .integer('Debe ser un número entero'),
            rate: Yup.number()
              .required('Obligatorio')
              .typeError('Debe ser un número')
              .min(0, 'El valor mínimo es 0')
              .max(1, 'El Valor máximo es 1'),
          })}
        >
          <Form>
            <Input name='deposit' label='Deposito inicial' />
            <Input name='contribution' label='Contribución anual' />
            <Input name='years' label='Años' />
            <Input name='rate' label='Interés estimado' />
            <Button type='submit'>Calcular</Button>
          </Form>
        </Formik>
        {balance !== '' ? <Balance>Balance final: {balance}</Balance> : null}
      </Section>
    </Container>
  )
}

export default App
