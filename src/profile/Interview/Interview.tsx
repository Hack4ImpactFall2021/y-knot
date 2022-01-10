import React from 'react';

import { JotformResponse } from '../../utils/utils';
import Calender from '../Calender/Calender';
import './Interview.css';
import edit from '../assets/edit.png';

type Props = {data: JotformResponse}

const Interview: React.FC<Props> = ({data}) => {



    return (
        <div className='interview-information'>
            <div className='scheduling'>
                <h2 className='scheduling-text'>No Interview Scheduled</h2>
            </div>
                <div className='interview-body-left'>
                    <Calender date={new Date()} selected={-1}/>
                </div>
                <div className='interview-body-right'>
                    <div className='notes-container'>
                        <div className='notes-header'>
                            <div className='notes-header-left'>
                                <h1 className='notes-title'>NOTES:</h1>
                                <img src={edit} className='edit-icon'/>
                            </div>
                            <p className='notes-header-center'>All Changes Saved</p>
                            <div className='notes-header-right'>
                            <button className='save-btn'>Save</button>
                            </div>
                            
                        </div>
                        
                        <textarea  className='notes'/>
                    </div>
                </div>
        </div>
    );
}

export default Interview;