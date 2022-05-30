import React, { MouseEventHandler, useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MentorForm, JotformResponse, Mentor } from '../utils/utils';

import assign_icon from "./assets/assign_mentee_icon.png";
import close from "../profile/assets/close.png";
import "./MentorMenteeMatch.css"
import NetworkManager, { Endpoints } from '../network/NetworkManager';
import Loading from '../auth/Loading';

const useClickOutside = (onClickOutside: () => void) => {
  //Super jank
  const first = useRef<any>(null);
  const second = useRef<any>(null);
  const third = useRef<any>(null);

  const clickedOutsideDomNodes = (e:any) => {
    let clickedFirst = first.current && first.current.contains(e.target);
    let clickedSecond = second.current && second.current.contains(e.target);
    let clickedThird = third.current && third.current.contains(e.target);
    return !clickedFirst && !clickedSecond && !clickedThird;
  }
  //Because I gave up on trying to get the types to work.
  const handleClick = (e:any) => {
      e.preventDefault();
      if (clickedOutsideDomNodes(e)) {
         onClickOutside();
      } 
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);       
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return [first, second, third];
}

//Temporary mock of the data 
const mentorList: MentorForm[] = [
  {
    firstName: "Grace",
    lastName: "Ko",
    gender: "F",
    age: 19,
    schoolLevel: "High School",
    describesYou: ["Outgoing", "Vibrant"],
    interestsAndHobbies: ["Sports", "Reading"]
  },
  {
    firstName: "Grace",
    lastName: "Ko",
    gender: "F",
    age: 19,
    schoolLevel: "High School",
    describesYou: ["Outgoing", "Vibrant"],
    interestsAndHobbies: ["Sports", "Reading"]
  },
  {
    firstName: "Grace",
    lastName: "Ko",
    gender: "F",
    age: 19,
    schoolLevel: "High School",
    describesYou: ["Outgoing", "Vibrant"],
    interestsAndHobbies: ["Sports", "Reading"]
  },
];

interface Mentee {
  firstName: string,
  lastName: string,
  gender: "Male" | "Female",
  age: string,
  grade: string
}

