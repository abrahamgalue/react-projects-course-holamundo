import { render, screen } from "@testing-library/react"
import Index from '../pages/index'

describe('Index', () => {

  /* Podemos tener varios test anidados dentro de nuestro archivo */
  describe('Component', () => {
    it('se renderiza', () => {
      render(
        <Index pokemones={[{ name: 'Chanchito feliz', url: 'pokemon/detalle/1' }]} />
      )

      /* screen nos permite acceder a todos los elementos de la página */
      const paragraph = screen.getByTestId('titulo')
      expect(paragraph).toBeInTheDocument()

      const chanchito = screen.getByText('Chanchito feliz')
      // console.log(chanchito.getAttribute('href'))

      expect(chanchito).toBeInTheDocument()

      const url = chanchito.getAttribute('href')
      expect(url).toEqual('/pokemones/1')
    })
  })
})