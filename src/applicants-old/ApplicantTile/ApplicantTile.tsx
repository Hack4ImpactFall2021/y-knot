import React from 'react';

import "./ApplicantTile.css";
import { Applicant } from '../../utils/utils';
import arrow from "../assets/arrow.png";
import ApplicantStageTile from '../ApplicantStageTile/ApplicantStageTile';
import { useNavigate } from 'react-router-dom';

type Props = {
    applicant: Applicant
}

const ApplicantTile: React.FC<Props> = ({applicant}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/' + applicant.submissionId)
    }

    return (
        <div className='applicant-tile' onClick={handleClick}>
            <div className='applicant-tile-left'>
                <ApplicantStageTile stage={applicant.stage} maximized={false}/>
                <h1 className='applicant-name'>{applicant.firstName} {applicant.lastName}</h1>
            </div>
            <img src={arrow} className='arrow' />
        </div>
    );
}

export default ApplicantTile;