import React from 'react';

import "./Button.css";

type Props = {
    label: string;
    onClick: () => void;
}

const Button: React.FC<Props> = ({label, onClick}) => {
    return (
        <div className="settings-button" onClick={onClick}>
            <h3 className="button-text">{label}</h3>
        </div>
    );
}

export default Button;