import { GET_USER } from '../actionTypes'

const initialState = {
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:      
      return action.user
    default:
      return state
  }
}
