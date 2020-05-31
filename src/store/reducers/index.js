import { combineReducers } from 'redux'
import processes from './processes'
import jobs from './jobs'

export default combineReducers({
  processes,
  jobs,
})
