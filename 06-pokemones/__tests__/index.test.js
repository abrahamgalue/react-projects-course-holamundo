import { render, screen } from "@testing-library/react"
import Index from '../pages/index'

describe('Index', () => {

  describe('Component', () => {
    it('se renderiza', () => {
      render(
        <Index pokemones={[]} />
      )

      const paragraph = screen.getByTestId('titulo')
      expect(paragraph).toBeInTheDocument()
    })
  })
})