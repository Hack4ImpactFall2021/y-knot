import React, { MouseEventHandler, useState } from 'react';
import {MentorForm} from '../utils/utils';

import "./MentorMenteeMatch.css"
import MenteeInfoBox from "./MenteeInfoBox"



const mentorList: MentorForm[] = [
  {
      firstName: "Grace",
      lastName: "Ko",
      gender: "F",
      age: 19,
      schoolLevel: "High School",
      describesYou: ["Outgoing", "Vibrant"],
      interestsAndHobbies: ["Sports", "Reading"]
  }
];

const MentorMenteeMatch = () => {

  return (
    <div className="mentor-mentee-match">
      <div className="mentor-mentee-match-header">
        {/* Mentor Name */}
        <h1 className="mentor-name">
          {'Alice'} {'Jones'}
        </h1>
        <MenteeInfoBox 
          gender='F' 
          age='15' 
          grade='9' />
        </div>

        <table className="mentor-table">
          <tr>
            <th className="mentor-table-header">Mentor</th>
            <th className="mentor-table-header">Mentees</th>
            <th className="mentor-table-header">Gender</th>
            <th className="mentor-table-header">Age</th>
            <th className="mentor-table-header">School Level</th>
            <th className="mentor-table-header">Best Describes You</th>
            <th className="mentor-table-header">Interests and Hobbies</th>
          </tr>
          
          {mentorList.map((mentor) => {
              return <tr className="mentor-table-row-clickable">
                <td className="mentor-table-cell mentor-table-cell-left">{mentor.firstName + " " + mentor.lastName}</td>
                <td className="mentor-table-cell">3</td>
                <td className="mentor-table-cell">F</td>
                <td className="mentor-table-cell">19</td>
                <td className="mentor-table-cell">High School</td>
                <td className="mentor-table-cell"></td>
                <td className="mentor-table-cell mentor-table-cell-right"></td>
              </tr>;
          })}
        </table>
    </div>
  );
}

export default MentorMenteeMatch;