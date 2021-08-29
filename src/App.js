import './App.css';
import './index.css';
import Transaction from './Transaction'

import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAKLyeY2FbjFDD57Kp9sGDi8uHg3neXxjI",
  authDomain: "digitots-dev.firebaseapp.com",
  projectId: "digitots-dev",
  storageBucket: "digitots-dev.appspot.com",
  messagingSenderId: "150130182744",
  appId: "1:150130182744:web:216e77264273772c94182d",
  measurementId: "G-RJT8Q1LSXZ"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const provider = new GoogleAuthProvider();


let userId = ''

function App() {
  // check for user
  const [user] = useAuthState(auth);
  if (user) {
    userId = user.uid;
  } else {
    console.log('User not logged in')
  }

  return (
    <div className="App">
      
      <header>
        <h1 className='block text-6xl'>Digitots (beta)</h1>
        <SignOut />
      </header>

      <section>
        {user ? <UserView />: <SignIn />}
      </section>

    </div>
  );
}

function UserView() {
  
  return(
    <>
      <h1>Counter</h1>
      
      <section>
        <form>
          <input type="number" placeholder='Set your Balance'/>
          <button>Submit</button>

        </form>
      </section>
      <br/>
      <Transaction />
    </>
  )
}

function SignIn() {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      console.log(result);
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <button className="blue sign-in btn" onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button className="red sign-out btn" onClick={() => auth.signOut()}>Sign Out</button>
  )
}


export default App;
