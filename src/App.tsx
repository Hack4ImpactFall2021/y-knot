import React from 'react';
import DanielsComponent from './DanielC';

import './App.css';

const App = () => {
  return (
    <div>
      <DanielsComponent
        firstName="Daniel"
        lastName="Choi"
        age={19}
        likesPizza={false}
      />
      <DanielsComponent
        firstName="Daniel"
        lastName="Choi"
        age={19}
        likesPizza={true}
        toppings={["pepperoni", "mushroom", "sausage"]}
      />
    </div>
  );
};

export default App;
