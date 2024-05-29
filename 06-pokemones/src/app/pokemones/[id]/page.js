import Image from "next/image"
import Link from "next/link"

async function getPokemones(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const data = await res.json()

  return data
}

export default async function Pokemon({ params: { id } }) {
  const data = await getPokemones(id)
  console.log(data)

  return (
    <div>
      <h1>{data.name} número #{data.id}</h1>
      <Image src={data.sprites.front_default} width={400} height={400} alt={`Pokemon ${data.name}`} />
      <Link href='/'>Volver al inicio</Link>
    </div>
  )
}