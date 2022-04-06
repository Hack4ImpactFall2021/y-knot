import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import { AuthProvider } from './auth/AuthProvider';
import RequireAuth from './auth/RequireAuth';
import Dashboard from './applicant-dashboard/ApplicantDashboard';
import Settings from './settings/Settings';
import Login from './login/Login';
import Profile from './profile/Profile';
import History from './history/History';
import ResetPassword from './login/ResetPassword/ResetPassword';
import MentorProfile from './mentor/MentorProfile';
import MentorLanding from './mentor-landing/MentorLanding';
import LogsReports from './logs-and-reports/LogsReports';


const App = () => {
    
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/resetPassword' element={<ResetPassword/>}/>
                    <Route path='/' element={<RequireAuth children={<Dashboard/>} />}/>
                    <Route path='/settings' element={<RequireAuth children={<Settings/>} />}/>
                    <Route path='/mentor' element={<RequireAuth children={<MentorLanding/>} />}/>
                    <Route path='/mentor/:id' element={<RequireAuth children={<LogsReports/>} />}/>
                    <Route path='/history' element={<RequireAuth children={<History/>} />}/>
                    <Route path='/mentor/:id' element={<RequireAuth children={<MentorProfile />}/>} />
                    <Route path='/:id' element={<RequireAuth children={<Profile/>}/>} />
                    <Route path="*" element={<div>404 NOT FOUND</div>}/>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;