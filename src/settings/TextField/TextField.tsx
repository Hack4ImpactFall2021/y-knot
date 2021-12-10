import React from 'react';

import './TextField.css';

type Props = {
    label: string,
    value: string,
    onChange: (val: string) => void;
}

const TextField: React.FC<Props> = ({label, value, onChange}) => {
    return (
        <div className='container'>
            <h2 className='label'>{label}</h2>
            <input className='text-field' type="text" value={value} onChange={({ target: { value } }) => onChange(value)}/>
        </div>
    );
}

export default TextField;