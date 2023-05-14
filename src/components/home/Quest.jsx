import React, {useContext, useState} from 'react';
import { AuthContext } from '../../App';
import { useNavigate } from "react-router-dom";
import Select from 'react-select'
import { db } from '../../firebase';
import { getFirestore, setDoc, doc, getDoc, collection, addDoc } from "firebase/firestore";
import '../../assets/css/quest.css'

export default function Quest() {
  const navigate = useNavigate();
  const [time, setTime] = useState('');
  const [budget, setBudget] = useState(2500);
  const [durationTime, setDurationTime] = useState(0);
  const [duration, setDuration] = useState('days'); 
  const [weather, setWeather] = useState('cold');
  const [departFrom, setDepartFrom] = useState('');
  const [transportation, setTransportation] = useState('');
  const [avoid, setAvoid] = useState([]);
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

        <p>6. What are your desired modes of transportation to get to the destination?</p>
        <Select
            isMulti
            name="transportationModes"
            options={[
                { value: 'Train', label: 'Train' },
                { value: 'Car', label: 'Car' },
                { value: 'Plane', label: 'Plane' },
                { value: 'Ship', label: 'Ship' },
                { value: 'Bus', label: 'Bus' },
            ]}
            onChange={(val) => {
                setTransportation(val.map((v) => v.value));
                setfinalobj({...finalobj, transportation: val.map((v) => v.value)});
            }}
        />
        <p>7. List the places that you don't want to go to.</p>
        <textarea
            className='shadows'
            value={avoid.join('\n')}
            onChange={(e) => {
                const placesToAvoid = e.target.value.split('\n').filter(place => place.trim() !== '');
                setAvoid(placesToAvoid);
                setfinalobj({...finalobj, avoid: placesToAvoid});
            }}
        />
        <p>8.What countries do you have passports for? (Including your own country)</p>
        <textarea
            className='shadows'
            value={countries.join('\n')}
            onChange={(e) => {
                const countriesWithPassports = e.target.value.split('\n').filter(country => country.trim() !== '');
                setCountries(countriesWithPassports);
                setfinalobj({...finalobj, countries: countriesWithPassports});
            }}
        />
        <button style={{marginBlock: '2rem'}} onClick={async (e) => {
            e.preventDefault();
            console.log("finalobj is: ", finalobj);
            
            // Assuming you have the user's UID available
            const userUid = user.uid;

            // Create a reference to the parent document 'data/user/id'
            const parentDocRef = doc(db, 'data', userUid);

            // Create a reference to the 'quest' subcollection within the parent document
            const questCollectionRef = collection(parentDocRef, 'quest');

            await addDoc(questCollectionRef, finalobj);
            fetch(`http://localhost:8000/plan/${user.uid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => res.json())
            .then((data) => {
                console.log("gotten data:", data);
            })
        }}>
            Submit
      </button>
    </form>
  );
};