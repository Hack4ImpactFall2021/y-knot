import React from 'react';

import { Trainee, Mentor, ApplicantStages } from "../utils/utils";
import { useNavigate } from 'react-router-dom';

/*
Generic component for list item in a dashboard list
____________________________________________
| 
|  Title (e.g. Name of applicant) label (e.g. Applicant stage)
|
---------------------------------------------

*/
type Props = {
  label: string,
  title: string, 
  onClick: VoidFunction
}

const PersonTile: React.FC<Props> = ({ label, title, onClick }) => {
  return (
    <div className="dashboard-list-item" onClick={onClick}>
      <div className="label">{label}</div>
      <h1>{title}</h1>
    </div>
  );
}

export default PersonTile;