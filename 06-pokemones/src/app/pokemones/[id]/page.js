async function getPokemones(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const data = await res.json()

  return data
}

export default async function Pokemon({ params: { id } }) {
  const data = getPokemones(id)
  console.log(data)

  return (
    <p>lala</p>
  )
}