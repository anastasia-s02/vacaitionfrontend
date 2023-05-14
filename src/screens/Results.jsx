import React, { useState, useEffect, useRef } from 'react';
import { AuthContext } from '../App';
import { useNavigate } from "react-router-dom";
import '../assets/css/results.css';
import Recommendation from './Recommendation';
// import {getResults as getResultsApi} from './api';


export default function Results(){
    const [allRecommendations, setRecommendations] = useState([])
    const recommendations = allRecommendations
    const activeRecommendation = null
    const currentUserId = 1

    const setChoice = () => {
        console.log("set choice func not implemented")
    };

    const prompt = "give me the top 3 destinations";

    useEffect(() => {
        // getResultsApi(prompt).then((data) => {
        //   setRecommendations(data)
        //   console.log(data)
        // })
    }, [prompt]);


    console.log(recommendations);

    // with backend setup
    // fetch('http://localhost:8000/api/prompt', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({prompt: prompt}),
    // })
    // .then((response) => response.json())
    // .then((data) => {
    //     console.log('Success:', data);
    // })
    // .catch((error) => {
    //     console.error('Error:', error);
    // });

    // getResultsApi(prompt).then((data) => {
    //     setRecommendations(data)
    //     console.log(data)
    // })

    return(
        <div className='container'>
            <div className='results-page-title'>Here are the three destinations you might like!</div>
            <div className='comments-container'>
                {allRecommendations.map((singleRecommendation) => (
                    <div className='recommendation-border'>
                        <Recommendation
                            key={singleRecommendation.id}
                            recommendation={singleRecommendation}
                            activeRecommendation={activeRecommendation}
                            setChoice={setChoice}
                            currentUserId={currentUserId}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}