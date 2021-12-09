import React from 'react';

import "./Button.css";

type Props = {
    label: string
}

const Button: React.FC<Props> = ({label}) => {
    return (
        <div className="settings-button">
            <h3 className="button-text">{label}</h3>
        </div>
    );
}

export default Button;