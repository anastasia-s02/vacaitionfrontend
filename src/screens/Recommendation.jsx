import '../assets/css/results.css';

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
            <br/>
            <div className='recommendation-text'>
                {description}
                {/* {
                    description.split('\n').map((item, key) => {
                        return <span key={key}>{item}<br/><br/></span>
                    } )
                } */}
            </div>
        </div>
    )
}

export default Recommendation