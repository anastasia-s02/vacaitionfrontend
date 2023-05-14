import React, {useContext, useState} from 'react';
import { AuthContext } from '../App';
import { useNavigate, Redir } from "react-router-dom";
import { db } from '../firebase';
import { getFirestore, setDoc, doc, getDoc, collection, addDoc } from "firebase/firestore";
import '../assets/css/checkin.css'

export default function CheckIn() {
  const navigate = useNavigate();
  const [time, setTime] = useState('');
  const [budget, setBudget] = useState('');
  const [durationTime, setDurationTime] = useState(0);
  const [duration, setDuration] = useState('days'); 
  const [weather, setWeather] = useState('cold');
  const [departFrom, setDepartFrom] = useState('');
  const [transportation, setTransportation] = useState('');
  const [avoid, setAvoid] = useState([]);
  const [checkinobj, setChickinObj] = useState({});

//   get current user from AuthContext
    const {user} = useContext(AuthContext);
    // print user id
    console.log(user.uid);

    const options = [
        {title: '1. Describe yourself.', name: 'description'},
        {title: '2. How old are you?', name: 'age'},
        {title: '3. What are your hobbies?', name: 'hobbies'},
        {title: '4. What type of vacations do you enjoy?', name: 'vacationType'},
        {title: '5. Are you an introvert or an extrovert? How often do you socialize?', name: 'personType'}
    ]

  return(
    <form id='questform'>
        {options.map((option, index) => {
            return (
                <div key={index}>
                    <p>{option.title}</p>
                    <textarea
                        onChange={(e) => {
                            setChickinObj({...checkinobj, [option.name]: e.target.value});
                        }}
                    >
                    </textarea>
                </div>
            )
        })}
        <button style={{marginBlock: '2rem'}} onClick={async (e) => {
            e.preventDefault();
            
            // Assuming you have the user's UID available
            const userUid = user.uid;

            // Create a reference to the parent document 'data/user/id'
            const parentDocRef = doc(db, 'data', userUid);

            // Create a reference to the 'quest' subcollection within the parent document
            const questCollectionRef = collection(parentDocRef, 'info');

            await addDoc(questCollectionRef, checkinobj);
        }}>
            Submit
      </button>
    </form>
  );
};