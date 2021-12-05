import React, { useState } from 'react'
import Calendar from 'react-calendar';
import './CustomCalendar.css';
import './Interview.css';

const Interview = () => {
  const interview_scheduled:boolean = true; // change depending on if interview is scheduled
  const date = new Date()   // replace with date of interview
  const time = "8 AM - 9 AM"  // replace with time of interview
  const zoom_link = "https://us02web.zoom.us/j/9515847317"

  return (
    <div className='interview-container'>
      <div className='interview-scheduled'>
        {interview_scheduled && (
          <p>This applicant's interview is scheduled to be on {date.toLocaleDateString('en-US')} at <a href={zoom_link}>{zoom_link}</a>.</p>
        )}

        {!interview_scheduled && (
          <p>This applicant's interview hasn't been scheduled yet.</p>
        )}
        
      </div>

      <div className='calendar-and-notes'>
        {interview_scheduled && (
          <div className='calendar-container'>
            <Calendar className="react-calendar"
              value={date}
              showNeighboringMonth={false}
            />

          <div className='interview-time'>
            <p className='time'>{time}</p>
            <p className='applicant-interview'>Applicant Interview</p>
          </div>
        </div>
        )}

        {!interview_scheduled && (
          <div className='calendar-container'>
            <Calendar className="react-calendar--not-scheduled"
              showNeighboringMonth={false}
            />
        </div>
        )}

        <textarea className='interview-notes' placeholder="Notes" />
      </div>
      
    </div>

    
  )
}

export default Interview
