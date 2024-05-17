// Async Make Action Creator

/*
 Lo creamos para reutilizar la lógica
 de hacer peticiones al servidor
 en diferentes entidades
*/
export const mat = entity => [`${entity}/pending`, `${entity}/fulfilled`, `${entity}/rejected`]

// Make Action Creator

export const mac = (type, ...argNames) =>
  (...args) => {
    const action = { type }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })

    return action
  }

/*
 Creamos esta funcion para reutilizar los actions creator
 que siempre necesitaremos en nuestras peticiones al servidor
*/

export const asyncMac = asyncTypes => ([
  mac(asyncTypes[0]),
  mac(asyncTypes[1], 'payload'),
  mac(asyncTypes[2], 'error'),
])

// Nos permite acoplar reducers, para que se ejecute la acción de alguno
export const reduceReducers = (...reducers) => (state, action) =>
  reducers.reduce((acc, el) => el(acc, action), state)

/* Creamos nuestro reducer de casos o estados de una petición a una API */
const initialFetching = { loading: 'idle', error: null }

/* 
Higher Order Reducers

Nos permiten reutilizar nuestra lógica
de reducers
 */
export const makeFetchingReducer = actions => (state = initialFetching, action) => {
  switch (action.type) {
    case actions[0]: {
      return { ...state, loading: 'pending' }
    }
    case actions[1]: {
      return { ...state, loading: 'succeded' }
    }
    case actions[2]: {
      return { error: action.error, loading: 'rejected' }
    }
    default:
      return state
  }
}

export const makeSetReducer = actions => (state = 'all', action) => {
  switch (action.type) {
    case actions[0]:
      return action.payload
    default:
      return state
  }
}

export const makeCrudReducer = actions => (state = [], action) => {
  switch (action.type) {
    case actions[0]: {
      return state.concat({ ...action.payload })
    }
    case actions[1]: {
      const newEntities = state.map(entity => {
        if (entity.id === action.payload.id) {
          return { ...entity, completed: !entity.completed }
        }
        return entity
      })

      return newEntities
    }
    default:
      return state
  }
}