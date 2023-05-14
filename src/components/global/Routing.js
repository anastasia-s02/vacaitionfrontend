import React, {useContext, useState, useEffect} from 'react';
import {onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { AuthContext } from '../../App';
import { HashRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Home from '../../screens/Home';
import Results from '../../screens/results/Results';
import CheckIn from '../../screens/CheckIn';

import { auth, db } from '../../firebase.js';
import SignupScreen from '../../screens/SignUpScreen';
import LoginScreen from '../../screens/LoginScreen';

export default function Routing() {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  const [firsttime, setFirstTime] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser); 
    return () => unsubscribe(); 
  }, [])

  // if user id is the name of a document in data, then set firsttime to false
  useEffect(() => {
    const checkDocumentExistence = async () => {
      if (user) {
        setIsLoading(true);
        // Assuming you have the user's UID available
        const userUid = user.uid;

        // Create a reference to the parent document 'data/user/id'
        const parentDocRef = doc(db, 'data', userUid);

        // try {
        //   const docSnapshot = await getDoc(parentDocRef);
        //   if (docSnapshot.exists()) {
        //     console.log("document exists")
        //     setFirstTime(false);
        //     throw new Error('Document does not exist!');
        //   }
        // } catch (error) {
        //   // Handle the error
        //   alert('Error checking document existence:', error);
        //   console.log('Error checking document existence:', error);
        // } finally {
        //   setIsLoading(false);
        //   console.log("first time is", firsttime);
        // }
        try {
          const docSnapshot = await getDoc(parentDocRef);
          if (docSnapshot.exists()) {
            console.log("document exists");
            setFirstTime(true); // Set firsttime to true when the document exists
          } else {
            console.log("document does not exist");
            setFirstTime(false); // Set firsttime to false when the document does not exist
          }
        } catch (error) {
          // Handle the error
          alert('Error checking document existence:', error);
          console.log('Error checking document existence:', error);
        } finally {
          setIsLoading(false);
          console.log("firsttime is", firsttime); // This may still log the previous value of firsttime due to async nature of state updates
        }
      }
    }
    checkDocumentExistence();
  }, [user])

  if (isLoading) {
    // Render a loading state, e.g., a spinner or a "Loading..." message
    return <div>Loading...</div>;
  }

  return (
    <Router>
      {user ?
        <Routes>
          <Route exact path='/' element={
            firsttime ? <CheckIn /> : <Home />
            // <CheckIn />
          } />
          <Route exact path='/results' element={<Results />} />
        </Routes>
      :
        <Routes>
          <Route exact path='/' element={<SignupScreen />} />
          <Route exact path='/signin' element={<LoginScreen />} />
        </Routes>
      }
    </Router>
  );
};