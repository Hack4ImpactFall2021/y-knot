import React from 'react';
import firebase from './config/firebase';

const App = () => {
    const handleClick = () => {
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