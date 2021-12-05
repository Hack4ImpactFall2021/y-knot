import React, { useState } from 'react'
import Calendar from 'react-calendar';
import './CustomCalendar.css';
import './Interview.css';

const Interview = () => {
  const date = new Date()
  const time = "8 AM - 9 AM"
  return (
    <div className='interview-container'>
      <div className='interview-scheduled'>
        <h2>This applicant's interview is scheduled to be on {date.toDateString()} at _______________.</h2>
      </div>

      <div className='calendar-and-notes'>
        <div className='calendar-container'>
          <Calendar className="react-calendar"
            value={date}
            showNeighboringMonth={false}
          />

          <div className='interview-time'>
            {time}
            <p></p>
            Applicant Interview
          </div>
        </div>

        <textarea className='interview-notes' placeholder="Notes" />
      </div>
      
    </div>

    
  )
}

export default Interview
