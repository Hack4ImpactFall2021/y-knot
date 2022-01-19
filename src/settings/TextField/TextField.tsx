import React, { useState } from 'react';

import './TextField.css';
import question from '../assets/question.png';

type Props = {
    label: string,
    value: string,
    onChange: (val: string) => void;
    hasHover?: boolean
}

const TextField: React.FC<Props> = ({label, value, onChange, hasHover}) => {
    
    const [showHint, setShowHint] = useState<boolean>(false);
    
    return (
        <div className='container'>
            <h2 className='label'>{label} {hasHover ? <span> <img src={question} onClick={() => setShowHint(!showHint)}/>{showHint ? "Password must be longer than 6 characters" : ""}</span> : null}</h2>
            <input className='text-field' type="text" value={value} onChange={({ target: { value } }) => onChange(value)}/>
        </div>
    );
}

export default TextField;