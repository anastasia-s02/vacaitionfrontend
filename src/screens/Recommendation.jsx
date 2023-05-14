export default function Recommendation({key, recommendation, activeRecommendation, setChoice, currentUserId}) {
    return(
        <div className='recommendation-body'>
            <div className='recommendation-text'>
                {recommendation.content}
            </div>
        </div>
    )
}