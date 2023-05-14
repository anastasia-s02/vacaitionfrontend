import React, { useState, useEffect, useRef, useContext } from 'react';
import '../../assets/css/results.css';
import Recommendation from './Recommendation';
import {
  getResults as getResultsApi
} from './api'
import { AuthContext } from '../../App';
import { useLocation, useNavigate } from 'react-router-dom';


export default function Results(){
    const navigate = useNavigate();
    const location = useLocation();
    const {user} = useContext(AuthContext);
    const { myList } = location.state;
    const [allRecommendations, setRecommendations] = useState(myList)
    const [travelpressed, setTravelPressed] = useState("Looking for a travel buddy?")
    const activeRecommendation = null
    console.log("allrec:", allRecommendations)

    // const setChoice = () => {
    //     console.log("set choice func not implemented")
    // };

    // useEffect(() => { 
    //     getResultsApi("give me the top 3 destinations").then((data) => {
    //         setRecommendations(data)
    //         console.log(data)
    //     })
    // }, [])  

    return(
        <div className='container'>
            <div className='results-page-title'>Here are the three destinations you might like!</div>
            <div className='comments-container'>
                {allRecommendations.plan && Object.keys(allRecommendations.plan).map((singleRecommendation, index) => {
                    console.log("singleRecommendation:", singleRecommendation)
                    return(
                        <div className='recommendation-border' key={index}>
                            <Recommendation
                                name={singleRecommendation}
                                description={allRecommendations.plan[singleRecommendation]}
                                activeRecommendation={activeRecommendation}
                                // setChoice={setChoice}
                            />
                        </div>
                    )
                })}
            </div>
            <button id="find-people" onClick={(e) => {
                setTravelPressed("Loading...")
                fetch(`https://swappysh--main-py-fastapi-app-dev.modal.run/buddies/${user.uid}}`)
                    .then(response => response.json())
                    .then(data => {
                        // {"u_id": u_id, "buddies": buddies, "user_details": user_details}
                        console.log(data)
                        navigate('/people', {state: {buddies: data["buddies"]}})
                    });
            }}>
                {travelpressed}
            </button>
        </div>
    )
  }