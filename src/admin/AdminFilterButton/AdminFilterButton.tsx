import React from 'react';

import './AdminFilterButton.css'
import mentor from '../assets/mentor.png';
import mentee from '../assets/mentee.png';
import { PersonTypes, stagesToText } from '../../utils/utils';

// interface Props {
//   type: PersonTypes | null,
//   onClick: VoidFunction,
//   count: Number,
//   selected: PersonTypes | null
// }

// type filterToColorsType = {[key in PersonTypes]: String}
// type filterToImageType = {[key in PersonTypes]: string}
let a = 0;

const AdminFilterButton: React.FC = () => {

    // const isSelected: boolean = type === selected;

    // const filtersToColors: filterToColorsType = {
    //     [PersonTypes.New]: '#6D9D3D',
    //     [PersonTypes.Interviewing]: '#1900B5'
    // }


    // const filtersToImage: filterToImageType = {
    //     [PersonTypes.New]: mentor,
    //     [PersonTypes.Interviewing]: mentee,
    // }

    

    return (
        // <div className={isSelected ? 'filter-button filter-button-selected' : 'filter-button'} onClick={onClick}  style = {{background: `linear-gradient(#FFFFFF 84%, ${type ? filtersToColors[type] : '#10275B'} 16%)` }}>
        //     <div className='filter-head'>
        //         <img src={type ? filtersToImage[type] : mentor} className='filter-image'/>
        //         <h1 className='filter-count'>{count}</h1>
        //     </div>
        //     {
        //         type ? 
        //         <h3 className='filter-text'>{stagesToText[type]}</h3>
        //         :
        //         <h3 className='filter-text'>All Applicants</h3>

        //     }
        // </div>
    <div></div>
    );
}

export default AdminFilterButton;