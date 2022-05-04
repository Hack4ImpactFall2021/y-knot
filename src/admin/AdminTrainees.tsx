
import logo from "../login/assets/logo.png";

import { useEffect, useState } from "react";
import "./AdminTrainees.css"
import { CircularProgressBar } from "./CircularProgressBar";

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


  /* RENDER FUNCTIONS */
  const getTraineeListItem = (trainee: Trainee, key: number) => {
    return (
      // Trainees List Item
      <li key={key} className="trainee-list-item">
        <CircularProgressBar fillAmount={trainee.progress} widthUnit="em" width={4.5}/>
        <p>
          {trainee.name}
        </p>
      </li>
    );
  }

  return (
    <div className="admin-trainees">
      <div className="wrapper">
        {/* Header */}
        <div className="header-wrapper">
          <h1 className="header">Trainees</h1>
          <img src={logo} alt="Where is the logo?"/> 
        </div>
        {/* Trainees Dashboard */}
        <div className="trainee-dashboard">
          {/* Header */}
          <div className="header-wrapper">
            {/* Title */}
            <h3>All Trainees</h3>
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
            {visibleTrainees.map((trainee, idx) => getTraineeListItem(trainee, idx))}
          </ul>
        </div>
      </div>
    </div>  
  );
}

export default AdminTrainees;