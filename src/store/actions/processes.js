import * as types from '../types'

export function fetchingProcesses (payload) {
  return {
    type: types.PROCESSES_ISFETCHING,
    payload,
  }
}

export function saveProcesses (processes) {
  return {
    type: types.PROCESSES_SAVE,
    payload: processes,
  }
}
