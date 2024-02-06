import { firebaseinit } from './firebasecreds.js';
firebaseinit();

// Authentication (The auth)
import{     
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
}
from 'firebase/auth'
const auth = getAuth()

// Listeners
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const signUpButton = document.querySelector('#signUpButton')
const signInButton = document.querySelector('#signInButton')
const signOutButton = document.querySelector('#signOutButton')

// Sign Up
signUpButton.addEventListener('click', ()=>{
    const aemail = email.value
    const apassword = password.value
    createUserWithEmailAndPassword(auth,aemail,apassword)
    .then((cred)=>{
      console.log(cred.user)
      // RESUME: Hide and Show
      document.getElementById('email').remove()
      document.getElementById('password').remove()
      document.getElementById('signUpButton').remove()
      document.getElementById('signInButton').remove()

      document.getElementById('loggedIn').style.display = 'block'
      // NEXT: Warning if email already in database
    })
    .catch((err)=>{
      console.log(err.code + err.message)
    })
  })
  
  // Sign In
  signInButton.addEventListener('click', ()=>{
    const aemail = email.value
    const apassword = password.value
    signInWithEmailAndPassword(auth, aemail, apassword)
    .then(cred =>{
      console.log('user logged in:', cred.user)
      //
      document.getElementById('email').remove()
      document.getElementById('password').remove()
      document.getElementById('signUpButton').remove()
      document.getElementById('signInButton').remove()      
      
      document.getElementById('loggedIn').style.display = 'block'
    })
  })
  
// Sign Out
signOutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      console.log('user signed out')
    })
    .catch(err => {
      console.log(err.message)
    })
})

// User status checker. NEXT› Hide and Show
const unsubAuth = onAuthStateChanged(auth, (user) => {
    console.log('user status changed:', user)
  })