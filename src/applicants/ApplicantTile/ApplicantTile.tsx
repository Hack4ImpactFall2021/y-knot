import React from 'react';

import "./ApplicantTile.css";
import { Applicant } from '../../utils/utils';
import arrow from "../assets/arrow.png";
import ApplicantStageTile from '../ApplicantStageTile/ApplicantStageTile';

type Props = {
    applicant: Applicant
}

const ApplicantTile: React.FC<Props> = ({applicant}) => {
    return (
        <div className='applicant-tile'>
            <div className='applicant-tile-left'>
                <h1 className='applicant-name'>{applicant.firstName} {applicant.lastName}</h1>
                <ApplicantStageTile stage={applicant.stage}/>
            </div>
            <img src={arrow} className='arrow' />
        </div>
    );
}

export default ApplicantTile;