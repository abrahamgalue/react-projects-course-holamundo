import { render, screen } from "@testing-library/react"
import Index, { getStaticProps } from '../pages/index'

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

  describe('getStaticProps', () => {
    it('return pokemones', async () => {
      /* 
      Crea un MOCK
      Nos permite asignar funcionalidades y luego poder probarlas

      Lo hacemos debido a que el método de fetch
      no existe en el servidor donde se ejecutan los test

      así que tenemos dos alternativas:

      * simular un servidor
      * remplazar la función fetch
      */
      global.fetch = jest.fn()
        .mockImplementation(url => {
          expect(url).toBe('https://pokeapi.co/api/v2/pokemon?limit=151')
          return new Promise(resolve => {
            resolve({
              json: () => Promise.resolve({
                results: 'lista de pokemones'
              })
            })
          })
        })

      const { props } = await getStaticProps()

      expect(props.pokemones).toBe('lista de pokemones')
    })
  })
})