import React, { useState } from 'react';
import './App.css';
import './index.css';
import Transaction from './Transaction'

import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, setDoc, onSnapshot } from 'firebase/firestore';
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
console.log(firebaseApp);
const auth = getAuth();
const db = getFirestore();
const provider = new GoogleAuthProvider();

let uid = ''

function App() {

  // check for user
  const [user] = useAuthState(auth);
  if (user) {
    uid = user.uid;
    console.log(uid);
    console.log('User is logged in');
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
  let [formValue, setFormValue] = useState('');
  let [countValue, setCountValue]  = useState(0);
  const userRef = doc(db, 'users', uid);

  const saveData = async(e) => {
    e.preventDefault();
      await setDoc(userRef, {
        num: parseInt(formValue)
      }, {merge: true})
    setFormValue('');
  }


  // read data
  onSnapshot(userRef, (doc) => {
    if (doc.exists()) {
      setCountValue(countValue = doc.data().num)
    } else {
      setCountValue(countValue = 0)
    }
  })


  return(
    <>
      <h1>{countValue}</h1>
      
      <form onSubmit={saveData}>
        <input style={{ width: 600 }} type="number" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder='Set your Balance' />
        <br />
        <button type='submit' disabled={!formValue}>Submit</button>
        
      </form>

      <br/>
      <Transaction db={db} uid={uid} userRef={userRef} firebase={firebaseApp}/>
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
