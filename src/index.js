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

// User status checker. NEXT› Be the ONLY Hide and Show controller
const unsubAuth = onAuthStateChanged(auth, (user) => {
    console.log(user.email)
  })

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
      console.log('USER CREATED')
      // RESUME: Hide and Show
      document.getElementById('email').remove()
      document.getElementById('password').remove()
      document.getElementById('signUpButton').remove()
      document.getElementById('signInButton').remove()

      document.getElementById('loggedIn').style.display = 'block'
      // NEXT:
        // Say hi - loggedInGreeting innerhtml
        // Warning if email already in database
    })
    .catch((err)=>{
      // NEXT: Specific warnings in UX
      console.log(err.code + err.message)
    })
  })
  
  // Sign In
  signInButton.addEventListener('click', ()=>{
    const aemail = email.value
    const apassword = password.value
    signInWithEmailAndPassword(auth, aemail, apassword)
    .then(cred =>{
      console.log('USER LOGGED IN')
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
      console.log('USER SIGNED OUT')
    })
    .catch(err => {
      console.log(err.message)
    })
})

// NEXT› Unsubscribe from changes?