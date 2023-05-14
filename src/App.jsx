import React, {createContext, useState} from 'react';
import './assets/css/home.css';
import Routing from './components/global/Routing.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import {auth, db} from './firebase.js';
import { doc, collection, addDoc } from 'firebase/firestore';

export const AuthContext = createContext();

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          await signInWithEmailAndPassword(auth, email, password)
          .then(() => {
            alert('Signed in!', '', [
              { text: 'OK', onClick: () => console.log('User account signed in!')},
            ]);
            return true;
          })
          .catch(error => {
            if (error.code === 'auth/invalid-email') {
              alert('That email address is invalid!', '', [
                { text: 'OK', onClick: () => console.log('That email address is invalid!')},
              ]);
            }
            if (error.code === 'auth/user-not-found') {
              alert('There is no user account linked to this email!', '', [
                { text: 'OK', onClick: () => console.log('There is no user account linked to this email!')},
              ]);
            }
            if (error.code === 'auth/wrong-password') {
              alert('Incorrect password! Please try again.', '', [
                { text: 'OK', onClick: () => console.log('Incorrect password! Please try again.')},
              ]);
            }
            if (error.code === 'auth/user-disabled') {
              alert('This user is currently disabled.', '', [
                { text: 'OK', onClick: () => console.log('This user is currently disabled.')},
              ]);
            }
            console.error(error);
            return false;
          });
        },
        register: async (email, password, someobj) => {
          await createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
              if (someobj) {
                // get user id
                const user = auth.currentUser;
                const userUid = user.uid;
                console.log("current user uid: ", userUid);
                console.log("someobj: ", someobj);

                // Create a reference to the parent document 'data/user/id'
                const parentDocRef = doc(db, 'data', userUid);

                // Create a reference to the 'quest' subcollection within the parent document
                const questCollectionRef = collection(parentDocRef, 'info');
                addDoc(questCollectionRef, someobj);
              }
              console.log('Account created & signed in!')
              alert('Signed in!', '', [
                { text: 'OK', onClick: () => console.log('User account created & signed in!')},
              ]);
            })
            .catch(error => {
              if (error.code === 'auth/email-already-in-use') {
                alert('That email address is already in use!', '', [
                  { text: 'OK', onClick: () => console.log('Email address is already in use')},
                ]);
              }
              if (error.code === 'auth/invalid-email') {
                alert('That email address is invalid!', '', [
                  { text: 'OK', onClick: () => console.log('auth/invalid-email')},
                ]);
              }
              if (error.code === 'auth/operation-not-allowed') {
                alert("Sorry, you can't do that right now.", '', [
                  { text: 'OK', onClick: () => console.log("auth/operation-not-allowed")},
                ]);
              }
              if (error.code === 'auth/weak-password') {
                alert('Please create a stronger password.', '', [
                  { text: 'OK', onClick: () => console.log('Please create a stronger password.')},
                ]);
              }
              console.error(error);
            });
        },
        logout: async () => {
          await signOut(auth)
            .then(() => console.log('Signed out!'))
            .catch(error => {
              console.error(error);
            });
        },
      }}
    >
      <Routing />
    </AuthContext.Provider>
  );
};