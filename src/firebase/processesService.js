import firebase from './'

const db = firebase.firestore()

export async function getProcesses () {
  const res = await db.collection('processes').get()
  return res.docs.map(doc => ({ ...doc.data(), id: doc.id }))
}

export async function createProcess (process) {
  const res = await db.collection('processes').add(process)
  return res
}

export async function updateProcess (id, process, jobsCount, status, jobIds) {
  await db.collection('processes').doc(id).set({ ...process, status, jobsCount, jobIds })
}

export async function removeProcess (id) {
  await db.collection('processes').doc(id).delete()
}
