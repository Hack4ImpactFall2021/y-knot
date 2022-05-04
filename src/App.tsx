import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

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
import ResetPassword from './login/ResetPassword/ResetPassword';
import MentorProfile from './mentor/MentorProfile';
import MentorLanding from './mentor-landing/MentorLanding';
import Trainee from "./trainee/Trainee";
import MentorSettings from './settings/MentorSettings';
import MentorResources from './mentor/MentorResources';
import MentorMenteeMatch from "./admin/MentorMenteeMatch";

// Admin stuff
import { NavRouteOptions as AdminNavRouteOptions } from "./admin/AdminSidebar";
import { NavRoutes as AdminNavRoutes } from "./admin/AdminSidebar";
import Admin from "./admin/Admin";


const App = () => {
    
    return (
        <AuthProvider>
            <Router>
                <Routes>
                <Route path='/login' element={<Login/>}/>
                    <Route path='/resetPassword' element={<ResetPassword/>}/>
                    <Route path='/' element={<Navigate to="/login" />}/>
                    <Route path='/settings' element={<RequireAdminAuth children={<Settings/>} />}/>
                    <Route path='/:id' element={<RequireAdminAuth children={<Profile/>}/>} />

                    <Route path='/trainee/home' element={<RequireTraineeAuth children={<Trainee/>} />}/>
                    <Route path='/trainee/:id' element={<RequireTraineeAuth children={<TProfile/>}/>}/>
                    <Route path='/trainee/settings' element={<RequireTraineeAuth children={<TraineeSettings/>} />}/>

                    <Route path='/mentor' element={<RequireMentorAuth children={<MentorLanding/>} />}/>
                    <Route path='/mentor/settings' element={<RequireMentorAuth children={<MentorSettings/>} />}/>
                    <Route path='/mentor/resources' element={<RequireMentorAuth children={<MentorResources/>} />}/>
                    <Route path='/mentor/:id' element={<RequireMentorAuth children={<MentorProfile />}/>} />

                    <Route path='/admin/matching' element={<RequireAdminAuth children={<MentorMenteeMatch />}/>} />
                    <Route
                      path={AdminNavRoutes[AdminNavRouteOptions.Home].route}
                      element={<RequireAuth children={<Admin selected={AdminNavRouteOptions.Home}/>}/>}
                    />
                    <Route
                      path={AdminNavRoutes[AdminNavRouteOptions.Trainee].route}
                      element={<RequireAuth children={<Admin selected={AdminNavRouteOptions.Trainee}/>}/>}
                    />
                    <Route
                      path={AdminNavRoutes[AdminNavRouteOptions.Applicants].route}
                      element={<RequireAuth children={<Admin selected={AdminNavRouteOptions.Applicants}/>}/>}
                    />
                    <Route
                      path={AdminNavRoutes[AdminNavRouteOptions.Settings].route}
                      element={<RequireAuth children={<Admin selected={AdminNavRouteOptions.Settings}/>}/>}
                    />
                    <Route path="*" element={<div>404 NOT FOUND</div>}/>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;