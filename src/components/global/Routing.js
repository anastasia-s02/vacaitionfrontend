import React, {useContext, useState, useEffect} from 'react';
import {onAuthStateChanged } from 'firebase/auth';
import { AuthContext } from '../../App';
import { HashRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Home from '../../screens/Home';
import Results from '../../screens/results/Results';
import CheckIn from '../../screens/CheckIn';

import { auth, db } from '../../firebase.js';
import SignupScreen from '../../screens/SignUpScreen';
import LoginScreen from '../../screens/LoginScreen';
import Chat from '../../screens/Chat';

export default function Routing() {
  const {user, setUser} = useContext(AuthContext);

  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser); 
    return () => unsubscribe(); 
  }, [])

  return (
    <Router>
      {user ?
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/results' element={<Results />} />
          <Route path="/chat/:recipientId" element={<Chat />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      :
        <Routes>
          <Route exact path='/' element={<SignupScreen />} />
          <Route exact path='/checkin' element={<CheckIn />} />
          <Route exact path='/signin' element={<LoginScreen />} />
        </Routes>
      }
    </Router>
  );
};