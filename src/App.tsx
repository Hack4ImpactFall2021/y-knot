import React from 'react';
import Login from './LoginPage/Login';

import './App.css';
import Settings from './SettingsPage/Settings';
// import firebase from './config/firebase';

const App = () => {
    const handleClick = () => {
    }
    return (

        <Settings />
        // <Login />
        // <div>
        //     <h1>
        //         {firebase.appId}
        //         <button onClick={handleClick}>Click Me!</button>
        //     </h1>
        // </div>
    );
}

export default App;