
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AssignmentsTabPerson } from "../utils/utils";

import NetworkManager, { Endpoints } from "../network/NetworkManager";

// Assets
import logo from "../login/assets/logo.png";
import all_applicants from '../assets/all.png';
import new_applicant from '../assets/new_blue.png';

import "../SidebarAndContent.css";
import "./AdminAssignments.css"
import Sidebar from "../widgets/Sidebar";
import { AdminSidebarOptions, AdminSidebarTiles } from "./AdminSidebarInfo";
import Loading from "../widgets/Loading";
import SidebarAndContent from "../SidebarAndContent";
import { Modal } from "../widgets/Modal";

type PersonType = "Mentee" | "Trainee";

const AdminHome = () => {
  const [visiblePeople, setVisiblePeople] = useState<AssignmentsTabPerson[]>([]);
  const [allPeople, setAllPeople] = useState<AssignmentsTabPerson[]>([]);
  const [mentees, setMentees] = useState<AssignmentsTabPerson[]>([]);
  const [trainees, setTrainees] = useState<AssignmentsTabPerson[]>([]);
  const navigate = useNavigate();
  const [assignmentModal, setAssignmentModal] = useState<AssignmentsTabPerson>();

  const [isContentLoading, setIsContentLoading] = useState<Boolean>(true);

  useEffect(() => {
    getPeople();
  }, []);

  const getPeople: VoidFunction = async () => {
    setIsContentLoading(true);
    try {
      let menteesResult = await NetworkManager.makeRequest(Endpoints.GetUnassignedMentees);
      let traineesResult = await NetworkManager.makeRequest(Endpoints.GetFinishedTrainees);

      setMentees(menteesResult);
      setTrainees(traineesResult);

      let visiblePeeps = menteesResult.concat(traineesResult);
      visiblePeeps = visiblePeeps.sort((a: AssignmentsTabPerson,b: AssignmentsTabPerson) => a.firstName.localeCompare(b.firstName));

      setAllPeople(visiblePeeps);

      setVisiblePeople(visiblePeeps);

      setFilter("");

    } catch (err) {
      console.log(err);
    }
    setIsContentLoading(false);
  } 

  //Filters
  const [filter, setFilter] = useState<PersonType | "">("");
  const [searchText, setSearchText] = useState<string>("");

  const onFilterChange = () => {
    //Apply search bar filter
    let newVisiblePeople = allPeople?.filter((person) => (person.firstName + " " + person.lastName).toLowerCase().includes(searchText.toLowerCase())
      );
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
    return type == "Mentee" ? mentees.length : trainees.length;
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

  const onClick = (person: AssignmentsTabPerson) => {
    if (person.type === "Trainee") {
      setAssignmentModal(person);
    } else if (person.type === "Mentee") {
      navigate("/admin/matching/" + person.submissionId);
    }
  }

  const makeTraineeIntoMentor = async (trainee: AssignmentsTabPerson) => {
    setAssignmentModal(undefined);
    setIsContentLoading(true);
    try {

      if (trainee?.type == "Trainee" && trainee?.firebaseId.length != 0 && trainee?.email.length != 0) {

        await NetworkManager.makeRequest(Endpoints.SetRole, { id: trainee.submissionId, firebaseId: trainee.firebaseId, role: "mentor" });
        await NetworkManager.makeRequest(Endpoints.SendTrainingCompletedEmail, {email: trainee.email, name: `${trainee.firstName} ${trainee.lastName}`})
      
        getPeople();
      }
    } catch(err) {
      console.error(err);
    }
    setIsContentLoading(false);
  }

  const renderAssignmentModal = () => {
    if (assignmentModal == undefined) {
      return;
    }
    return (
      <Modal 
        title="Make Trainee a Mentor!"
        content={`Are you sure you wish to make ${assignmentModal?.firstName} ${assignmentModal?.lastName} into a Mentor?`}
        onConfirm={() => makeTraineeIntoMentor(assignmentModal)}
        onCancel={() => setAssignmentModal(undefined)}
      />
    );
  }

  const getAdminAssignmentsContentComponent = () => {
    //position relative for the loader
    return (
      <div className="admin-assignments" style={{ position: "relative" }}>
        {!isContentLoading ?
        (<div className="wrapper">
          {/* Assignment Modal for Trainee */}
          {renderAssignmentModal()}
          {/* Header */}
          <div className="header-wrapper">
            <h1 className="header">Assignments</h1>
            <img src={logo} alt="Where is the logo?"/> 
          </div>
          {/* Mentees Trainees Filters */}
          <div className="trainees-mentees-filters-wrapper">
            <div className={getClassNameForFilter("Trainee")} onClick={() => setFilter("Trainee")} style={{ borderBottomColor: "#1900b5" }}>
              <div className="filter-top">
                <img className="filter-img"src={all_applicants} alt=""/>
                <h3>{getNumberOf("Trainee")}</h3>
              </div>
              <p>Trainees</p>
            </div>
            <div className={getClassNameForFilter("Mentee")} onClick={() => setFilter("Mentee")} style={{ borderBottomColor: "#e06f10" }}>
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
                  <div className="person-type" style={{ backgroundColor: getColorForPersonType(person.type as PersonType) }}>{person.type.toUpperCase()}</div>
                </div>)
                :
                <p>There are no trainees or mentees to display.</p>
              }
            </ul>
          </div>
        </div>) : <Loading/> } 
      </div>);
  }

  return (
    <SidebarAndContent
      selectedTile={AdminSidebarOptions.Assignments}
      sidebarTiles={AdminSidebarTiles}
      contentComponent={getAdminAssignmentsContentComponent()}
    />
  );
}

export default AdminHome;
