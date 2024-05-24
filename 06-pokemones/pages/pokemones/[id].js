// /pokemones/7

import Image from 'next/image'
import Link from 'next/link'
// import { useRouter } from 'next/router'

const Pokemon = ({ data }) => {
  // const router = useRouter()

  /* if (router.isFallback) {
    return <p>Cargando...</p>
  } */

  return (
    <div>
      <h1>{data.name} número #{data.id}</h1>
      <Image src={data.sprites.front_default} width={400} height={400} alt={`Pokemon ${data.name}`} />
      <Link href='/'>Volver al inicio</Link>
    </div>
  )
}

export default Pokemon

export const getStaticProps = async ({ params }) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
  const data = await response.json()

  return {
    props: {
      data
    }
  }
}

/*

Generamos los datos con SSG

Debemos indicarle a Next cuales son las rutas dinámicas
que vamos a generar de manera estática

De esta manera generamos rutas que van a ir cambiando
pero algunas de ellas las procesamos en el lado del servidor
y luego le devolvemos el html al usuario

*/
export const getStaticPaths = async () => {
  const paths = [
    {
      params: {
        id: '1',
      }
    }, {
      params: {
        id: '2',
      }
    }
  ]

  return {
    paths,
    fallback: 'blocking',
    /* 
    --------------
    fallback: 'blocking'
    --------------
    
    Primero genera el archivo en el servidor y luego devuelve el html
    Sin pasar por estados intermedios

    si queremos bloquear la interaccion y solo queremos entregarle el 
    archivo generado por Next

    --------------
    fallback: false,
    --------------

    solo genera los arcivos para los parametros indicados en las rutas
    el resto nos devuelve un 404

    debemos usarla cuando tengamos completamente definidas nuestras rutas
    y el volumen de estas no sea tan grande

    --------------
    fallback: true,
    --------------

    Next intenta generar las rutas que no se encuentran de manera lazy
    pero se va a encontrar con que el parámetro de data está vacio
    asi que para eso debemos utilizar el router para los casos en los que
    fallback sea true

    Next demuestra un estado intermedio de cargando

    debemos usarla cuando tengamos miles de rutas y queramos mostrarle
    feedback al usuario
    */
  }
}

/*
Generamos los datos con SSR

Debido a que las rutas son dinámicas Next genera estos documentos
dinámicos cuando el usuario hace una peticion de esa página

Es decir genera 1 a 1 dependiendo la ruta a la que acceda el usuario

Es recomendable cuando el contenido de las páginas cambia constantemente
*/

// export const getServerSideProps = async ({ params }) => {
//   const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
//   const data = await response.json()

//   return {
//     props: {
//       data
//     }
//   }
// }