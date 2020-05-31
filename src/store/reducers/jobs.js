import * as types from '../types'

const initialState = {
  items: [],
  isFetching: false,
  processId: null,
}

const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.JOBS_ISFETCHING:
      return {
        ...state,
        isFetching: action.payload,
      }

    case types.JOBS_SAVE:
      return {
        ...state,
        items: action.payload
      }

    case types.JOBS_SET_PROCESS_ID:
      return {
        ...state,
        processId: action.payload
      }

    default:
      return state
  }
}

export default jobsReducer
