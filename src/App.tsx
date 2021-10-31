import React from 'react';
<<<<<<< HEAD
import Login from './LoginPage/Login';

import './App.css';
=======
import firebase from './config/firebase';
>>>>>>> cc732d5a32249438acd042065643d9add9f0ab97

const App = () => {
    const handleClick = () => {
    }
    return (
<<<<<<< HEAD


        <Login />
=======
        <div>
            <h1>
                {firebase.appId}
                <button onClick={handleClick}>Click Me!</button>
            </h1>
        </div>
>>>>>>> cc732d5a32249438acd042065643d9add9f0ab97
    );
}

export default App;