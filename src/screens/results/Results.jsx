import React, { useState, useEffect, useRef } from 'react';
import '../../assets/css/results.css';
import Recommendation from './Recommendation';
import {
  getResults as getResultsApi
} from './api'


export default function Results(){
    const [allRecommendations, setRecommendations] = useState([])
    const activeRecommendation = null

    const setChoice = () => {
        console.log("set choice func not implemented")
    };

    const prompt = "give me the top 3 destinations"

    useEffect(() => {
        getResultsApi(prompt).then((data) => {
          setRecommendations(data)
          console.log(data)
        })
      }, [prompt]);

    // getResultsApi(prompt).then((data) => {
    //     setRecommendations(data)
    //     console.log(data)
    // })

    return(
        <div className='container'>
            <div className='results-page-title'>Here are the three destinations you might like!</div>
            <div className='comments-container'>
                {allRecommendations.plan.map((singleRecommendation) => (
                    <div className='recommendation-border'>
                        <Recommendation
                            name={singleRecommendation.name}
                            description={singleRecommendation.description}
                            activeRecommendation={activeRecommendation}
                            setChoice={setChoice}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
  }