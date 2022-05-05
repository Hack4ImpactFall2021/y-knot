import React from 'react';

import "./PersonTile.css";
import { Trainee, Mentor, ApplicantStages } from '../../utils/utils';
import arrow from "../../applicants/assets/arrow.png";
import PersonTypeTile from '../PersonTypeTile/PersonTypeTile';
import { useNavigate } from 'react-router-dom';

type Props = {
  person: Trainee | Mentor 
}

const PersonTile: React.FC<Props> = ({person}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (person.stage == ApplicantStages.New)
      navigate('/admin/matching')
    else if (person.stage == ApplicantStages.Interviewing)
      navigate('/mentor/' + person.submissionId)
  }

    // // if person is a mentor, then navigate to their profile
    // if (person.stage == ApplicantStages.New) {
    //     const handleClick = () => {
    //         navigate('/mentor' + person.submissionId)
    //     }
    // }
    // // else if the person is a mentee, navigate to their profile
    // else if (person.stage == ApplicantStages.Interviewing) {
    //     const handleClick = () => {
    //         navigate('/mentor' + person.submissionId)
    //     }
    // }

  return (
    <div className='person-tile' onClick={handleClick}>
      <div className='person-tile-left'>
        <PersonTypeTile stage={person.stage}/>
        <h1 className='person-name'>{person.firstName} {person.lastName}</h1>
      </div>
      <img src={arrow} className='arrow' />
    </div>
  );
}

export default PersonTile;