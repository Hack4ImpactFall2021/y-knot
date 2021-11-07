import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from './Dashboard';
import NavBar from './NavBar';

const App = () => {
    return (
        <Router>
            <NavBar/>
            <Switch>
                <Route path='/' exact component={Dashboard} />
                <Route path='/'  />
                <Route path='/'  />
            </Switch>
            {/* <Dashboard /> */}
        </Router>
    );
}

export default App;