const MentorMenteeMatch = () => {
  const navigate = useNavigate();
  const { menteeId } = useParams();
  const [mentee, setMentee] = useState<Mentee | null>(null);
  const [selectedMentor, setSelectedMentor] = useState(-1);
  const [assignMenteeToMentorModal, setAssignMenteeToMentorModal] = useState<MentorForm | null>(null);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const refs = useClickOutside(() => setSelectedMentor(-1));

  useEffect(() => {
    getMentee();
    getMentors();
  }, [])

  const getMentee: VoidFunction = async () => {
    try {
      const data = await NetworkManager.makeRequest(Endpoints.GetMenteeForm, { id: menteeId });
      const menteeFormResponse = data.content.answers;
      const answers: any = Object.values(menteeFormResponse);
      const menteeData: Mentee = { firstName: "", lastName: "", gender: "Male", age: "", grade: "" };
      //Grab the relevant fields off of the form
      for (const ans of answers) {
        switch (ans["name"]) {
          case "childsName":
            menteeData.firstName = ans["answer"].first;
            menteeData.lastName = ans["answer"].last;
            break;
          case "age":
            menteeData.age = ans["answer"];
            break;
          case "gender":
            menteeData.gender = ans["answer"];
            break;
          case "grade":
            menteeData.grade = ans["answer"];
            break;
          default:
            break;
        }
      } 
      setMentee(menteeData);
    } catch (e) {
      console.error(e);
      return;
    }
  }
  

  const getMentors = async () => {
    try {
      let mentors = await NetworkManager.makeRequest(Endpoints.GetMentors);
      console.log(mentors);
    } catch (e) {
      console.error(e);
      return;
    }

  }
  const onAssignMenteeToMentor = () => {
    if (selectedMentor == -1) return;
    setAssignMenteeToMentorModal(mentorList[selectedMentor]);
  }
  
  //RENDER FUNCTIONS
  const renderAssignMentorToMenteeModal = () => {
    if (!assignMenteeToMentorModal) {
      return;
    }

    return (
      <div className="modal-wrapper">
        <div className="trainee-assignment-modal">
          <h1>Assign Mentor to Mentee</h1>
          <p>Are you sure you wish to assign {assignMenteeToMentorModal.firstName} {assignMenteeToMentorModal.lastName} to Alice Jones? {/* Have to change this obviously */}</p>
          <div className="btn-wrappers">
            <button className="cancel-btn" onClick={() => setAssignMenteeToMentorModal(null)}>Cancel</button>
            {/* Until we figure out what we want to do here */}
            <button className="confirm-btn"onClick={() => setAssignMenteeToMentorModal(null)} >Confirm</button>
          </div>
        </div>
      </div>
    );
  }

  if (!mentee || !mentors) {
    return <Loading/>
  }

  return (
    <div className="mentor-mentee-match">
      {/* Close Button */}
      <img className='exit-btn' ref={refs[0]} src={close} onClick={() => navigate("/admin/assignments")} />
      {/* Header */}
      <div className="mentor-mentee-match-header">
        {/* Mentee Name */}
        <h1 className="mentee-name">
          {mentee.firstName} {mentee.lastName}
        </h1>
        {/* Assign Button */}
        <button 
          className="assign-btn" 
          ref={refs[1]}
          style={{
            backgroundColor: `${selectedMentor  !== -1 ? "#98db5f" : "grey"}`,
            cursor: `${selectedMentor  !== -1 ? "pointer" : "default"}`
          }}
          onClick={onAssignMenteeToMentor}
        >
          <img className="assign-icon" src={assign_icon} alt=""/>
          Assign
        </button>
      </div>
      
      {/* Assign Modal */}
      {renderAssignMentorToMenteeModal()}

      {/* Mentee Info Box */}
      <div className="mentee-info-box">
        <p className="mentee-info-text"> Gender: {mentee.gender}</p>
        <p className="mentee-info-text"> Age: {mentee.age}</p>
        <p className="mentee-info-text"> Grade: {mentee.grade}</p>
      </div>
      
      {/* Mentor Table */}
      <table className="mentor-table" ref={refs[2]}>
        {/* Mentor Table Header */}
        <thead>
          <tr>
            <th className="mentor-table-header">Mentor</th>
            <th className="mentor-table-header">Mentees</th>
            <th className="mentor-table-header">Gender</th>
            <th className="mentor-table-header">Age</th>
            <th className="mentor-table-header">School Level</th>
            <th className="mentor-table-header">Best Describes You</th>
            <th className="mentor-table-header">Interests and Hobbies</th>
          </tr>
        </thead>
        <tbody>
        {/* Mentor List */}
        {mentorList.map((mentor, idx) => 
            <tr 
              key={idx} 
              className="mentor-table-row-clickable" 
              onClick={() => setSelectedMentor(idx)} 
              style={{ backgroundColor: `${selectedMentor === idx ? "lightgray" : "white"}` }}
            >
              <td className="mentor-table-cell mentor-table-cell-left">
                <div>
                  {mentor.firstName + " " + mentor.lastName}
                </div>
              </td>
              <td className="mentor-table-cell">
                <div>3</div>
              </td>
              <td className="mentor-table-cell">
                <div>
                  {mentor.gender}
                </div>
              </td>
              <td className="mentor-table-cell">
                <div>
                  {mentor.age}
                </div>
              </td>
              <td className="mentor-table-cell">
                <div>
                  {mentor.schoolLevel}
                </div>
              </td>
              <td className="mentor-table-cell">
                <div className="describes-you">
                  {mentor.describesYou.map((elem, i) => <div key={i} className="descriptor">{elem}</div>)}
                </div>
              </td>
              <td className="mentor-table-cell mentor-table-cell-right">
                <div className="describes-you">
                  {mentor.interestsAndHobbies.map((elem, i) => <div key={i} className="descriptor">{elem}</div>)}
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MentorMenteeMatch;
