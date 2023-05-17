import React, { useState, useEffect, useRef, useContext } from 'react';
import Typed from "typed.js";
import Quest from '../components/home/Quest';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';
import Results from './Results';
import { RingLoader } from 'react-spinners';
import { db } from '../firebase';
import { getFirestore, setDoc, doc, getDoc, collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import '../assets/css/home.css';


export default function Home(){
  const {logout} = useContext(AuthContext);
  const [questcomplete, setQuestComplete] = useState(null);
  const [resultsobj, setResultsObj] = useState(null);
  // Create reference to store the DOM element containing the animation
  const el = useRef(null);
  
  // Create reference to store the Typed instance itself
  const typed = useRef(null);
  const {user} = useContext(AuthContext);
    
  useEffect(() => {
    const options = {
      strings: [
        'Welcome to vacAItion!'
      ],
      typeSpeed: 45,
      backSpeed: 45,
      loop: true,
    };

    // elRef refers to the <span> rendered below
    typed.current = new Typed(el.current, options);
    
    return () => {
      // Make sure to destroy Typed instance during cleanup to prevent memory leaks
      typed.current.destroy();
    }
  }, [])

  useEffect(() => {
    if (questcomplete) {
      getQuestData();
    }

    async function getQuestData() {
      const userUid = user.uid;
      const parentDocRef = doc(db, 'data', userUid);
      const questCollectionRef = collection(parentDocRef, 'quest');
      await addDoc(questCollectionRef, {...questcomplete, timestamp: serverTimestamp()});
      
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
          const jsoncall = JSON.parse(myList);
          console.log("typeof myList.plan is: ", typeof jsoncall.plan);
          console.log("myList.plan is: ", jsoncall.plan);
          if (jsoncall.plan && typeof jsoncall.plan === 'object') {
            const destinationList = Object.keys(jsoncall.plan).map((destination) => ({
              name: destination,
              description: jsoncall.plan[destination]
            }));
            jsoncall.plan = destinationList;
            console.log("resultsobj is: ", jsoncall);
            setResultsObj(jsoncall);
          }
        })
        .catch(error => {
          console.log(error);
          alert("Someone else is generating their destinations right now. Please try again in a bit!");
        });
    }
    
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
  }, [questcomplete])

  return(
    <div id="homeouterdiv">
      <button id='signoutbutton' onClick={() => logout()}>Sign Out</button>
      <div id='outertyped'>
        <span id='typedvote' className='blinkingorange' ref={el} />
      </div>
      {questcomplete ?
        resultsobj ?
          <Results resultsdata={resultsobj} />
        :
          <div id='questouterdiv' className='absolute flex flex-col items-center justify-center top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2'>
            <RingLoader color='#FFA500' loading={true} size={150} />
          </div>
      :
        <Quest questfunc={setQuestComplete} />
      }
    </div> 
  )
}