import React, { useEffect, useState } from "react";

import "./AdminHome.css";

import logo from "../login/assets/logo.png";
import { ApplicantStages, Applicant, stagesToTextMen, PersonTypes} from '../utils/utils';
import NetworkManager, { Endpoints } from '../network/NetworkManager';
import AdminFilterButton from './AdminFilterButton/AdminFilterButton';
import PersonTile from '../people/PersonTile/PersonTile';

const AdminHome = () => {
  const [filter, setFilter] = useState<PersonTypes | null>(null);
  const [people, setPeople] = useState<Applicant[]>([]);

  const [allPeople, setAllPeople] = useState<Applicant []>([]);
  const [mentors, setMentors] = useState<Applicant []>([]);
  const [mentees, setMentees] = useState<Applicant []>([]);

  useEffect(() => {
    getPeople();
  }, [])

  // for testing purposes, mentors = new applicants, mentees = interviewing applicants
  const filtersToPeople = {
    [ApplicantStages.New]: mentors,
    [ApplicantStages.Interviewing]: mentees,
  }

  // needs to be updated based on how mentor/mentee information is stored
  const getPeople: VoidFunction = async () => {
    try {
      // let mentees = await NetworkManager.makeRequest(Endpoints.GetAllMentees);
      // let mentors = await NetworkManager.makeRequest(Endpoints.GetAcceptedApplicants);
      let people = await NetworkManager.makeRequest(Endpoints.GetAllApplicants);
      people = people as Applicant[];
      // mentees = mentees as Applicant[];
      // mentors = mentors as Applicant[];

      let allPeopleTemp: Applicant[] = [];
      let mentorsTemp: Applicant[] = [];
      let menteesTemp: Applicant[] = [];

      people.forEach((person: Applicant) => {
        // allPeopleTemp.push(person);

        if (person.stage === ApplicantStages.New) {
            allPeopleTemp.push(person);
            mentorsTemp.push(person);
        } else if (person.stage === ApplicantStages.Interviewing) {
            allPeopleTemp.push(person);
            menteesTemp.push(person)
        } 
      })

      // mentees.forEach((mentee: Mentee) => {
      //   allPeopleTemp.push(mentee);
      // })

      // mentors.forEach((mentor: Mentor) => {
      //   allPeopleTemp.push(mentor)
      // })

      setAllPeople(allPeopleTemp);
      setMentors(mentors);
      setMentees(mentees);

      setPeople(allPeopleTemp);
    } catch(err) {
      console.log(err);
    }
  }

  const handleFilterChange = (value: PersonTypes | null) => {
    setFilter(value);
    if (value) {
      setPeople(filtersToPeople[value])
    } else {
      setPeople(allPeople);
    }
  }

  return (
    <div className="admin-home">
      <div className="wrapper">
        <div className="heading-wrapper">
          <h1 className="header">Home</h1>
          <img src={logo} alt="Where is the logo?"/> 
        </div>

        <div className="dashboard-content">
          <div className="dashboard-filters">
            {
            Object.values(PersonTypes).map(value => {
              return (<AdminFilterButton key={value} type={value} count={filtersToPeople[value].length} onClick={() => handleFilterChange(value)} selected={filter}/>)
            })
            }
          </div>
          
          <div className='dashboard-applicants'>
              {filter ? 
                  <h2>{stagesToTextMen[filter]}</h2>
                  :
                  <h2>All Mentees and Mentors</h2>
              }
              <hr/>
              <div className='tiles'>
                {people.length > 0 ?
                  people.map(person => {
                      return (<PersonTile person={person}/>)
                  })
                  : 
                  <p >There are no mentors or mentees.</p>
                }
              </div>
          </div>  
        </div>
        
      </div>
    </div>  
  );
}

export default AdminHome;