import React, { useState } from 'react';
import './App.css';
import './index.css';

import Transaction from './components/Transaction';
import Nav from './components/Nav';
import Shop from './components/Shop';
import About from './components/About';
import Admin from './components/Admin';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

import {auth, db} from "./firebase.js";
const provider = new GoogleAuthProvider();

let uid = ''

function App() {
  
  return (
    <div className="App">
      
      <header>
        <Router>
          <Nav />
          
          <Switch>
            
            <Route path='/' exact component={MainView} />
            <Route path="/about" component={About}/>
            <Route path='/shop' component={Shop}/>
            <Route path='/admin' component={Admin}/>
            
            <Route
              path='/portal'
              render={(props) => (
                <Transaction {...props} uid={uid} />
              )}
            />
            

          </Switch>
           
        </Router>
      </header>

      
    </div>
  );
}

function MainView() {
  const [user] = useAuthState(auth);

  if (user) {
    uid = user.uid;
    console.log(uid);
    console.log('User is logged in');
  } else {
    console.log('User not logged in')
  }
  return (
    <>
      <h1 className='block text-6xl'>Digitots (beta)</h1>
      <SignOut />

      <section>
          {user ? <UserView />: <SignIn />}
      </section>
    </>
  )
}

function UserView() {
  let [formValue, setFormValue] = useState('');
  let [countValue, setCountValue]  = useState(0);
  const userRef = doc(db, 'users', uid)
  
  // set your own num for now

  const saveData = async(e) => {
    e.preventDefault();
      await setDoc(userRef, {
        num: parseInt(formValue)
      }, {merge: true})
    setFormValue('');
  }


  // read data realtime
  onSnapshot(userRef,(doc) => {
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
        <button className='btn' type='submit'>Submit</button>
        
      </form>

      <br/>
    </>
  )
}

// sign in with google
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

// signout
function SignOut() {
  return auth.currentUser && (
    <button className="red sign-out btn" onClick={() => auth.signOut()}>Sign Out</button>
  )
}


export default App;
