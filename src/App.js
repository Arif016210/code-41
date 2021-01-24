import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config"
import { useState } from 'react';


firebase.initializeApp(firebaseConfig);

function App() {

  const provider = new firebase.auth.GoogleAuthProvider();
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  })

  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
      .then(res => {
        const { displayName, email, photoURL } = res.user
        const signInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signInUser)

      })
      .catch(err => {
        console.log(err)
        console.log(err.message);
      })

  }

  const handleSignOut = () => {
    firebase.auth().signOut()
      .then(user => {
        const signOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          photo: ''
        }
        setUser(signOutUser)
      })
      .catch(err => {
        console.log(err)
        console.log(err.message);
      })
  }




  return (
    <div className="App">
      {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign out</button> :
          <button onClick={handleSignIn}>Sign in</button>
      }

      {
        user.isSignedIn && <div>
          <h2>Welcome, {user.name} </h2>
          <p>Email: {user.email}</p>
          <img src={user.photo} alt="Email Photo" />
        </div>
      }

    </div>
  );
}

export default App;
