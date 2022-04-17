import React from 'react';

import "./PersonTile.css";
import { Applicant } from '../../utils/utils';
import arrow from "../../applicants/assets/arrow.png";
import PersonTypeTile from '../PersonTypeTile/PersonTypeTile';
import { useNavigate } from 'react-router-dom';

type Props = {
    person: Applicant
}

const PersonTile: React.FC<Props> = ({person}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/' + person.submissionId)
    }

    return (
        <div className='person-tile' onClick={handleClick}>
            <div className='person-tile-left'>
                <PersonTypeTile stage={person.stage}/>
                <h1 className='person-name'>{person.firstName} {person.lastName}</h1>
            </div>
            <img src={arrow} className='arrow' />
        </div>
    );
}

export default PersonTile;