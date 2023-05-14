import React, {useContext, useState} from 'react';
import { AuthContext } from '../App';
import { useNavigate } from "react-router-dom";
import '../assets/css/signupscreen.css';
import { useLocation } from 'react-router-dom';

export default function SignupScreen() {
  const location = useLocation();
  // const { passedobj } = location.state;
  // if an object was passed in, it will be stored in passedobj, otherwise passedobj will be undefined
  let passedobj = {};
  // const { passedobj } = location.state;
  if (location.state) {
    passedobj = location.state.passedobj;
  }
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const {register} = useContext(AuthContext);

  return(
    <div id='signupdiv' className='parentdiv'>
      <p id='createacc'>Create an Account</p>
      <form>
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email-address"
          autoCapitalize="none"
          autoCorrect="false"
        />
        <input type='password'
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input type='password'
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />
        <input type='button' onClick={() => {
          if (password !== confirmPassword) {
            alert('Passwords do not match');
          } else if (email.includes('@') !== true && email.includes('.') !== true) {
            alert('Please enter a valid email address');
          } else {
            navigate('/checkin', {state: {email: email, password: password, passedobj: passedobj}})
          }}
        } value='Sign Up'/>
      </form>

      <p>Already have an account?</p>
      <button id='signinbutton' className='buttons' onClick={() => navigate('/signin')}>
        Sign In
      </button>
    </div>
  );
};