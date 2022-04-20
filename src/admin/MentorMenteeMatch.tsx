import React from 'react';

import "./MentorMenteeMatch.css"
import MenteeInfoBox from "./MenteeInfoBox"

const mentorList = [
  {
      name: "Grace Ko"
  },
  {
      name: "Angela Liu"
  },
  {
      name: "Ash Genesan"
  },
  {
      name: "Bobby Smith"
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
            <th>Mentor</th>
            <th>Mentees</th>
            <th>Gender</th>
            <th>Age</th>
            <th>School Level</th>
            <th>Best Describes You</th>
            <th>Interests and Hobbies</th>
          </tr>
          <tr>
            <td className="mentor-table-cell">Grace Ko</td>
            <td className="mentor-table-cell">3</td>
            <td className="mentor-table-cell">F</td>
            <td className="mentor-table-cell">19</td>
            <td className="mentor-table-cell">High School</td>
            <td className="mentor-table-cell"></td>
            <td className="mentor-table-cell"></td>
          </tr>
          <tr>
            <td className="mentor-table-cell">Angela Liu</td>
            <td className="mentor-table-cell"></td>
            <td className="mentor-table-cell">F</td>
            <td className="mentor-table-cell">19</td>
            <td className="mentor-table-cell">Elementary</td>
            <td className="mentor-table-cell"></td>
            <td className="mentor-table-cell"></td>
          </tr>
          <tr>
            <td className="mentor-table-cell">Angela Liu</td>
            <td className="mentor-table-cell"></td>
            <td className="mentor-table-cell">F</td>
            <td className="mentor-table-cell">19</td>
            <td className="mentor-table-cell">Elementary</td>
            <td className="mentor-table-cell"></td>
            <td className="mentor-table-cell"></td>
          </tr>
          <tr>
            <td className="mentor-table-cell">Bobby Smith</td>
            <td className="mentor-table-cell"></td>
            <td className="mentor-table-cell">M</td>
            <td className="mentor-table-cell">25</td>
            <td className="mentor-table-cell">Elementary</td>
            <td className="mentor-table-cell"></td>
            <td className="mentor-table-cell"></td>
          </tr>
        </table>
    </div>
  );
}

export default MentorMenteeMatch;