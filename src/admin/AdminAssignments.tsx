
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import NetworkManager, { Endpoints } from "../network/NetworkManager";

// Assets
import logo from "../login/assets/logo.png";
import all_applicants from '../assets/all.png';
import new_applicant from '../assets/new.png';

import "./AdminAssignments.css"

type PersonType = "Mentee" | "Trainee";

const AdminHome = () => {
  const [visiblePeople, setVisiblePeople] = useState<any[]>([]);
  const navigate = useNavigate();
  const [assignmentModal, setAssignmentModal] = useState<any>(null);

  const allPeople = [
    {firstName: "Jason", lastName: "Cavanaugh", type: "Mentee"},
    {firstName: "Peter", lastName: "Parker", type: "Mentee"},
    {firstName: "Bruce", lastName: "Wayne", type: "Trainee"},
    {firstName: "Jason", lastName: "Cavanaugh", type: "Mentee"},
    {firstName: "Peter", lastName: "Parker", type: "Mentee"},
    {firstName: "Bruce", lastName: "Wayne", type: "Trainee"},
    {firstName: "Jason", lastName: "Cavanaugh", type: "Mentee"},
    {firstName: "Peter", lastName: "Parker", type: "Mentee"},
    {firstName: "Bruce", lastName: "Wayne", type: "Trainee"},
  ]


  //Filters
  const [filter, setFilter] = useState<PersonType | "">("");
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

  const getClassNameForFilter = (newFilter: PersonType) => {
    return newFilter === filter ? "person-filter selected" : "person-filter";
  }

  const getNumberOf = (type : PersonType) => {
    return allPeople.filter((person) => person.type === type).length;
  }

  const getColorForPersonType = (stage: PersonType) => {
    switch (stage) {
      case "Trainee":
        return "#1900b5";
      case "Mentee":
        return "#e06f10";
      default:
        return "";
    }
  }

  const onClick = (person: any) => {
    if (person.type === "Trainee") {
      setAssignmentModal(person.firstName + " " + person.lastName);
    } else if (person.type === "Mentee") {
      navigate("/admin/matching");
    }
  }

  const renderAssignmentModal = () => {
    if (!assignmentModal) {
      return;
    }
    return (
      <div className="modal-wrapper">
        <div className="trainee-assignment-modal">
          <h1>Make Trainee a Mentor!</h1>
          <p>Are you sure you wish to make {assignmentModal} into a Mentor?</p>
          <div className="btn-wrappers">
            <button className="cancel-btn" onClick={() => setAssignmentModal(null)}>Cancel</button>
            {/* Until we figure out what we want to do here */}
            <button className="confirm-btn"onClick={() => setAssignmentModal(null)} >Confirm</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-assignments">
      <div className="wrapper">
        {/* Assignment Modal for Trainee */}
        {renderAssignmentModal()}
        {/* Header */}
        <div className="header-wrapper">
          <h1 className="header">Assignments</h1>
          <img src={logo} alt="Where is the logo?"/> 
        </div>
        {/* Mentees Trainees Filters */}
        <div className="trainees-mentees-filters-wrapper">
          <div className={getClassNameForFilter("Trainee")} onClick={() => setFilter("Trainee")} style={{borderBottomColor: "#1900b5"}}>
            <div className="filter-top">
              <img className="filter-img"src={all_applicants} alt=""/>
              <h3>{getNumberOf("Trainee")}</h3>
            </div>
            <p>Trainees</p>
          </div>
          <div className={getClassNameForFilter("Mentee")} onClick={() => setFilter("Mentee")} style={{borderBottomColor: "#e06f10"}}>
            <div className="filter-top">
              <img className="filter-img" src={new_applicant} alt=""/>
              <h3>{getNumberOf("Mentee")}</h3>
            </div>
            <p>Mentees</p>
          </div>
        </div>

        {/* Mentors Trainees Dashboard */}
        <div className="trainees-mentees-dashboard">
          {/* Header */}
          <div className="header-wrapper">
            {/* Title */}
            <h2>{filter === "" ? "All Mentees and Trainees" : filter + "s"}</h2>
            {/* Searchbar */}
            <input 
              className="trainees-mentees-list-searchbar" 
              type="text" 
              placeholder="Search..." 
              value={searchText} 
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>  
          <hr/>
          {/* Mentors and Trainees List */}
          <ul className="trainees-mentees-list">
            {visiblePeople.length > 0 ? visiblePeople.map((person, idx) => 
              <div key={idx} className="trainees-mentees-list-item" onClick={() => onClick(person)}>
                <p>{person.firstName + " " + person.lastName}</p>
                <div className="person-type" style={{backgroundColor: getColorForPersonType(person.type)}}>{person.type}</div>
              </div>)
              :
              <p>There are no trainees or mentees to display.</p>
            }
          </ul>
        </div>
      </div>
    </div>  
  );
  return <div></div>;
}

export default AdminHome;