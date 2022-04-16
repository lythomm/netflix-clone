import Firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const config = {
  apiKey: "AIzaSyBrkf4Dw3PvSNYTzmEYbAnBPXbEbAwPpZY",
  authDomain: "netflix-clone-8a06c.firebaseapp.com",
  projectId: "netflix-clone-8a06c",
  storageBucket: "netflix-clone-8a06c.appspot.com",
  messagingSenderId: "32417568121",
  appId: "1:32417568121:web:14b51b0923aa2133cbcba8"
}

const firebase = Firebase.initializeApp(config)

export { firebase }