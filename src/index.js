import { firebaseinit } from './firebasecreds.js'
import { initializeApp } from 'firebase/app'
firebaseinit()

// ::::::AUTHENTICATION:::::: (The auth)
// The plan: Auth checker, Anonymous login, the Signs
import{     
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
}
from 'firebase/auth'
const auth = getAuth()
// User status checker, ie auth flow controller
onAuthStateChanged(auth, (user) => {
  user ? (
    document.querySelector('#uid').textContent = user.email,
    document.querySelector('#signedOut').style.display = 'none',
    document.querySelector('#signedIn').style.display = 'block'
    console.log(user.uid)
  ) : (
    signInAnonymously(auth)
    .then(() => {
      console.log(user.uid)
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
    })
  )
  })
// HTML Field Listeners
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
      console.log('USER CREATED' + user.uid)
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
    console.log('USER LOGGED IN' + user.uid)
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

// ::::::FIRESTORE:::::: (The db)
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot
} from 'firebase/firestore'
const db = getFirestore()

const colRef = collection(db, 'METAS')
getDocs(colRef)
.then((snapshot) => {
  let meta = snapshot.docs[0].data().DESCRIPTION
  document.getElementById('goalBuilder').value = meta
  })
  .catch(err => {
    console.log(err.message)
  })

// This should resize the area
const textarea = document.querySelector('#goalBuilder');
function autoResize() {
  this.style.height = 'auto';
  this.style.height = this.scrollHeight + 'px';
}
textarea.addEventListener('input',autoResize)  
// ::::::AI WORK:::::: (The ai)
// *shruggies*