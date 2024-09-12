import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MESUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const db = getFirestore(app)
const rtdb = getDatabase(app)
const auth = getAuth(app)
auth.languageCode = "en"
const functions = getFunctions(app, 'europe-west1')
const storage = getStorage(app)
const googleProvider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider()

try {
  const ping = new XMLHttpRequest()
  ping.timeout = 9000
  ping.open('GET', 'http://localhost:3001', true)
  ping.send()
  ping.onreadystatechange = function () {
    // only connect to the emulator if it is active
    const e = ping.status === 200
    console.log(e ? 'Backend Firebase emulator active' : `Connected to backend: ${firebaseConfig.projectId}`)
    if (ping.readyState === 4 && e) {
      connectAuthEmulator(auth, 'http://localhost:3001')
      connectFunctionsEmulator(functions, 'localhost', 3002)
      connectFirestoreEmulator(db, 'localhost', 3003)
      connectDatabaseEmulator(rtdb, 'localhost', 3004)
    }
  }
} catch (error: unknown) {
  if (typeof error === "string") {
    console.error(error)
  } else if (error instanceof Error) {
    console.error('Firebase initialization error', error.stack)
  }
}

export {
  auth,
  googleProvider,
  facebookProvider,
  functions,
  db,
  rtdb,
  storage,
  analytics,
  app
}