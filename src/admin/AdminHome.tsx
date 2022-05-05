import { useEffect, useState } from "react";

import "./AdminHome.css";

import { Mentor, Trainee } from '../utils/utils';

import NetworkManager, { Endpoints } from '../network/NetworkManager';
import PersonTile from '../people/PersonTile/PersonTile';

// Assets
import logo from "../login/assets/logo.png";
import all_applicants from '../assets/all.png';
import new_applicant from '../assets/new.png';

const AdminHome = () => {
  const [allPeople, setAllPeople] = useState<(Mentor | Trainee)[]>([]);
  const [visiblePeople, setVisiblePeople] = useState<(Mentor | Trainee)[]>([]);


  // needs to be updated based on how mentor/mentee information is stored
  const getPeople: VoidFunction = async () => {
    try {
      let mentors = await NetworkManager.makeRequest(Endpoints.GetMentors);
      console.table(mentors);
      let trainees = await NetworkManager.makeRequest(Endpoints.GetTrainees);
      console.log(trainees);
      let allPeeps = mentors.concat(trainees);
      console.log(allPeeps);
      setAllPeople(allPeeps);
      setVisiblePeople(allPeeps);
    } catch(err) {
      console.log(err);
    }
  }
  useEffect(getPeople, []);

  //Filters
  const [filter, setFilter] = useState<"Mentor" | "Trainee" | "">("");
  const [searchText, setSearchText] = useState<string>("");

  const onFilterChange = () => {
    //Apply search bar filter
    let newVisiblePeople = allPeople.filter((person) => person.firstName.includes(searchText) || person.lastName.includes(searchText));
    //Apply applicant stage filter
    if (filter !== "") {
      newVisiblePeople = newVisiblePeople.filter((person) => person.type === filter);
    }
    setVisiblePeople(newVisiblePeople);
  }
  useEffect(onFilterChange, [filter, searchText])

  const getClassNameForFilter = (newFilter: "Mentor" | "Trainee") => {
    return newFilter === filter ? "person-filter selected" : "person-filter";
  }

  const getNumberOf = (type : "Mentor" | "Trainee") => {
    return allPeople.filter((person) => person.type === type).length;
  }

  return (
    <div className="admin-home">
      <div className="wrapper">
        {/* Header */}
        <div className="header-wrapper">
          <h1 className="header">Home</h1>
          <img src={logo} alt="Where is the logo?"/> 
        </div>
        {/* Mentors and Trainees Filters */}
        <div className="mentors-trainees-filters-wrapper">
          <div className={getClassNameForFilter("Mentor")} onClick={() => setFilter("Mentor")}>
            <img className="filter-img"src={all_applicants} alt=""/>
            <h3>{getNumberOf("Mentor")}</h3>
            <p>Mentors</p>
          </div>
          <div className={getClassNameForFilter("Mentor")} onClick={() => setFilter("Trainee")}>
            <img className="filter-img" src={new_applicant} alt=""/>
            <h3>{getNumberOf("Trainee")}</h3>
            <p>Trainees</p>
          </div>
        </div>

        {/* Dashboard */}
        <div className="dashboard">
          {/* Header */}
          <div className="header-wrapper">
            {/* Title */}
            <h2>{filter === null ? "All Mentors and Trainees" : filter}</h2>
            {/* Searchbar */}
            <input 
              className="mentors-trainees-list-searchbar" 
              type="text" 
              placeholder="Search..." 
              value={searchText} 
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>  
          <hr/>
          {/* Mentors and Trainees List */}
          <div className="mentors-trainees-list">
          {
            visiblePeople.length > 0 ?  
            visiblePeople.map(person => <PersonTile person={person}/>) 
            : 
            <p >There are no trainees or mentors. </p>
          }
          </div>
        </div>
      </div>
    </div>  
  );
}

export default AdminHome;