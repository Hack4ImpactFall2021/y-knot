import React from 'react';

import './FilterButton.css'
import all_applicants from '../assets/all.png';
import new_applicant from '../assets/new.png';
import interviewing from '../assets/interviewing.png';
import background_check from '../assets/background_check.png';
import accepted from '../assets/accepted.png';
import rejected from '../assets/rejected.png';
import { ApplicantStages, stagesToText } from '../utils/utils';

interface Props {
  type: ApplicantStages | null,
  onClick: VoidFunction,
  count: Number,
  selected: ApplicantStages | null
}

type filterToColorsType = {[key in ApplicantStages]: String}
type filterToImageType = {[key in ApplicantStages]: string}

const FilterButton: React.FC<Props> = ({type, selected, count, onClick}) => {

    const isSelected: boolean = type === selected;

    const filtersToColors: filterToColorsType = {
        [ApplicantStages.BackgroundCheck]: '#FCBB45',
        [ApplicantStages.New]: '#F44250',
        [ApplicantStages.Interviewing]: '#FF8427',
        [ApplicantStages.Accepted]: '#117A54',
        [ApplicantStages.Rejected]: 'black'
    }


    const filtersToImage: filterToImageType = {
        [ApplicantStages.BackgroundCheck]: background_check,
        [ApplicantStages.New]: new_applicant,
        [ApplicantStages.Interviewing]: interviewing,
        [ApplicantStages.Accepted]: accepted,
        [ApplicantStages.Rejected]: rejected
    }

    

    return (
        <div className={isSelected ? 'filter-button filter-button-selected' : 'filter-button'} onClick={onClick}  style = {{background: `linear-gradient(#FFFFFF 84%, ${type ? filtersToColors[type] : '#10275B'} 16%)` }}>
            <div className='filter-head'>
                <img src={type ? filtersToImage[type] : all_applicants} className='filter-image'/>
                <h1 className='filter-count'>{count}</h1>
            </div>
            {
                type ? 
                <h3 className='filter-text'>{stagesToText[type]}</h3>
                :
                <h3 className='filter-text'>All Applicants</h3>

            }
        </div>
    )
}

export default FilterButton;