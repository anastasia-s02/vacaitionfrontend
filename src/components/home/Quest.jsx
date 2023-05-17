import React, {useContext, useState} from 'react';
import { AuthContext } from '../../App';
import { useNavigate } from "react-router-dom";
import Select from 'react-select'
import { db } from '../../firebase';
import { getFirestore, setDoc, doc, getDoc, collection, addDoc, getDocs } from "firebase/firestore";
import '../../assets/css/quest.css'
import { RingLoader } from 'react-spinners';
import { useTransition, animated } from 'react-spring';

export default function Quest() {
    const navigate = useNavigate();
    const [time, setTime] = useState('');
    const [budget, setBudget] = useState(2500);
    const [durationTime, setDurationTime] = useState(0);
    const [duration, setDuration] = useState('days'); 
    const [weather, setWeather] = useState('cold');
    const [departFrom, setDepartFrom] = useState('');
    const [avoid, setAvoid] = useState([]);
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [countries, setCountries] = useState([]);
    const [submitpressed, setSubmitPressed] = useState(false);
    const [finalobj, setfinalobj] = useState({
        time: [],
        budget: 2500,
        durationTime: 0,
        duration: '0 days',
        weather: 'cold',
        departFrom: '',
        avoid: [],
        additionalInfo: '',
        countries: []
    });
    const [transitionDirection, setTransitionDirection] = useState('next'); // or 'prev'
    const questions = [
        { question: '1. How do you want to spend your time?', qterm: 'time' },
        { question: '2. What is your desired budget?', qterm: 'budget' },
        { question: '3. For how long do you want to travel?', qterm: 'durationTime' },
        { question: '4. What is your preferred weather?', qterm: 'weather' },
        { question: '5. Where do you want to depart from?', qterm: 'departFrom' },
        { question: '6. What places do you want to avoid?', qterm: 'avoid' },
        { question: '7. What countries do you want to visit?', qterm: 'countries' },
        { question: '8. Any additional information?', qterm: 'additionalInfo' }
    ]
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const transitions = useTransition(currentQuestion, {
        from: { opacity: 0, transform: transitionDirection === 'next' ? 'translate3d(200%,0,0)' : 'translate3d(-200%,0,0)' },
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
        leave: { opacity: 0, transform: transitionDirection === 'next' ? 'translate3d(-200%,0,0)' : 'translate3d(200%,0,0)' },
        // config: { duration: 5000 },
    })

    const {user} = useContext(AuthContext);
    // print user id
    console.log(user.uid);

    const options = [
        { value: 'Explore historical sites', label: 'Explore historical sites' }, { value: 'Get adrenaline rush', label: 'Get adrenaline rush' }, { value: 'Connect with nature', label: 'Connect with nature' }, { value: 'Meditate', label: 'Meditate' }, { value: 'Skiing', label: 'Skiing' }, { value: 'Surfing', label: 'Surfing' }, { value: 'Being near the beach and ocean', label: 'Being near the beach and ocean' }, { value: 'Being near the beach and sea', label: 'Being near the beach and sea' }, { value: 'Being near the lake', label: 'Being near the lake' }, { value: 'Being in the mountains', label: 'Being in the mountains' }, { value: 'Spending time in the city', label: 'Spending time in the city' }, { value: 'Immerse into new culture', label: 'Immerse into new culture' }, { value: 'Active nightlife', label: 'Active nightlife' }, { value: 'Other', label: 'Other' }
    ]

    return (
        submitpressed ?
            <div id='questouterdiv' className='absolute flex flex-col items-center justify-center top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2'>
                <RingLoader color='#FFA500' loading={true} size={150} />
            </div>
        :
            <form id='questform' className='flex flex-row text-black absolute top-1/2 left-1/2 w-screen'>
                {transitions((style, item) => {
                    console.log("item is: ", item);
                    return (
                        <animated.div style={style} className='absolute'>
                            <p>{questions[item].question}</p>
                            {questions[item].qterm === 'time' && (
                                <Select
                                    isMulti
                                    name="howToSpendTime"
                                    options={options}
                                    onChange={(val) => {
                                        setTime(val.map(v => v.value));
                                        setfinalobj({...finalobj, time: val.map(v => v.value)});
                                    }}
                                    styles={{
                                        container: (provided) => ({
                                            ...provided,
                                            width: '50%',
                                            margin: 'auto',
                                            backgroundColor: 'rgba(255, 255, 255, 0.4)',
                                        }),
                                        input: (provided) => ({
                                            ...provided,
                                            color: 'black',
                                            fontSize: '1rem',
                                        }),
                                    }}
                                />
                            )}
                            {questions[item].qterm === 'budget' && (
                                <div className='flex flex-col items-center justify-center'>
                                    <input
                                        className='!w-full !my-4'
                                        type="range" min="200" max="5000" step="50"
                                        value={budget} onChange={(e) => {
                                            setBudget(e.target.value);
                                            setfinalobj({...finalobj, budget: e.target.value});
                                        }}
                                    />
                                    <input className='shadows !w-full' value={budget} onChange={(e) => setBudget(e.target.value)} />
                                </div>
                            )}
                            {questions[item].qterm === 'durationTime' && (
                                <div id='formlength' className='flex items-center justify-center my-4'>
                                    <input className='shadows' style={{marginRight: '1rem'}} value={durationTime} onChange={(e) => {
                                        setDurationTime(e.target.value);
                                        setfinalobj({...finalobj, duration: e.target.value + ' ' + duration});
                                    }} />  
                                    <select className='ingroupselect mb-0' value={duration} onChange={(e) => {
                                        console.log("duration is: ", e.target.value)
                                        setDuration(e.target.value);
                                    }}>
                                        <option value="days">Days</option>
                                        <option value="weeks">Weeks</option>
                                        <option value="months">Months</option>
                                    </select>  
                                </div>
                            )} 
                            {questions[item].qterm === 'weather' && (
                                <select
                                    value={weather}
                                    onChange={(e) => {
                                        setWeather(e.target.value);
                                        setfinalobj({...finalobj, weather: e.target.value});
                                    }}
                                >
                                    <option value="cold">Cold (less than 45 degrees Fahrenheit)</option>
                                    <option value="warm">
                                    Warm (45 degrees Fahrenheit to 65 degrees Fahrenheit)
                                    </option>
                                    <option value="hot">Hot (more than 65 degrees Fahrenheit)</option>
                                </select>
                            )}
                            {questions[item].qterm === 'departFrom' && (
                                <input
                                    className='shadows !mt-4 min-w-fit'
                                    type="text"
                                    value={departFrom}
                                    onChange={(e) => {
                                        setDepartFrom(e.target.value);
                                        setfinalobj({...finalobj, departFrom: e.target.value});
                                    }}
                                />
                            )}
                            {questions[item].qterm === 'avoid' && (
                                <textarea
                                    className='shadows'
                                    value={avoid.join('\n')}
                                    onChange={(e) => {
                                        const placesToAvoid = e.target.value.split('\n').filter(place => place.trim() !== '');
                                        setAvoid(placesToAvoid);
                                        setfinalobj({...finalobj, avoid: placesToAvoid});
                                    }}
                                />
                            )}
                            {questions[item].qterm === 'countries' && (
                                <textarea
                                    className='shadows'
                                    value={countries.join('\n')}
                                    onChange={(e) => {
                                        const countriesToVisit = e.target.value.split('\n').filter(country => country.trim() !== '');
                                        setCountries(countriesToVisit);
                                        setfinalobj({...finalobj, countries: countriesToVisit});
                                    }}
                                />
                            )}
                            {questions[item].qterm === 'additionalInfo' && (
                                <div className='flex flex-col items-center justify-center'>
                                    <textarea
                                        className='shadows'
                                        value={additionalInfo}
                                        onChange={(e) => {
                                            setAdditionalInfo(e.target.value);
                                            setfinalobj({...finalobj, additionalInfo: e.target.value});
                                        }}
                                    />
                                </div>
                            )}
                            {questions[item].qterm === 'additionalInfo' ? (
                                <button id='questsubmit' className='mb-4 mt-8 text-[1.25rem] shadow-2xl shadow-cyan-500/50 px-4 py-1 text-white' onClick={async (e) => {
                                    e.preventDefault();
                                    setSubmitPressed(true);
                                    console.log("finalobj is: ", finalobj);
                                    
                                    // Assuming you have the user's UID available
                                    const userUid = user.uid;
                
                                    // Create a reference to the parent document 'data/user/id'
                                    const parentDocRef = doc(db, 'data', userUid);
                
                                    // Create a reference to the 'quest' subcollection within the parent document
                                    const questCollectionRef = collection(parentDocRef, 'quest');
                
                                    await addDoc(questCollectionRef, finalobj);
                                    
                                    // local data
                                    // const myList = {"u_id":"AJmz6n46LjXW4d0CPoRTnTwhDon2", "plan": {"Montreal, Canada": "- Roundtrip bus fare from NY to Montreal: $150\n - Hotel (7 nights): $700\n- Food and entertainment: $500\nActivities:\n- Explore the Underground City and shops\n- Visit Notre-Dame Basilica \n-Check out the nightlife in the Quartier des Spectacles\n- Try poutine, Montreal-style bagels, and maple syrup\n- Take in the views from Mount Royal Park\n" , 
                                    // "Chicago, Illinois": "- Roundtrip train fare from NY to Chicago: $150 \n- Hotel (7 nights): $700\n - Food and entertainment: $500\nActivities: \n- Take in the views from Willis Tower Skydeck\n- Explore Millennium Park and Art Institute of Chicago\n - Bar hop along the Magnificent Mile    \n- Go comedy clubbing at Second City \n- Try deep dish pizza and Chicago-style hot dogs\n",
                                    // "Quebec City, Canada": "- Roundtrip bus fare from NY to Quebec City: $200\n - Hotel (7 nights): $650\n- Food and entertainment: $450 \nActivities:\n- Explore the Old City, a UNESCO World Heritage site\n- Check out the nightlife along Grande-Allée and St-Jean St\n- Visit the Citadelle of Quebec and Battlefields Park \n- Try poutine, tourtière, and maple syrup \n- Go skiing or snowshoeing\n "},
                                    // "user_details": null}
                
                                    // local server
                                    fetch(`http://127.0.0.1:8000/plan/${userUid}`)
                                        .then(response => response.json())
                                        .then(myList => {
                                            console.log("data is: ", JSON.parse(myList));
                                            console.log("typeof myList.plan is: ", typeof myList.plan);
                                            console.log("myList.plan is: ", myList.plan);
                                            if (myList.plan && typeof myList.plan === 'object') {
                                                const destinationList = Object.keys(myList.plan).map((destination) => ({
                                                    name: destination,
                                                    description: myList.plan[destination]
                                                }));
                                                myList.plan = destinationList;
                                            }
                                            setSubmitPressed(false);
                                            navigate("/results", { state: { myList }})
                                        })
                
                                    // modal server
                
                                    // fetch(`https://swappysh--main-py-fastapi-app-dev.modal.run/plan/${userUid}}`)
                                    //     .then(response => response.json())
                                    //     .then(myList => {
                                    //         console.log("data is: ", myList);
                                    //         const destinationList = Object.keys(myList.plan).map((destination) => ({
                                    //             name: destination,
                                    //             description: myList.plan[destination]
                                    //         }));
                                    //         myList.plan = destinationList;
                                    //         navigate("/results", { state: { myList }})
                                    //     })
                                    // navigate("/results", { state: { myList }})
                                }}>
                                    Submit
                                </button>
                            ) : questions[item].qterm === 'time' ? (
                                <button id='nextq' className='mb-4 mt-8 text-[1.25rem] shadow-2xl shadow-cyan-500/50 px-4 py-1 text-white' onClick={(e) => {
                                    e.preventDefault();
                                    setTransitionDirection('next');
                                    setCurrentQuestion(currentQuestion + 1);
                                }}>
                                    Next Question
                                </button>
                            ) : (
                                <div className='flex flex-col items-center justify-center'>
                                    <button id='prevq' className='mb-4 mt-8 text-[1.25rem] shadow-2xl shadow-cyan-500/50 px-4 py-1 text-white'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setTransitionDirection('prev');
                                        setCurrentQuestion(currentQuestion - 1);
                                    }}>
                                        Last Question
                                    </button>
                                    <button id='nextq' className='mb-4 mt-8 text-[1.25rem] shadow-2xl shadow-cyan-500/50 px-4 py-1 text-white' onClick={(e) => {
                                        e.preventDefault();
                                        setTransitionDirection('next');
                                        setCurrentQuestion(currentQuestion + 1);
                                    }}>
                                        Next Question
                                    </button>
                                </div>
                            )}
                        </animated.div>
                    )
                })}
            </form>
    );
};