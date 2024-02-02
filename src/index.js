import { firebaseinit } from './firebasecreds.js';
firebaseinit();

const email = document.querySelector('#email')
const password = document.querySelector('#password')
const signUpButton = document.querySelector('#signUpButton')
const signInButton = document.querySelector('#signInButton')

// Sign Up
signUpButton.addEventListener('click', ()=>{
    const aemail = email.value
    const apassword = password.value
    createUserWithEmailAndPassword(auth,aemail,apassword)
    .then((cred)=>{
      console.log(cred.user)
      // RESUME: Hide\Show\Sh
      document.getElementById("email").remove()
      document.getElementById("password").remove()
      document.getElementById("signUpButton").remove()
      document.getElementById("signInButton").remove()
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
      document.getElementById("email").remove()
      document.getElementById("password").remove()
      document.getElementById("signUpButton").remove()
      document.getElementById("signInButton").remove()
    })
  })

// Sign Out
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      console.log('user signed out')
    })
    .catch(err => {
      console.log(err.message)
    })
})

// subscribing to auth changes
const unsubAuth = onAuthStateChanged(auth, (user) => {
    console.log('user status changed:', user)
  })