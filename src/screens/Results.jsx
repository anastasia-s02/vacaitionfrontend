import React, { useState, useEffect, useRef, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../assets/css/results.css';


export default function Results({ resultsdata }){
    const navigate = useNavigate();
    
    const [travelpressed, setTravelPressed] = useState("Looking for a travel buddy?")

    return(
        <div id='resultscontainer' className='container my-0 mx-auto flex flex-col items-center justify-center'>
            <div className='results-page-title my-12 text-2xl font-medium text-black'>Here are the three destinations you might like!</div>
            <div className='comments-container flex flex-row justify-center gap-8 text-black'>
                {resultsdata.plan && Object.keys(resultsdata.plan[0]["description"]).map((singleRecommendation, index) => {
                    console.log("singleRecommendation:", singleRecommendation)
                    return(
                        <div className='recommendation-border border' key={index}>
                            <div className='recommendation-body p-5'>
                                <div className='recommendation-name text-[1.25rem] font-bold'>
                                    {singleRecommendation}
                                </div>
                                <div className='recommendation-text text-left text-[1rem]'>
                                    <ul>
                                        {resultsdata.plan[0]["description"][singleRecommendation].split("-").map((singleRecommendationText, index) => {
                                            console.log("singleRecommendationText:", singleRecommendationText)
                                            return(
                                                <li key={index}>{singleRecommendationText}</li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <button className='my-8 text-[1.25rem] px-4 text-black' id="find-people" onClick={(e) => {
                setTravelPressed("Loading...")
                // fetch(`https://swappysh--main-py-fastapi-app-dev.modal.run/buddies/${user.uid}}`)
                //     .then(response => response.json())
                //     .then(data => {
                //         // {"u_id": u_id, "buddies": buddies, "user_details": user_details}
                //         console.log(data)
                //         navigate('/people', {state: {buddies: data["buddies"]}})
                //     });allRecommendations
                // pass array of ids from  /people
                navigate('/people', {state: {buddies: ["gjvj8KLRU4SWckjOtCU3FgFxxcQ2", "9REJ7smT7QODUo5n3S2bfmKOlOB2", "AJmz6n46LjXW4d0CPoRTnTwhDon2", "ZLvntZoqq1cQ8GoWFzKH7rayroi1", "w15pIeDlHLURg8eWaCwY9s1BAZt2"]}});
                setTravelPressed("Looking for a travel buddy?")
            }}>
                {travelpressed}
            </button>
        </div>
    )
  }