import React, {useContext, useState} from 'react';
import { AuthContext } from '../App';
import { useNavigate, Redir } from "react-router-dom";
import { db } from '../firebase';
import { getFirestore, setDoc, doc, getDoc, collection, addDoc } from "firebase/firestore";
import { useLocation } from 'react-router-dom';
import '../assets/css/checkin.css'

export default function CheckIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password, passedobj } = location.state;
  const [checkinobj, setChickinObj] = useState(passedobj);
    const {register} = useContext(AuthContext);

    const options = [
        {title: '1. Describe yourself.', name: 'description'},
        {title: '2. How old are you?', name: 'age'},
        {title: '3. What are your hobbies?', name: 'hobbies'},
        {title: '4. What type of vacations do you enjoy?', name: 'vacationType'},
        {title: '5. Are you an introvert or an extrovert? How often do you socialize?', name: 'personType'}
    ]

  return(
    <form id='checkinform'>
        <div className="pagetitle">
            Welcome!
        </div>
        <div className="subtitle">
            Let's get you set up!
        </div>
        {options.map((option, index) => {
            return (
                <div key={index}>
                    <p className='questtitle'>{option.title}</p>
                    <div className="textbox">
                        <textarea
                            onChange={(e) => {
                                setChickinObj({...checkinobj, [option.name]: e.target.value});
                            }}
                        >
                        </textarea>
                    </div>
                </div>
            )
        })}
        <button id="checkinsubmit" onClick={async (e) => {
                e.preventDefault();
                register(email, password, checkinobj)
                    .then((bool) => {
                        if (!bool) {
                            console.log("passing checkinobj: ", checkinobj)
                            navigate('/', {state: checkinobj})
                        }
                    })
            }}>
                Submit
        </button>
    </form>
  );
};