import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
`

const Section = styled.section`
  background-color: #eee;
  border-top: 2px solid palevioletred;
  padding: 20px 25px;
  width: 500px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
`

function App() {
  return (
    <Container>
      <Section>Interés compuesto</Section>
    </Container>
  )
}

export default App
