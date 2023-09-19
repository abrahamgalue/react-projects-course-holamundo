import { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import './header.css'
import './content.css'
import './article.css'

function App() {
  const [photos, setPhotos] = useState([])

  const open = url => window.open(url)

  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: '' }}
          onSubmit={async values => {
            // llamar a api de unsplash
            const response = await fetch(
              `https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
              {
                headers: {
                  Authorization:
                    'Client-ID J2OBTimXwK2ERcG_t9h98zi57C6uRCNmORtnkKur2Ro',
                },
              }
            )
            const data = await response.json()
            setPhotos(data.results)
          }}
        >
          <Form>
            <Field
              name='search'
              autoComplete='off'
              placeholder='Busca imágenes de alta resolución'
            />
          </Form>
        </Formik>
      </header>
      <div className='container'>
        <div className='center'>
          {photos.map(photo => (
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img src={photo.urls.regular} alt={photo.alt_description} />
              <p>{[photo.description, photo.alt_description].join(' - ')}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
