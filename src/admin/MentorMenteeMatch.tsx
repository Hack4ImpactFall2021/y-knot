import React, { MouseEventHandler, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {MentorForm} from '../utils/utils';

import assign_icon from "./assets/assign_mentee_icon.png";
import close from "../profile/assets/close.png";
import "./MentorMenteeMatch.css"



/* To detect whether or not the user has clicked outside the mentor table. If they have, then
that should deselect the currently selected mentor. This function (hook) takes
in a function that is called when the user clicks outside of a DOM node. It also
creates a reference to a generic DOM node that is returned. This returned reference 
can be attached to whichever DOM node we want to register the on outside click event.  */
const useClickOutside = (onClickOutside: () => void) => {
   let domNode = useRef<HTMLTableElement>(null);

   //Because I gave up on trying to get the types to work.
   let handleClick = (e:any) => {
      e.preventDefault();
      if (domNode.current && !domNode.current.contains(e.target)) {
         onClickOutside();
      } 
   }

   useEffect(() => {
      document.addEventListener("mousedown", handleClick);       
      return () => document.removeEventListener("mousedown", handleClick);
   }, []);

   return domNode;
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
  const ref = useClickOutside(() => setSelectedMentor(-1));

  return (
    <div className="mentor-mentee-match">
      {/* Close Button */}
      <img className='exit-btn' src={close} onClick={() => navigate(-1)} />
      {/* Header */}
      <div className="mentor-mentee-match-header">
        {/* Mentee Name */}
        <h1 className="mentee-name">
          {'Alice'} {'Jones'}
        </h1>
        {/* Assign Button */}
        <button className="assign-btn" style={{backgroundColor: `${selectedMentor  !== -1 ? "#98db5f" : "grey"}`}}>
          <img className="assign-icon" src={assign_icon} alt=""/>
          Assign
        </button>
      </div>

      {/* Mentee Info Box */}
      <div className="mentee-info-box">
        <p className="mentee-info-text"> Gender: F</p>
        <p className="mentee-info-text"> Age: 20 </p>
        <p className="mentee-info-text"> Grade: 2 </p>
      </div>
      
      {/* Mentor Table */}
      <table className="mentor-table" ref={ref}>
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
