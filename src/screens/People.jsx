import React, { useState, useEffect, useRef, useContext } from 'react';
import '../assets/css/people.css';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../App';
import { collection, getDocs, doc } from "firebase/firestore";
import { db } from '../firebase';
import { useLocation } from 'react-router-dom';

export default function People(){
    const location = useLocation();
    const { buddies } = location.state;
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const [people, setPeople] = useState([]);
    // Assuming you have the user's UID available
    const userUid = user.uid;

    const dataCollectionRef = collection(db, 'data');

    // Fetch all documents in the 'quest' subcollection
    const getQuestDocuments = async () => {
    try {
        const querySnapshot = await getDocs(dataCollectionRef);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
          });
    } catch (error) {
        console.log('Error fetching quest documents:', error);
    }
    };

    // Call the function to fetch the quest documents
    getQuestDocuments();


    // fetch(`https://localhost:8000/buddies/${user.uid}`)
    //     .then(response => response.json())
    //     .then(data => setPeople(data));
    // 
    return(
        <div style={{minHeight: '100vh'}}>
            <h1>People</h1>
            <div id="people">
                {buddies.map((person) => (
                    <div class="person">
                        <h2>{person.name}</h2>
                        <button onClick={() => navigate(`/contact/${person.uid}`)}>Contact</button>
                    </div>
                ))}
            </div>
        </div>
    )
}