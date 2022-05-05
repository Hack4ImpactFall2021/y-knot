import { useEffect, useState } from "react";
import NetworkManager, { Endpoints } from '../network/NetworkManager';
import { Applicant, ApplicantStages } from '../utils/utils';

//Assets
import logo from "../login/assets/logo.png";
import all_applicants from '../assets/all.png';
import new_applicant from '../assets/new.png';
import interviewing from '../assets/interviewing.png';
import background_check from '../assets/background_check.png';

import "./AdminApplicants.css";

type ApplicantStageFilter = ApplicantStages.New | ApplicantStages.Interviewing | ApplicantStages.BackgroundCheck | "All Applicants";

const AdminApplicants = () => {
  const [allApplicants, setAllApplicants] = useState<Applicant[]>([]);
  const [visibleApplicants, setVisibleApplicants] = useState<Applicant[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [applicantStageFilter, setApplicantStageFilter] = useState<ApplicantStageFilter>("All Applicants");

  const getApplicants: VoidFunction = async () => {
    try {
      let applicants: Applicant[] = await NetworkManager.makeRequest(Endpoints.GetAllApplicants);
      setAllApplicants(applicants);
      setVisibleApplicants(applicants);
    } catch(err) {
      console.log(err);
    }
  }
  useEffect(getApplicants, []);

  const onFilterChange = () => {
    //Apply search bar filter
    let newVisibleApplicants = allApplicants.filter((applicant) => applicant.firstName.includes(searchText) || applicant.lastName.includes(searchText));
    //Apply applicant stage filter
    if (applicantStageFilter !== "All Applicants") {
      newVisibleApplicants = newVisibleApplicants.filter((applicant) => applicant.stage === applicantStageFilter);
    }
    setVisibleApplicants(newVisibleApplicants);
  }
  useEffect(onFilterChange, [searchText, applicantStageFilter])

  const getClassNameForFilter = (filter: ApplicantStageFilter) => {
    return filter === applicantStageFilter ? "applicant-stage-filter selected" : "applicant-stage-filter";
  }

  const getNumberOfApplicants = (filter: ApplicantStageFilter) => { 
    return allApplicants.filter((a) => a.stage === filter).length; 
  }

  const getColorForStage = (stage: ApplicantStages) => {
    switch (stage) {
      case ApplicantStages.Accepted:
        return "green";
      case ApplicantStages.Rejected:
        return "red";
      case ApplicantStages.New:
        return "#f44250";
      case ApplicantStages.BackgroundCheck:
        return "#fcbb45";
      case ApplicantStages.Interviewing:
        return "#ff8427";
      default:
        return "";
    }
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
          {/* Applicant Stage Filter -> Total Applicants */}
          <div className={getClassNameForFilter("All Applicants")} onClick={() => setApplicantStageFilter("All Applicants")} style={{borderBottomColor: "#10275b"}}>
            <div className="filter-top">
              <img className="filter-img"src={all_applicants} alt=""/>
              <h3>{allApplicants.length}</h3>
            </div>
            <p>Total Applicants</p>
          </div>
          {/* Applicant Stage Filter -> New Applicants */}
          <div className={getClassNameForFilter(ApplicantStages.New)} onClick={() => setApplicantStageFilter(ApplicantStages.New)} style={{borderBottomColor: "#f44250"}}>
            <div className="filter-top">
              <img className="filter-img" src={new_applicant} alt=""/>
              <h3>{getNumberOfApplicants(ApplicantStages.New)}</h3>
            </div>
            <p>New Applicants</p>
          </div>
          {/* Applicant Stage Filter -> Interviewing */}
          <div className={getClassNameForFilter(ApplicantStages.Interviewing)} onClick={() => setApplicantStageFilter(ApplicantStages.Interviewing)} style={{borderBottomColor: "#ff8427"}}>
            <div className="filter-top">
              <img className="filter-img" src={interviewing} alt=""/>
              <h3>{getNumberOfApplicants(ApplicantStages.Interviewing)}</h3>
            </div>
            <p>Interviewing</p>
          </div>
          {/* Applicant Stage Filter -> Background Check */}
          <div className={getClassNameForFilter(ApplicantStages.BackgroundCheck)} onClick={() => setApplicantStageFilter(ApplicantStages.BackgroundCheck)} style={{borderBottomColor: "#fcbb45"}}>
            <div className="filter-top">
              <img className="filter-img" src={background_check} alt=""/>
              <h3>{getNumberOfApplicants(ApplicantStages.BackgroundCheck)}</h3>
            </div>
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
            {visibleApplicants.length > 0 ? visibleApplicants.map((applicant, idx) => 
              <div key={idx} className="applicants-list-item">
                <p>{applicant.firstName + " " + applicant.lastName}</p>
                <div className="applicant-stage" style={{backgroundColor: getColorForStage(applicant.stage)}}>{applicant.stage}</div>
              </div>)
              :
              <p>There are no applicants to display.</p>
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminApplicants;