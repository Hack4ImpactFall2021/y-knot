import React from 'react';

import './FilterButton.css'
import new_applicant from '../../assets/new.png';
import interviewing from '../../assets/interviewing.png';
import background_check from '../../assets/background_check.png';
import { ApplicantFilters } from '../../utils/utils';

interface Props {
    type: ApplicantFilters,
    onClick: VoidFunction,
    count: Number,
    selected: ApplicantFilters
}

type filterToColorsType = {[key in ApplicantFilters]: String}
type filterToImageType = {[key in ApplicantFilters]: string}

const FilterButton: React.FC<Props> = ({type, selected, count, onClick}) => {

    const isSelected: boolean = type === selected;

    const filtersToColors: filterToColorsType = {
        [ApplicantFilters.AllApplicants]: '#10275B',
        [ApplicantFilters.BackgroundCheck]: '#FCBB45',
        [ApplicantFilters.NewApplicants]: '#F44250',
        [ApplicantFilters.Interviewing]: '#FF8427'
    }

    const filtersToImage: filterToImageType = {
        [ApplicantFilters.AllApplicants]: new_applicant,
        [ApplicantFilters.BackgroundCheck]: background_check,
        [ApplicantFilters.NewApplicants]: new_applicant,
        [ApplicantFilters.Interviewing]: interviewing
    }

    return (
        <div className={isSelected ? 'filter-button filter-button-selected' : 'filter-button'} onClick={onClick}  style = {{background: "linear-gradient(#FFFFFF 84%, " + filtersToColors[type] + " 16%)" }}>
            <div className='filter-head'>
                <img src={filtersToImage[type]} className='filter-image'/>
                <h1 className='filter-count'>{count}</h1>
            </div>
            <h3 className='filter-text'>{type}</h3>
        </div>
    )
}

export default FilterButton;