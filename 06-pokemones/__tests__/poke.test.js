import { screen, render, waitFor } from "@testing-library/react"
import Poke from '../pages/poke'

describe('Poke', () => {
  it('renders pokemones', async () => {
    const mockResults = [{ name: 'chanchito', url: 'https://www.dominio.com/pokemones/1' }]

    global.fetch = jest.fn()
      .mockImplementation(url => {
        return new Promise(resolve => {
          resolve({
            json: () => Promise().resolve({
              results: mockResults
            })
          })
        })
      })

    render(
      <Poke />
    )

    const loading = screen.getByText('Cargando...')
    expect(loading).toBeInTheDocument()
    await waitFor(() => screen.getByText('Mi App de Pokemones'))
    const element = screen.getByTestId(1)
    const anchor = element.children[0]
    expect(anchor).toHaveAttribute('href', '/pokemones/1')
    expect(anchor).toHaveTextContent('chanchito')
  })
})