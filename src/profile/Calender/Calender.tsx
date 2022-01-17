import React from 'react';

import './Calender.css';

type Props = {
    date: Date | null
}

const Calender: React.FC<Props> = ({date}) => {

    let currentDate = date;

    if (!currentDate) {
        currentDate = new Date();
    }

       
    const numDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    const startingDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

   

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
    const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER']
    
    return (
        <div className='calender-container'>
            <h1 className='calender-month'>{months[currentDate.getMonth()]}</h1>
            {
                days.map(day => {
                    return(<h2 className='calender-weekday'>{day}</h2>);
                })
            }
            {
               Array.from(Array(startingDay ).keys()).map(item => {
                return (<p className='calender-day'></p>)
            })
            }
            {
                Array.from(Array(numDays).keys()).map(item => {
                    return (<p className={(date && item+1 === date.getDate()) ? 'calender-day calender-selected': 'calender-day'}>{item + 1}</p>)
                })
            }

        </div>
    )
}

export default Calender;