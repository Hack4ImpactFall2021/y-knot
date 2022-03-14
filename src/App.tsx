import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import { AuthProvider } from './auth/AuthProvider';
import RequireAuth from './auth/RequireAuth';
import RequireAdminAuth from './auth/RequireAdminAuth';
import Dashboard from './applicant-dashboard/ApplicantDashboard';
import Settings from './settings/Settings';
import Login from './login/Login';
import Profile from './profile/Profile';
import History from './history/History';
import ResetPassword from './login/ResetPassword/ResetPassword';
import Trainee from "./trainee/Trainee";


const App = () => {
    
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/resetPassword' element={<ResetPassword/>}/>
                    <Route path='/' element={<RequireAdminAuth children={<Dashboard/>} />}/>
                    <Route path='/settings' element={<RequireAuth children={<Settings/>} />}/>
                    <Route path='/trainee/home' element={<RequireAuth children={<Trainee/>} />}/>
                    <Route path='/history' element={<RequireAuth children={<History/>} />}/>
                    <Route path='/:id' element={<RequireAdminAuth children={<Profile/>}/>} />
                    <Route path="*" element={<div>404 NOT FOUND</div>}/>
                    
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;