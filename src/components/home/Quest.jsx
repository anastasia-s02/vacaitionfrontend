import React, {useContext, useState} from 'react';
import { AuthContext } from '../../App';
import { useNavigate } from "react-router-dom";
import Select from 'react-select'
import { db } from '../../firebase';
import { getFirestore, setDoc, doc, getDoc, collection, addDoc, getDocs } from "firebase/firestore";
import '../../assets/css/quest.css'

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
  const [finalobj, setfinalobj] = useState({sample: 'sample'});
    const [countries, setCountries] = useState([]);

//   get current user from AuthContext
    const {user} = useContext(AuthContext);
    // print user id
    console.log(user.uid);

    const options = [
        { value: 'Explore historical sites', label: 'Explore historical sites' },
        { value: 'Get adrenaline rush', label: 'Get adrenaline rush' },
        { value: 'Connect with nature', label: 'Connect with nature' },
        { value: 'Meditate', label: 'Meditate' },
        { value: 'Skiing', label: 'Skiing' },
        { value: 'Surfing', label: 'Surfing' },
        { value: 'Being near the beach and ocean', label: 'Being near the beach and ocean' },
        { value: 'Being near the beach and sea', label: 'Being near the beach and sea' },
        { value: 'Being near the lake', label: 'Being near the lake' },
        { value: 'Being in the mountains', label: 'Being in the mountains' },
        { value: 'Spending time in the city', label: 'Spending time in the city' },
        { value: 'Immerse into new culture', label: 'Immerse into new culture' },
        { value: 'Active nightlife', label: 'Active nightlife' },
        { value: 'Other', label: 'Other' }
    ]

  return(
    <form id='questform'>
        <p>1. How do you want to spend your time?</p>
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
        <p>2. What is your desired budget?</p>  
        <input 
            type="range" min="200" max="5000" step="50"
            value={budget} onChange={(e) => {
                setBudget(e.target.value);
                setfinalobj({...finalobj, budget: e.target.value});
            }}
        />
        <input className='shadows' value={budget} onChange={(e) => setBudget(e.target.value)} />
        
        <p>3. For how long are you planning to go?</p>
        <div id='formlength'>
            <input className='shadows' style={{marginRight: '1rem'}} value={durationTime} onChange={(e) => {
                setDurationTime(e.target.value);
                setfinalobj({...finalobj, duration: e.target.value + ' ' + duration});
            }} />  
            <select value={duration} onChange={(e) => {
                console.log("duration is: ", e.target.value)
                setDuration(e.target.value);
            }}>
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
            </select>  
        </div> 
        <p>4. What is your desired weather?</p>
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

        <p>5. Where are you departing from?</p>
        <input
            className='shadows'
            type="text"
            value={departFrom}
            onChange={(e) => {
                setDepartFrom(e.target.value);
                setfinalobj({...finalobj, departFrom: e.target.value});
            }}
        />
        <p>6. List the places that you don't want to go to.</p>
        <textarea
            className='shadows'
            value={avoid.join('\n')}
            onChange={(e) => {
                const placesToAvoid = e.target.value.split('\n').filter(place => place.trim() !== '');
                setAvoid(placesToAvoid);
                setfinalobj({...finalobj, avoid: placesToAvoid});
            }}
        />
        <p>7.What countries do you have passports for? (Including your own country)</p>
        <textarea
            className='shadows'
            value={countries.join('\n')}
            onChange={(e) => {
                const countriesWithPassports = e.target.value.split('\n').filter(country => country.trim() !== '');
                setCountries(countriesWithPassports);
                setfinalobj({...finalobj, countries: countriesWithPassports});
            }}
        />
        <p>8. Any additional info you'd like to add?</p>
        <textarea
            className='shadows'
            value={additionalInfo}
            onChange={(e) => {
                setAdditionalInfo(e.target.value);
                setfinalobj({...finalobj, additionalInfo: e.target.value});
            }}
        />
        <button id='questsubmit' onClick={async (e) => {
            e.preventDefault();
            console.log("finalobj is: ", finalobj);
            
            // Assuming you have the user's UID available
            const userUid = user.uid;

            // Create a reference to the parent document 'data/user/id'
            const parentDocRef = doc(db, 'data', userUid);

            // Create a reference to the 'quest' subcollection within the parent document
            const questCollectionRef = collection(parentDocRef, 'quest');

            await addDoc(questCollectionRef, finalobj);
            
            const myList = {"u_id":"AJmz6n46LjXW4d0CPoRTnTwhDon2", "plan": {"Montreal, Canada": "- Roundtrip bus fare from NY to Montreal: $150\n - Hotel (7 nights): $700\n- Food and entertainment: $500\nActivities:\n- Explore the Underground City and shops\n- Visit Notre-Dame Basilica \n-Check out the nightlife in the Quartier des Spectacles\n- Try poutine, Montreal-style bagels, and maple syrup\n- Take in the views from Mount Royal Park\n" , 
            "Chicago, Illinois": "- Roundtrip train fare from NY to Chicago: $150 \n- Hotel (7 nights): $700\n - Food and entertainment: $500\nActivities: \n- Take in the views from Willis Tower Skydeck\n- Explore Millennium Park and Art Institute of Chicago\n - Bar hop along the Magnificent Mile    \n- Go comedy clubbing at Second City \n- Try deep dish pizza and Chicago-style hot dogs\n",
            "Quebec City, Canada": "- Roundtrip bus fare from NY to Quebec City: $200\n - Hotel (7 nights): $650\n- Food and entertainment: $450 \nActivities:\n- Explore the Old City, a UNESCO World Heritage site\n- Check out the nightlife along Grande-Allée and St-Jean St\n- Visit the Citadelle of Quebec and Battlefields Park \n- Try poutine, tourtière, and maple syrup \n- Go skiing or snowshoeing\n "},
            "user_details": null}
            
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
            navigate("/results", { state: { myList }})
        }}>
            Submit
      </button>
    </form>
  );
};