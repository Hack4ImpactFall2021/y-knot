import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import { AuthProvider } from './auth/AuthProvider';
import RequireAuth from './auth/RequireAuth';
import RequireAdminAuth from './auth/RequireAdminAuth';
import RequireMentorAuth from './auth/RequireMentorAuth';
import RequireTraineeAuth from './auth/RequireTraineeAuth';
import Dashboard from './applicant-dashboard/ApplicantDashboard';
import Settings from './settings/Settings';
import Login from './login/Login';
import Profile from './profile/Profile';
import TProfile from './trainee-profile/TProfile';
import TraineeSettings from './settings/TraineeSettings'
import History from './history/History';
import ResetPassword from './login/ResetPassword/ResetPassword';
import MentorProfile from './mentor/MentorProfile';
import MentorLanding from './mentor-landing/MentorLanding';
import Trainee from "./trainee/Trainee";
import MentorSettings from './settings/MentorSettings';
import MentorResources from './mentor/MentorResources';

const App = () => {
    
    return (
        <AuthProvider>
            <Router>
                <Routes>
                <Route path='/login' element={<Login/>}/>
                    <Route path='/resetPassword' element={<ResetPassword/>}/>
                    <Route path='/' element={<RequireAdminAuth children={<Dashboard/>} />}/>
                    <Route path='/settings' element={<RequireAdminAuth children={<Settings/>} />}/>
                    <Route path='/trainee/home' element={<RequireTraineeAuth children={<Trainee/>} />}/>
                    <Route path='/history' element={<RequireAdminAuth children={<History/>} />}/>
                    <Route path='/:id' element={<RequireAdminAuth children={<Profile/>}/>} />
                    <Route path='/' element={<RequireAuth children={<Dashboard/>} />}/>
                    <Route path='/settings' element={<RequireAuth children={<Settings/>} />}/>

                    <Route path='/history' element={<RequireAuth children={<History/>} />}/>
                    <Route path='/:id' element={<RequireAuth children={<Profile/>}/>} />
                    <Route path='/trainee/home' element={<RequireAuth children={<Trainee/>} />}/>
                    <Route path='/history' element={<RequireAuth children={<History/>} />}/>
                    {/* <Route path='/:id' element={<RequireAuth children={<Profile/>}/>} /> */}
                    <Route path='/trainee/:id' element={<RequireAuth children={<TProfile/>}/>}/>
                    {/* Mentor routes */}
                    <Route path='/mentor' element={<RequireAuth children={<MentorLanding/>} />}/>
                    <Route path='/mentor/settings' element={<RequireAuth children={<MentorSettings/>} />}/>
                    <Route path='/mentor/resources' element={<RequireAuth children={<MentorResources/>} />}/>
                    <Route path='/mentor/:id' element={<RequireAuth children={<MentorProfile />}/>} />
                    <Route path='/trainee/settings' element={<RequireAuth children={<TraineeSettings/>} />}/>
                    <Route path='/trainee/home' element={<RequireAuth children={<Trainee/>} />}/>
                    <Route path='/history' element={<RequireAuth children={<History/>} />}/>
                    <Route path='/:id' element={<RequireAuth children={<Profile/>}/>} />
                    <Route path='/trainee/:id' element={<RequireAuth children={<TProfile/>}/>}/>
                    <Route path="*" element={<div>404 NOT FOUND</div>}/>
                    
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;