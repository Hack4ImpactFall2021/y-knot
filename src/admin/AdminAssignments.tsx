
import logo from "../login/assets/logo.png";

import { useEffect, useState } from "react";
import "./AdminAssignments.css"

// Admin Home
const AdminTrainees = () => {
  const allTrainees: Trainee[] = [
    { name: "Jason Cavanaugh", progress: 12 },
    { name: "Aayushi Roy", progress: 75 },
    { name: "Amanda Liu", progress: 39 },
    { name: "Luke Muratore", progress: 96 },
    { name: "Jason Cavanaugh", progress: 12 },
    { name: "Aayushi Roy", progress: 75 },
    { name: "Amanda Liu", progress: 39 },
    { name: "Luke Muratore", progress: 96 },
    { name: "Jason Cavanaugh", progress: 12 },
    { name: "Aayushi Roy", progress: 75 },
    { name: "Amanda Liu", progress: 39 },
    { name: "Luke Muratore", progress: 96 },
    { name: "Jason Cavanaugh", progress: 12 },
    { name: "Aayushi Roy", progress: 75 },
    { name: "Amanda Liu", progress: 39 },
    { name: "Luke Muratore", progress: 96 },
    { name: "Jason Cavanaugh", progress: 12 },
    { name: "Aayushi Roy", progress: 75 },
    { name: "Amanda Liu", progress: 39 },
    { name: "Luke Muratore", progress: 96 },
    { name: "Jason Cavanaugh", progress: 12 },
    { name: "Aayushi Roy", progress: 75 },
    { name: "Amanda Liu", progress: 39 },
    { name: "Luke Muratore", progress: 96 },
  ];

  interface Trainee {
    name: string,
    progress: number
  }

  const [visibleTrainees, setVisibleTrainees] = useState<Trainee[]>(allTrainees);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    const newVisibleTrainees = allTrainees.filter((trainee) => trainee.name.includes(searchText));
    setVisibleTrainees(newVisibleTrainees);
  }, [searchText]);

  return (
    <div className="admin-trainees">
      <div className="wrapper">
        {/* Header */}
        <div className="header-wrapper">
          <h1 className="header">Assignments</h1>
          <img src={logo} alt="Where is the logo?"/> 
        </div>
        {/* Trainees and Mentees Filters */}

        {/* Trainees Dashboard */}
        <div className="trainee-dashboard">
          {/* Header */}
          <div className="header-wrapper">
            {/* Title */}
            <h3>All Trainees and Mentees</h3>
            {/* Searchbar */}
            <input 
              className="trainee-list-searchbar" 
              type="text" 
              placeholder="Search..." 
              value={searchText} 
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <hr/>
          {/* Trainee List */}
          <ul className="trainee-list">
            {visibleTrainees.map((trainee, idx) => 
              <li key={idx} className="trainee-list-item">
                <div></div>
                <p>
                  {trainee.name}
                </p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>  
  );
}

export default AdminTrainees;