import { format } from 'date-fns'
import { fetchingProcesses, saveProcesses } from '../../store/actions/processes'
import { setProcessId, saveJobs } from '../../store/actions/jobs'
import { getProcesses, createProcess, updateProcess, removeProcess } from '../../firebase/processesService'
import { createJob, removeJobs } from '../../firebase/jobsService'

export function getAllProcesses () {
  return async dispatch => {
    try {
      dispatch(fetchingProcesses(true))
      const data = await getProcesses()
      dispatch(saveProcesses(data))
      dispatch(fetchingProcesses(false))
    } catch (error) {
      dispatch(fetchingProcesses(false))
      console.log('getAllProcesses error: ' + error)
    }
  }
}

export function getProcessesInsensibly () {
  return async dispatch => {
    try {
      const data = await getProcesses()
      dispatch(saveProcesses(data))
    } catch (error) {
      console.log('getAllProcesses error: ' + error)
    }
  }
}

export function createNewProcess (name) {
  return async dispatch => {
    try {
      dispatch(fetchingProcesses(true))
      const process = {
        name,
        startTime: format(new Date(), 'dd.LL.yyyy'),
      }
      const data = await createProcess(process)

      const jobs = generateJobs(data.id)
      const jobIds = []

      for (let i = 0; i < jobs.length; i++) {
        const res = await createJob(jobs[i])
        jobIds.push(res.id)
      }

      await updateProcess(data.id, process, jobs.length, defineStatus(jobs), jobIds)
      dispatch(fetchingProcesses(false))
    } catch (error) {
      dispatch(fetchingProcesses(false))
      console.log('createNewProcess error: ' + error)
    }
  }
}

export function removeParticularProcess (id, jobIds) {
  return async dispatch => {
    try {
      dispatch(fetchingProcesses(true))
      await removeProcess(id)
      await removeJobs(jobIds)
      dispatch(setProcessId(null))
      dispatch(saveJobs([]))
      dispatch(fetchingProcesses(false))
    } catch (error) {
      dispatch(fetchingProcesses(false))
      console.log('removeParticularProcess error: ' + error)
    }
  }
}

export function selectTheProcess (id) {
  return dispatch => {
    try {
      dispatch(setProcessId(id))
    } catch (error) {
      console.log('selectTheProcess error: ' + error)
    }
  }
}

const names = ['Doobey','Frazyone','TwoHart','Dragonfly','Clonetto','MassMist','MissClick','GrayMore','Voolzie','ToneRose','DoomDust','Vegiterro','Independer','Cyndega','Testeller','Dihot','Taklebocks','Lordexx','LittleMesh','Dimplicity','MaxPoor','AngelFlax','HoneyLite','Brutaller','Applegg','Prophicient','Hipsterion','Littlety','Skyably','Sneruss','Darexx','Twilflo','Freemio','Fruneto','RevermOnk','Lillyhyde','Deliry','MarkLift','Liftsall','Fliponez']

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max)) + 1

const randomItem = arr => arr[(Math.random() * arr.length) | 0]

function generateJobs (processId) {
  const statuses = ['running', 'successed', 'failed']
  const jobs = []

  Array(getRandomInt(10)).fill(null).forEach(el => {
    jobs.push({
      processId,
      name: randomItem(names),
      status: randomItem(statuses),
    })
  })

  return jobs
}

function defineStatus (jobs) {
  let status = 'undef'
  jobs.forEach(job => {
    if (job.status === 'running') {
      status = 'running'
    }
  })

  const isSuccessed = jobs.every(val => val.status === 'successed')
  if (isSuccessed) status = 'successed'

  const isFailed = jobs.every(val => val.status === 'failed')
  if (isFailed) status = 'failed'

  return status
}
