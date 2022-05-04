import React from 'react';
import { ApplicantStages, stagesToText } from '../../utils/utils';

import "./PersonTypeTile.css";

type Props = {
    stage: ApplicantStages
}

type stagesToColorsType = {[key in ApplicantStages]: string}

const PersonTypeTile: React.FC<Props> = ({stage}) => {

    const stagesToColors: stagesToColorsType = {
        [ApplicantStages.New]: '#6D9D3D',
        [ApplicantStages.Interviewing]: '#1900B5',
        [ApplicantStages.BackgroundCheck]: '#FCBB45',
        [ApplicantStages.Rejected]: 'black',
        [ApplicantStages.Accepted]: '#117A54'
    }

    return (
        <div className='person-type-tile' style={{backgroundColor: stagesToColors[stage]}}>
            <h1 className='label'>{stagesToText[stage]}</h1>
        </div>
    );
}

export default PersonTypeTile;