import Link from "next/link"

async function getPokemones() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  const data = await res.json()

  return data.results
}

const Pokemon = ({ pokemon }) => {
  const id = pokemon.url.split('/').filter(x => x).pop()

  return (
    <li>
      <Link href={`/pokemones/${id}`}>
        {pokemon.name}
      </Link>
    </li>
  )
}

export default async function Home() {
  const pokemones = await getPokemones()

  return (
    <div>
      <p>Pokemones</p>
      <ul>
        {pokemones.map(pokemon => <Pokemon pokemon={pokemon} key={pokemon.name} />)}
      </ul>
    </div>
  );
}
