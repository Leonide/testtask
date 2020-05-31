import * as types from '../types'

const initialState = {
  items: [],
  isFetching: false,
}

const processesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PROCESSES_ISFETCHING:
      return {
        ...state,
        isFetching: action.payload,
      }

    case types.PROCESSES_SAVE:
      return {
        ...state,
        items: action.payload
      }

    default:
      return state
  }
}

export default processesReducer
