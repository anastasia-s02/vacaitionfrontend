import React, { useState, useEffect, useRef, useContext } from 'react';
import '../assets/css/people.css';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../App';

export default function People(){
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const [people, setPeople] = useState([]);
    fetch(`https://localhost:8000/buddies/${user.uid}`)
        .then(response => response.json())
        .then(data => setPeople(data));
    return(
        <div>
            <h1>People</h1>
            <div id="people">
                {people.map((person) => (
                    <div class="person">
                        <h2>{person.name}</h2>
                        <button onClick={() => navigate(`/contact/${person.uid}`)}>Contact</button>
                    </div>
                ))}
            </div>
        </div>
    )
}