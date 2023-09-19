import { Component } from 'react'
import Productos from './components/Productos'
import Layout from './components/Layout'
import Navbar from './components/Navbar'
import Title from './components/Title'

class App extends Component {
  state = {
    productos: [
      { name: 'Tomato', price: 6.68, img: '/productos/tomato.jpg' },
      { name: 'Peas', price: 2.17, img: '/productos/peas.jpg' },
      { name: 'Lettuce', price: 3.85, img: '/productos/lettuce.jpg' },
      { name: 'Bananas', price: 6.25, img: '/productos/bananas.jpg' },
      { name: 'Carrots', price: 1.12, img: '/productos/carrots.jpg' },
      { name: 'Grapes', price: 3.12, img: '/productos/grapes.jpg' },
      { name: 'Strawberry', price: 2.51, img: '/productos/strawberry.jpg' },
      { name: 'Green Bell Pepper', price: 3.35, img: '/productos/pepper.jpg' },
    ],
    carro: [],
    esCarroVisible: false,
  }

  agregarAlCarro = (producto) => {
    const { carro } = this.state
    if (carro.find((x) => x.name === producto.name)) {
      const newCarro = carro.map((x) =>
        x.name === producto.name
          ? {
              ...x,
              cantidad: x.cantidad + 1,
            }
          : x
      )
      return this.setState({ carro: newCarro })
    }
    return this.setState({
      carro: this.state.carro.concat({
        ...producto,
        cantidad: 1,
      }),
    })
  }

  mostrarCarro = () => {
    if (!this.state.carro.length) {
      return
    }
    this.setState({ esCarroVisible: !this.state.esCarroVisible })
  }

  render() {
    const { esCarroVisible } = this.state

    return (
      <div>
        <Navbar
          carro={this.state.carro}
          esCarroVisible={esCarroVisible}
          mostrarCarro={this.mostrarCarro}
        />
        <Layout>
          <Title />
          <Productos
            agregarAlCarro={this.agregarAlCarro}
            productos={this.state.productos}
          />
        </Layout>
      </div>
    )
  }
}

export default App
