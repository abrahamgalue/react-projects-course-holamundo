const Pokemon = ({ data }) => {
  console.log(data)

  return (
    <p>
      lala
    </p>
  )
}

export default Pokemon

export const getServerSideProps = async ({ params }) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
  const data = await response.json()

  return {
    props: {
      data
    }
  }
}