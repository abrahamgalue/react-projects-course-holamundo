import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page, { getPokemones } from '../src/app/page'

describe('Page', () => {

  describe('Component', () => {
    it('se renderiza', async () => {
      global.fetch = jest.fn()
        .mockImplementation(url => {
          return new Promise(resolve => {
            resolve({
              json: () => Promise.resolve({
                results: [
                  {
                    name: 'Chanchito feliz', url: 'pokemon/detalle/1'
                  }
                ]
              })
            })
          })
        })

      const page = await Page()
      render(page)

      const paragraph = screen.getByTestId('titulo')
      expect(paragraph).toBeInTheDocument()

      const chanchito = screen.getByText('Chanchito feliz')

      expect(chanchito).toBeInTheDocument()

      const url = chanchito.getAttribute('href')
      expect(url).toEqual('/pokemones/1')
    })
  })

  describe('getPokemones', () => {
    it('return pokemones', async () => {
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

      const data = await getPokemones()

      expect(data).toBe('lista de pokemones')
    })
  })
})