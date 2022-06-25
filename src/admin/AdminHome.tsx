import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./AdminHome.css";

import { Mentor, Trainee } from '../utils/utils';

import NetworkManager, { Endpoints } from '../network/NetworkManager';
import PersonTile from '../people/PersonTile/PersonTile';

// Assets
import logo from "../login/assets/logo.png";
import all_applicants from '../assets/all.png';
import new_applicant from '../assets/new_blue.png';

import { AdminSidebarOptions, AdminSidebarTiles } from "./AdminSidebarInfo";

import SidebarAndContent from "../SidebarAndContent";
import Loading from "../widgets/Loading";

type PersonType = "Mentor" | "Trainee";
const AdminHome = () => {
  const [allPeople, setAllPeople] = useState<(Mentor | Trainee)[]>([]);
  const [visiblePeople, setVisiblePeople] = useState<(Mentor | Trainee)[]>([]);
  const [isContentLoading, setIsContentLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const getPeople: VoidFunction = async () => {
    setIsContentLoading(true);
    try {
      let mentors = await NetworkManager.makeRequest(Endpoints.GetAllMentors);
      let trainees = await NetworkManager.makeRequest(Endpoints.GetAllTrainees);
      let allPeeps = mentors.concat(trainees);
      setAllPeople(allPeeps);
      setVisiblePeople(allPeeps);
    } catch(err) {
      console.error(err);
    }
    setIsContentLoading(false);
  }
  useEffect(getPeople, []);

  //Filters
  const [filter, setFilter] = useState<PersonType | "">("");
  const [searchText, setSearchText] = useState<string>("");

  const onFilterChange = () => {
    //Apply search bar filter
    let newVisiblePeople = allPeople.filter((person) => (person.firstName + " " + person.lastName).toLowerCase().includes(searchText.toLowerCase()));
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
      case "Mentor":
        return "#6d9d3d";
      case "Trainee":
        return "#1900b5";
      default:
        return "";
    }
  }

  const onClickMentorTraineeListItem = (person: Mentor | Trainee) => {
    if (person.type === "Mentor") {
      navigate("/admin/mentor/" + person.submissionId);
    } else if (person.type === "Trainee") {
      navigate("/admin/trainee/" + person.submissionId);
    }
  }

  //RENDER FUNCTIONS
  const getAdminHomeContentComponent = () => {
    return (
      <div className="admin-home" style={{ position: "relative"}}>
        {!isContentLoading ? 
        (<div className="wrapper">
          {/* Header */}
          <div className="header-wrapper">
            <h1 className="header">Home</h1>
            <img src={logo} alt="Where is the logo?"/> 
          </div>
          {/* Mentors and Trainees Filters */}
          <div className="mentors-trainees-filters-wrapper">
            <div className={getClassNameForFilter("Mentor")} onClick={() => setFilter("Mentor")} style={{ borderBottomColor: "#6d9d3d" }}>
              <div className="filter-top">
                <img className="filter-img"src={all_applicants} alt=""/>
                <h3>{getNumberOf("Mentor")}</h3>
              </div>
              <p>Mentors</p>
            </div>
            <div className={getClassNameForFilter("Trainee")} onClick={() => setFilter("Trainee")} style={{ borderBottomColor: "#1900b5" }}>
              <div className="filter-top">
                <img className="filter-img" src={new_applicant} alt=""/>
                <h3>{getNumberOf("Trainee")}</h3>
              </div>
              <p>Trainees</p>
            </div>
          </div>

          {/* Mentors Trainees Dashboard */}
          <div className="mentors-trainees-dashboard">
            {/* Header */}
            <div className="header-wrapper">
              {/* Title */}
              <h2>{filter === "" ? "All Mentors and Trainees" : filter + "s"}</h2>
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
            <ul className="mentors-trainees-list">
              {visiblePeople.length > 0 ? visiblePeople.map((person, idx) => 
                <div key={idx} className="mentors-trainees-list-item" onClick={() => onClickMentorTraineeListItem(person)}>
                  <p>{person.firstName + " " + person.lastName}</p>
                  <div className="person-type" style={{ backgroundColor: getColorForPersonType(person.type) }}>{person.type.toUpperCase()}</div>
                </div>)
                :
                <p>There are no trainees or mentors to display.</p>
              }
            </ul>
          </div>
        </div>) : <Loading/>}
      </div>  
    );
  }

  return (
    <SidebarAndContent
      selectedTile={AdminSidebarOptions.Home}
      sidebarTiles={AdminSidebarTiles}
      contentComponent={getAdminHomeContentComponent()}
    />
  );
}

export default AdminHome;