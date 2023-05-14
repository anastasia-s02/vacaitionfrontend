import React, {useContext, useState} from 'react';
import { AuthContext } from '../App.jsx';
import { sendPasswordResetEmail  } from 'firebase/auth';
import {auth} from '../firebase.js';
import { useNavigate } from 'react-router-dom';

export default function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const {login} = useContext(AuthContext);

  return (
    <div className='parentdiv'>
      <form id='loginform'>
        <label id='loginlabel'>Email</label>
        <input
          onChange={(userEmail) => setEmail(userEmail)}
          placeholder="Email"
          type="email-address"
          autoCapitalize="none"
        />
        <label id='loginlabel'>Password</label>
        <input
          type='password'
          onChange={(userPassword) => setPassword(userPassword)}
          placeholder="Password"
        />
        <button onClick={() => login(email, password)}>Sign In</button>
      </form>

      <button className='buttons' onClick={
        async() => await sendPasswordResetEmail(auth, email)
          .then(() => {
            if (email.includes('@') && email.includes('.com')) {
              alert("Your password reset has been sent to your email", '', [
                { text: 'OK', onClick: () => console.log('Your password reset has been sent to your email')},
              ])
            }
            else{
              alert("Please enter a valid email.", '', [
                { text: 'OK', onClick: () => console.log('Invalid email')},
              ])
            }
          })
          .catch(e => {
            if (e.code === 'auth/invalid-email'){
              alert("Please enter a valid email.", '', [
                { text: 'OK', onClick: () => console.log('Invalid email')},
              ])
            }
          })
      }>
        Forgot Password?
      </button>

      <button className='buttons' onClick={() => navigate('/')}>
        Don't have an account? Create here
      </button>
    </div>
  );
};