export default function Recommendation({key, recommendation, activeRecommendation, setChoice, currentUserId}) {
    return(
        <div className='frame'>
            <textarea
                className='recommendationBody'
                value={recommendation.content}
            />
        </div>
    )
}