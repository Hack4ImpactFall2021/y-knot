import React from 'react';
import './NavBar.css'
import { Link } from 'react-router-dom';
import dashboard_icon from './dashboard.png'
import history_icon from './history.png'
import settings_icon from './settings.png'

const NavBar = () => {
    return (
        <div className='nav-bar'>

                <ul className='nav-menu-items'>
                    <li className='nav-item'>
                        <Link to='/'>
                            <img src={dashboard_icon} alt=''/>
                            <span>Dashboard</span>
                        </Link>
                    </li>

                    <li className='nav-item'> 
                        <Link to='/'>
                            <img src={history_icon} alt=''/>
                            <span>History</span>
                        </Link>
                    </li>

                    <li className='nav-item'>
                        <Link to='/'>
                            <img src={settings_icon} alt=''/>
                            <span>Settings</span>
                        </Link>
                    </li>
                </ul>


        </div>
    );
}

export default NavBar;