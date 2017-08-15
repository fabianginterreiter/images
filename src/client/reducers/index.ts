import { combineReducers } from 'redux'
import users from './users'
import visibilityFilter from './visibilityFilter'

const usersApp = combineReducers({
  users,
  visibilityFilter
})

export default usersApp
