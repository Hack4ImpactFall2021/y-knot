import React from 'react';
import { ApplicantFilters, ApplicantStages } from '../../utils/utils';

import "./ApplicantStageTile.css";
import new_applicant from '../../assets/new_white.png';
import interviewing from '../../assets/interviewing_white.png';
import background_check from '../../assets/background_check_white.png';


type Props = {
    stage: ApplicantStages,
    maximized: boolean
}

type stagesToColorsType = {[key in ApplicantStages]: string}
type filterToImageType = {[key in ApplicantStages]: string}

const ApplicantStageTile: React.FC<Props> = ({stage, maximized}) => {

    const stagesToColors: stagesToColorsType = {
        [ApplicantStages.New]: '#F44250',
        [ApplicantStages.BackgroundCheck]: '#FCBB45',
        [ApplicantStages.Interviewing]: '#FF8427',
        [ApplicantStages.Rejected]: 'black',
        [ApplicantStages.Accepted]: 'green'
    }

    const stagesToImage: filterToImageType = {
        [ApplicantStages.New]: new_applicant,
        [ApplicantStages.Interviewing]: interviewing,
        [ApplicantStages.BackgroundCheck]: background_check,
        [ApplicantStages.Rejected]: new_applicant,
        [ApplicantStages.Accepted]: new_applicant,
    }

    return (
        <div className='applicant-stage-tile' style={{backgroundColor: stagesToColors[stage]}}>
            {
                maximized ? 
                <img src={stagesToImage[stage]} className='tile-image'/>
                : null
            }
            <h1 className={maximized ? 'max' : 'min'} >{stage.charAt(0) + stage.slice(1).toLowerCase()}</h1>
        </div>
    );
}

export default ApplicantStageTile;