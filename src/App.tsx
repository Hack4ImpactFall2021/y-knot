import React from 'react';
import firebase from './config/firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const App = () => {
    const handleClick = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, "stanleyt4405@gmail.com", "password123")
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(JSON.stringify(user))
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });
        
    }
    return (
        <div>
            <h1>
                {firebase.appId}
                <button onClick={handleClick}>Click Me!</button>
            </h1>
        </div>
    );
}

export default App;