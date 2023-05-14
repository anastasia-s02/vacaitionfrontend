import '../../assets/css/results.css';

const Recommendation = ({
    name,
    description,
    activeRecommendation,
    setChoice
}) => {
    return(
        <div className='recommendation-body'>
            <div className='recommendation-name'>
                {name}
            </div>
            <div className='recommendation-text'>
                {description}
            </div>
        </div>
    )
}

export default Recommendation