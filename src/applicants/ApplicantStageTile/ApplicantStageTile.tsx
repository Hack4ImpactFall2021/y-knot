import React from 'react';
import { ApplicantStages } from '../../utils/utils';

import "./ApplicantStageTile.css";

type Props = {
    stage: ApplicantStages
}

type stagesToColorsType = {[key in ApplicantStages]: string}

const ApplicantStageTile: React.FC<Props> = ({stage}) => {

    const stagesToColors: stagesToColorsType = {
        [ApplicantStages.New]: '#F44250',
        [ApplicantStages.BackgroundCheck]: '#FCBB45',
        [ApplicantStages.Interviewing]: '#FF8427',
        [ApplicantStages.Rejected]: 'black',
        [ApplicantStages.Accepted]: 'green'
    }

    return (
        <div className='applicant-stage-tile'>
            <h1 style={{backgroundColor: stagesToColors[stage]}}>{stage.charAt(0) + stage.slice(1).toLowerCase()}</h1>
        </div>
    );
}

export default ApplicantStageTile;