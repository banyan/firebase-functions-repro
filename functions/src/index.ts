import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
})

export const helloWorld = functions.region('europe-west1').https.onRequest((request, response) => {
  const config = functions.config()
  response.send(
    `functions.config() content:\n${JSON.stringify(config, null, 2)}\nprocess.env: ${JSON.stringify(
      process.env,
      null,
      2,
    )}`,
  )
})
