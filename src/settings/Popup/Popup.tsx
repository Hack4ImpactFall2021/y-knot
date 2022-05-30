import React from 'react';

import "./Popup.css";
import error from '../assets/error.png';
import success from '../assets/success.png';
import close from '../assets/close.png';

interface Props {
    isError: boolean,
    text: string,
    setText: (msg: [boolean, string]) => void
}

const Popup: React.FC<Props> = ({isError, text, setText}) => {
    return (
    <div></div>
    );
}

export default Popup