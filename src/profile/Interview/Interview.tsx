import React, { useEffect, useState } from 'react';

import { Applicant, JotformResponse } from '../../utils/utils';
import Calender from '../Calender/Calender';
import './Interview.css';
import edit from '../assets/edit.png';
import NetworkManager, { Endpoints } from '../../network/NetworkManager';

type Props = {
    data: JotformResponse,
    applicant: Applicant
}

const Interview: React.FC<Props> = ({data, applicant}) => {

    const [note, setNote] = useState<string>(applicant.notes || "");
    const [isSaved, setIsSaved] = useState<boolean>(true);

    const handleClick = async (): Promise<void> => {
        if (!isSaved) {
            try {
                await NetworkManager.makeRequest(Endpoints.UpdateNote, {note: note, id: applicant.submissionId, stage: applicant.stage})
                setIsSaved(true);
                console.log('Saved');
            } catch (error) {
                console.log(error);
            }
        }
    }


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
                            <p className='notes-header-center'>{isSaved ? 'All Changes Saved' : 'Unsaved Changes'}</p>
                            <div className='notes-header-right'>
                            <button className='save-btn' onClick={handleClick} disabled={isSaved}>Save</button>
                            </div>
                            
                        </div>
                        
                        <textarea  className='notes' value={note} onChange={e => {
                            setNote(e.target.value);
                            setIsSaved(false);
                        }}/>
                    </div>
                </div>
        </div>
    );
}

export default Interview;