import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AayushisComponent from './AayushiR'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <AayushisComponent firstName="Stanley" lastName="Thomas" age={12} likesPizza={false}/>
    <AayushisComponent firstName="Stanley" lastName="Thomas" age={12} likesPizza={true} 
        favoriteToppings={['cheese', 'cheese', 'more cheese']}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
