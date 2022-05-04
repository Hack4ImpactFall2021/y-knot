import { useEffect, useState } from "react";

import "./AdminApplicants.css";

import logo from "../login/assets/logo.png";
import all_applicants from '../assets/all.png';
import new_applicant from '../assets/new.png';
import interviewing from '../assets/interviewing.png';
import background_check from '../assets/background_check.png';

const AdminApplicants = () => {
  enum ApplicantStageFilter { 
    AllApplicants = "All Applicants", 
    New = "New", 
    Interviewing = "Interviewing", 
    BackgroundCheck = "Background Check" 
  }
  interface Applicant {
    name: string,
    stage: ApplicantStageFilter
  }

  const allApplicants = [
    { name: "Jason Cavanaugh", stage: ApplicantStageFilter.Interviewing },
    { name: "Amanda Liu", stage: ApplicantStageFilter.Interviewing },
    { name: "Aayushi Roy", stage: ApplicantStageFilter.New },
    { name: "Jacob Lane", stage: ApplicantStageFilter.New },
    { name: "Miranda Song", stage: ApplicantStageFilter.BackgroundCheck },
    { name: "Jason Cavanaugh", stage: ApplicantStageFilter.Interviewing },
    { name: "Amanda Liu", stage: ApplicantStageFilter.Interviewing },
    { name: "Aayushi Roy", stage: ApplicantStageFilter.New },
    { name: "Jacob Lane", stage: ApplicantStageFilter.New },
    { name: "Miranda Song", stage: ApplicantStageFilter.BackgroundCheck },
    { name: "Jason Cavanaugh", stage: ApplicantStageFilter.Interviewing },
    { name: "Amanda Liu", stage: ApplicantStageFilter.Interviewing },
    { name: "Aayushi Roy", stage: ApplicantStageFilter.New },
    { name: "Jacob Lane", stage: ApplicantStageFilter.New },
    { name: "Miranda Song", stage: ApplicantStageFilter.BackgroundCheck },
  ]

  const [visibleApplicants, setVisibleApplicants] = useState<Applicant[]>(allApplicants)
  const [searchText, setSearchText] = useState<string>("");
  const [applicantStageFilter, setApplicantStageFilter] = useState<ApplicantStageFilter>(ApplicantStageFilter.AllApplicants);


  const onFilterChange = () => {
    //Apply search bar filter
    let newVisibleApplicants = allApplicants.filter((applicant) => applicant.name.includes(searchText));
    //Apply applicant stage filter
    if (applicantStageFilter !== ApplicantStageFilter.AllApplicants) {
      newVisibleApplicants = newVisibleApplicants.filter((applicant) => applicant.stage === applicantStageFilter);
    }
    setVisibleApplicants(newVisibleApplicants);
  }
  useEffect(onFilterChange, [searchText, applicantStageFilter])

  const getClassNameForFilter = (filter: ApplicantStageFilter) => {
    return filter === applicantStageFilter ? "applicant-stage-filter selected" : "applicant-stage-filter";
  }

  const getNumberOfApplicants = (filter: ApplicantStageFilter) => allApplicants.filter((a) => a.stage === filter).length

  /* RENDER FUNCTIONS */
  const getApplicantListItem = (applicant: Applicant, idx: number) => {
    return (
      //Applicants List Item
      <div className="applicants-list-item">
        <p>{applicant.name}</p>
        <div className="applicant-stage">{applicant.stage}</div>
      </div>  
    );
  }

  return (
    <div className="admin-applicants">
      <div className="wrapper">
        {/* Header */}
        <div className="header-wrapper">
          <h1 className="header">Applicants</h1>
          <img src={logo} alt="Where is the logo?"/> 
        </div>

        {/* Applicant Stage Filters */}
        <div className="applicant-stage-filters-wrapper">
          <div className={getClassNameForFilter(ApplicantStageFilter.AllApplicants)} onClick={() => setApplicantStageFilter(ApplicantStageFilter.AllApplicants)}>
            <img className="filter-img"src={all_applicants} alt=""/>
            <h3>{allApplicants.length}</h3>
            <p>Total Applicants</p>
          </div>
          <div className={getClassNameForFilter(ApplicantStageFilter.New)} onClick={() => setApplicantStageFilter(ApplicantStageFilter.New)}>
            <img className="filter-img" src={new_applicant} alt=""/>
            <h3>{getNumberOfApplicants(ApplicantStageFilter.New)}</h3>
            <p>New Applicants</p>
          </div>
          <div className={getClassNameForFilter(ApplicantStageFilter.Interviewing)} onClick={() => setApplicantStageFilter(ApplicantStageFilter.Interviewing)}>
            <img className="filter-img" src={interviewing} alt=""/>
            <h3>{getNumberOfApplicants(ApplicantStageFilter.Interviewing)}</h3>
            <p>Interviewing</p>
          </div>
          <div className={getClassNameForFilter(ApplicantStageFilter.BackgroundCheck)} onClick={() => setApplicantStageFilter(ApplicantStageFilter.BackgroundCheck)}>
            <img className="filter-img" src={background_check} alt=""/>
            <h3>{getNumberOfApplicants(ApplicantStageFilter.BackgroundCheck)}</h3>
            <p>Background Check</p>
          </div>
        </div>

        {/* Dashboard */}
        <div className="applicants-dashboard">
          {/* Header */}
          <div className="header-wrapper">
            {/* Title */}
            <h3>Applicants</h3>
            {/* Searchbar */}
            <input 
              className="applicants-list-searchbar" 
              type="text" 
              placeholder="Search..." 
              value={searchText} 
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <hr/>
          {/* Applicants List */}
          <ul className="applicants-list">
            {visibleApplicants.map((applicant, idx) => getApplicantListItem(applicant, idx))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminApplicants;