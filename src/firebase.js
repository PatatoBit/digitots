import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const config = {
  apiKey: "AIzaSyAKLyeY2FbjFDD57Kp9sGDi8uHg3neXxjI",
  authDomain: "digitots-dev.firebaseapp.com",
  projectId: "digitots-dev",
  storageBucket: "digitots-dev.appspot.com",
  messagingSenderId: "150130182744",
  appId: "1:150130182744:web:216e77264273772c94182d",
  measurementId: "G-RJT8Q1LSXZ"
};

const app = initializeApp(config);

export const auth = getAuth(app)
export const db = getFirestore(app)