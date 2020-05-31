import * as types from '../types'

export function fetchingJobs (payload) {
  return {
    type: types.JOBS_ISFETCHING,
    payload,
  }
}

export function saveJobs (processes) {
  return {
    type: types.JOBS_SAVE,
    payload: processes,
  }
}

export function setProcessId (id) {
  return {
    type: types.JOBS_SET_PROCESS_ID,
    payload: id,
  }
}
