import Link from "next/link"

export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }]
}

async function getPokemones(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const data = await res.json()

  return data
}

export default async function Pokemon({ params: { id } }) {
  const data = await getPokemones(id)

  return (
    <div>
      <h1>{data.name} número #{data.id}</h1>
      <picture>
        <img
          src={data.sprites.front_default}
          alt={`Pokemon ${data.name}`}
          width={400}
          height={400} />
      </picture>
      <Link href='/'>Volver al inicio</Link>
    </div>
  )
}