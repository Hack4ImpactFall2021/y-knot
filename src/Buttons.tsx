import React from 'react';
import './Buttons.css'

interface CommonProps {
    text: string;
    barColor: string;
    count: number;
    totalApps: boolean;
    // onClick: () => void;
}

type IconProps = 
    | { totalApps: true; icon?: never}
    | { totalApps: false; icon: string}

type ButtonProps = CommonProps & IconProps

const Button = ({text, barColor, totalApps, icon, count}: ButtonProps) => {
    return (
        <button className='button'
            // onClick={onClick} 

            // this allows for a variable color bar on the bottom of the button
            style = {{background: "linear-gradient(#FFFFFF 84%, " + barColor + " 16%)" }}
            >
                
                <div className='button-content'> 
                    <div className='button-top'>

                       
                        {!totalApps && 
                        <div className='icon'>
                            <img src= {icon} alt=""/> 
                        </div> }

                       <div className='count'>
                           <b>{count}</b>
                       </div>

                    </div>

                    <div className='label'>
                        {text} 
                    </div>
                    
                </div>
                
                
        </button> 
    )
}

export default Button;