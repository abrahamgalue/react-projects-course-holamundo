/*
Es la manera que tiene redux para ejecutar una función en un dispatch
y tener un mayor control
*/
export const asyncMiddleware = store => next => action => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState)
  }
  return next(action)
}