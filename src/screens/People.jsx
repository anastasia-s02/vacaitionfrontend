import React, { useState, useEffect, useRef, useContext } from 'react';
import '../assets/css/people.css';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../App';
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from '../firebase';
import { useLocation } from 'react-router-dom';

export default function People(){
    const location = useLocation();
    const { buddies } = location.state;
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const [people, setPeople] = useState([]);
    // Assuming you have the user's UID available
    const userUid = user.uid;

    const dataCollectionRef = collection(db, 'data');

    // Fetch all documents in the 'quest' subcollection
    // const getQuestDocuments = async () => {
    // try {
    //     const querySnapshot = await getDocs(dataCollectionRef);
    //     querySnapshot.forEach((doc) => {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.id, " => ", doc.data());
    //     });
    // } catch (error) {
    //     console.log('Error fetching quest documents:', error);
    // }
    // };
    useEffect(() => {
        getQuestDocuments(buddies)
        .then((data) => {
            setPeople(data);
        })
    }, []);

    const getQuestDocuments = async (userIds) => {
        try {
            const promises = userIds.map(async (userId) => {
                const userDocRef = doc(db, 'data', userId);
                const userDocSnapshot = await getDoc(userDocRef);
                
                if (userDocSnapshot.exists()) {
                    const infoDocRef = doc(userDocRef, 'info');
                    const infoDocSnapshot = await getDoc(infoDocRef);
            
                    if (infoDocSnapshot.exists()) {
                    return infoDocSnapshot.data();
                    } else {
                    return null;
                    }
                }
                else {
                    return null;
                }
            });

            const results = await Promise.all(promises);
            return results.filter((data) => data !== null);
        } catch (error) {
            console.log('Error fetching quest documents:', error);
            return [];
        }
};

// Usage:
// const userIds = ['gjvj8KLRU4SWckjOtCU3FgFxxcQ2', 'anotherUserId']; // Replace with actual user IDs
// const questDocuments = await getQuestDocuments(userIds);
// console.log('Quest documents:', questDocuments);



    // const getQuestDocuments = async (passedarr) => {
    //     return passedarr.map((item) => {
    //         const infoDocRef = doc(db, 'data', item, 'info');
    //         const docSnapshot = getDoc(infoDocRef);
    //         return docSnapshot.data();
    //     });
        // const infoDocRef = doc(db, 'data', userUid, 'info');
        // const docSnapshot = await getDoc(infoDocRef);
        // return docSnapshot.data();
    // };

    // fetch(`https://localhost:8000/buddies/${user.uid}`)
    //     .then(response => response.json())
    //     .then(data => setPeople(data));
    // 
    return(
        <div className='pcontainer'>
            <button id="backtohome" onClick={() => navigate('/')}>Back to Home</button>
            <div className='presults-page-title'>Here are the three potential travel buddies!</div>
            <div className='pcomments-container'>
                {buddies.map((buddy, index) => (
                    <div className='precommendation-border' key={index}>
                        <div className='precommendation-body'>
                            <div className='precommendation-name'>
                                {"User " + buddy}
                            </div>
                            <div className='precommendation-text'>
                                {people[index].age}
                                <br/>
                                <br/>
                                {people[index].description}
                                <br/>
                                <br/>
                                {people[index].hobbies}
                                <br/>
                                <br/>
                                {people[index].personType}
                                <br/>
                                <br/>
                                {people[index].vacationType}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

{/* <div id="people">
                {buddies.map((person) => (
                    <div class="person">
                        <h2>{person.name}</h2>
                        <button onClick={() => navigate(`/contact/${person.uid}`)}>Contact</button>
                    </div>
                ))}
            </div> */}