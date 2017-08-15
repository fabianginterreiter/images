export const addUser = user => {
  return {
    type: 'ADD_USER',
    user
  }
}

export const setVisibilityFilter = filter => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}
