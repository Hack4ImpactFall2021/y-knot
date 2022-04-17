import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import { AuthProvider } from './auth/AuthProvider';
import RequireAuth from './auth/RequireAuth';
import Dashboard from './applicant-dashboard/ApplicantDashboard';
import Settings from './settings/Settings';
import Login from './login/Login';
import Profile from './profile/Profile';
import TProfile from './trainee-profile/TProfile';
import History from './history/History';
import ResetPassword from './login/ResetPassword/ResetPassword';
import MentorProfile from './mentor/MentorProfile';
import MentorLanding from './mentor-landing/MentorLanding';
import Trainee from "./trainee/Trainee";
import MentorSettings from './settings/MentorSettings';
import MentorResources from './mentor/MentorResources';
// import LogsReports from './mentor/logs-and-reports/LogsReports';

const App = () => {
    
    return (
        <AuthProvider>
            <Router>
                <Routes>
                <Route path='/login' element={<Login/>}/>
                    <Route path='/resetPassword' element={<ResetPassword/>}/>
                    <Route path='/' element={<RequireAuth children={<Dashboard/>} />}/>
                    <Route path='/settings' element={<RequireAuth children={<Settings/>} />}/>

                    <Route path='/history' element={<RequireAuth children={<History/>} />}/>
                    <Route path='/mentor/:id' element={<RequireAuth children={<MentorProfile />}/>} />
                    <Route path='/:id' element={<RequireAuth children={<Profile/>}/>} />
                    <Route path='/trainee/home' element={<RequireAuth children={<Trainee/>} />}/>
                    <Route path='/history' element={<RequireAuth children={<History/>} />}/>
                    {/* <Route path='/:id' element={<RequireAuth children={<Profile/>}/>} /> */}
                    <Route path='/trainee/:id' element={<RequireAuth children={<TProfile/>}/>}/>
                    {/* Mentor routes */}
                    <Route path='/mentor' element={<RequireAuth children={<MentorLanding/>} />}/>
                    <Route path='/mentor/settings' element={<RequireAuth children={<MentorSettings/>} />}/>
                    <Route path='/mentor/resources' element={<RequireAuth children={<MentorResources/>} />}/>
                    {/* <Route path='/mentor/logs' element={<RequireAuth children={<LogsReports/>} />}/> */}
                    <Route path="*" element={<div>404 NOT FOUND</div>}/>
                    
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;