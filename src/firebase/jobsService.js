import firebase from './'

const db = firebase.firestore()

export async function getJobs (processId) {
  const res = await db.collection('jobs').get()
  return res.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    .filter(el => el.processId === processId)
}

export async function createJob (job) {
  const res = await db.collection('jobs').add(job)
  return res
}

export async function removeJobs (processIds) {
  for (let i = 0; i < processIds.length; i++) {
    console.log(processIds[i])
    await db.collection('jobs').doc(processIds[i]).delete()
  }
}
