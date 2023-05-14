import React, {useContext, useState} from 'react';
import { AuthContext } from '../App';
import { useNavigate } from "react-router-dom";
import '../assets/css/signupscreen.css';

export default function SignupScreen() {
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
        <input type='button' onClick={() => register(email, password)} value='Sign Up'/>
      </form>

      <p>Already have an account?</p>
      <button id='signinbutton' className='buttons' onClick={() => navigate('/signin')}>
        Sign In
      </button>
    </div>
  );
};