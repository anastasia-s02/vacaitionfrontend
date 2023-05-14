import React, { useEffect, useRef, useContext } from 'react';
import '../assets/css/home.css';
import Typed from "typed.js";
import Quest from '../components/home/Quest';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';


export default function Home(){
  const {logout} = useContext(AuthContext);
  const navigate = useNavigate();
  // Create reference to store the DOM element containing the animation
  const el = useRef(null);
  
  // Create reference to store the Typed instance itself
  const typed = useRef(null);
    
  useEffect(() => {
    const options = {
      strings: [
        'Welcome to vacAItion!'
      ],
      typeSpeed: 45,
      backSpeed: 45,
      loop: true,
    };

    // elRef refers to the <span> rendered below
    typed.current = new Typed(el.current, options);
    
    return () => {
      // Make sure to destroy Typed instance during cleanup
      // to prevent memory leaks
      typed.current.destroy();
    }
  }, [])

  return(
    <div id="homeouterdiv">
      <button id='signoutbutton' onClick={() => logout()}>Sign Out</button>
      <div id='outertyped'>
        <span id='typedvote' className='blinkingorange' ref={el} />
      </div>
      <Quest />
    </div> 
  )
}