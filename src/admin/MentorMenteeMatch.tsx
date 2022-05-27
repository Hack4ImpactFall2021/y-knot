import React, { MouseEventHandler, useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MentorForm } from '../utils/utils';

import assign_icon from "./assets/assign_mentee_icon.png";
import close from "../profile/assets/close.png";
import "./MentorMenteeMatch.css"


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

const MentorMenteeMatch = () => {
  const navigate = useNavigate();
  const [selectedMentor, setSelectedMentor] = useState(-1);
  const [assignMenteeToMentorModal, setAssignMenteeToMentorModal] = useState<MentorForm | null>(null);
  const refs = useClickOutside(() => setSelectedMentor(-1));

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
          <h1>Assign Mentee to Mentor</h1>
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

  return (
    <div className="mentor-mentee-match">
      {/* Close Button */}
      <img className='exit-btn' ref={refs[0]} src={close} onClick={() => navigate(-1)} />
      {/* Header */}
      <div className="mentor-mentee-match-header">
        {/* Mentee Name */}
        <h1 className="mentee-name">
          {'Alice'} {'Jones'}
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
        <p className="mentee-info-text"> Gender: F</p>
        <p className="mentee-info-text"> Age: 20 </p>
        <p className="mentee-info-text"> Grade: 2 </p>
      </div>
      
      {/* Mentor Table */}
      <table className="mentor-table" ref={refs[2]}>
        {/* Mentor Table Header */}
        <tr>
          <th className="mentor-table-header">Mentor</th>
          <th className="mentor-table-header">Mentees</th>
          <th className="mentor-table-header">Gender</th>
          <th className="mentor-table-header">Age</th>
          <th className="mentor-table-header">School Level</th>
          <th className="mentor-table-header">Best Describes You</th>
          <th className="mentor-table-header">Interests and Hobbies</th>
        </tr>
        
        {/* Mentor List */}
        {mentorList.map((mentor, idx) => 
            <tr 
              key={idx} className="mentor-table-row-clickable" 
              onClick={() => setSelectedMentor(idx)} 
              style={{backgroundColor: `${selectedMentor === idx ? "lightgray" : "white"}`}}
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
                  {mentor.describesYou.map((elem) => <div className="descriptor">{elem}</div>)}
                </div>
              </td>
              <td className="mentor-table-cell mentor-table-cell-right">
                <div className="describes-you">
                  {mentor.interestsAndHobbies.map((elem) => <div className="descriptor">{elem}</div>)}
                </div>
              </td>
            </tr>
        )}
      </table>
    </div>
  );
}

export default MentorMenteeMatch;
