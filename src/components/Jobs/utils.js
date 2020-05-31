import { getJobs } from '../../firebase/jobsService'
import { fetchingJobs, saveJobs } from '../../store/actions/jobs'

export function getAllJobs (id) {
  return async dispatch => {
    try {
      if (id) {
        dispatch(fetchingJobs(true))
        const data = await getJobs(id)
        dispatch(saveJobs(data))
        dispatch(fetchingJobs(false))
      }
    } catch (error) {
      dispatch(fetchingJobs(false))
      console.log('getAllJobs error: ' + error)
    }
  }
}

export function getJobsInsensibly (id) {
  return async dispatch => {
    try {
      if (id) {
        const data = await getJobs(id)
        dispatch(saveJobs(data))
      }
    } catch (error) {
      console.log('getAllProcesses error: ' + error)
    }
  }
}
