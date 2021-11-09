import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import { AuthProvider } from './auth/AuthProvider';
import RequireAuth from './auth/RequireAuth';
import Dashboard from './dashboard/Dashboard';
import Login from './login/Login';


const App = () => {
    
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/' element={<RequireAuth children={<Dashboard/>} />}/>
                    <Route path="*" element={<div>404 NOT FOUND</div>}/>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;