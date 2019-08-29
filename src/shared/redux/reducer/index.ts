import { combineReducers } from 'redux'

const mockReducer = (state = {}, action) => {
  return state
}

const rootReducer = () => combineReducers({ mockReducer })

export default rootReducer
