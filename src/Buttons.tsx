import React from 'react';
// import styles from './buttons.module.css';
import './Buttons.css'

interface ButtonProps {
    text: string;
    barColor: string;
    count: number;
    // icon: string;
    // onClick: () => void;
}

const Button = ({text, barColor, count}: ButtonProps) => {
    return (
        <button className='button'
            // onClick={onClick} 
            style = {{background: "linear-gradient(#FFFFFF 84%, " + barColor + " 16%)" }}
            >
                
                {text} 
        </button> // children instead of text?
    )
}

export default Button;