import React from 'react';

import './TextField.css';

type Props = {
    label: string
}

const TextField: React.FC<Props> = ({label}) => {
    return (
        <div className='container'>
            <h2 className='label'>{label}</h2>
            <input className='text-field' type="text"/>
        </div>
    );
}

export default TextField;