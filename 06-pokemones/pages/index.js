import Link from 'next/link'

const Pokemon = ({ pokemon }) => {
  // Generamos nuestro id para cada pokemon
  const id = pokemon.url.split('/').filter(x => x).pop()

  return (
    <li>
      {/* Creamos rutas dinámicas con el id */}
      <Link href={`/pokemones/${id}`}>
        {pokemon.name}
      </Link>
    </li>
  )
}

// Nos permite usar los datos en nuestros componentes
export default function Home({ pokemones }) {

  return (
    <div>
      <p>
        Pokemones
      </p>
      <ul>
        {pokemones.map(pokemon => <Pokemon pokemon={pokemon} key={pokemon.name} />)}
      </ul>
    </div>
  );
}

/*
Permite generar docs html de manera estatica al momento de hacer el build

Esto debido a que la lista del fetch siempre será la misma
 */
export const getStaticProps = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  const data = await res.json()

  return {
    // Siempre debemos retornar el props para que Next sepa donde buscar
    props: {
      pokemones: data.results
    }
  }
}
