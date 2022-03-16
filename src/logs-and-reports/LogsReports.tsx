import React from 'react';

import bus from "./assets/bus.png"
import comments from "./assets/comments.png"
import encounter from "./assets/encounter.png"
import hours from "./assets/hours.png"
import incident from "./assets/incident.png"
import pencil from "./assets/pencil.png"

const LogsReports = () => {
    return (
        <div className="logs-and-reports">
            <div className="btn-wrapper">
                <a target="_blank" href="https://y-knotinc.thinkific.com/">
                    <button className="hour-log-btn">
                        <img src = {hours}></img>
                        <h1 className = "btn-header">Hour Log</h1>
                        <h2 className = "btn-txt">Please make sure you keep track of your hours weekly</h2>
                    </button>
                </a>

                <a target="_blank" href="https://y-knotinc.thinkific.com/">
                    <button className="encounter-note-btn">
                        <img src = {encounter}></img>
                        <h1 className = "btn-header">Encounter Note</h1>
                        <h2 className = "btn-txt">This document is used to provide validation of each meeting. Please be reminded this is only for actual meetings!</h2>
                    </button>
                </a>

                <a target="_blank" href="https://y-knotinc.thinkific.com/">
                    <button className="school-visitation-btn">
                        <img src = {bus}></img>
                        <h1 className = "btn-header">School Visitation Request</h1>
                        <h2 className = "btn-txt">This document authorizes permission for a mentor to visit a mentee’s school. Please allow five days to process.</h2>
                    </button>
                </a>

                <a target="_blank" href="https://y-knotinc.thinkific.com/">
                    <button className="attempt-note-btn">
                        <img src = {comments}></img>
                        <h1 className = "btn-header">Attempt Note</h1>
                        <h2 className = "btn-txt">This document is used to provide proof of attempts made by the 
                        mentor to the mentee. *Reminder, if there are three consecutive missed attempts please 
                        reach out to the Director, Mentoring for further recommendations. *</h2>
                    </button>
                </a>

                <a target="_blank" href="https://y-knotinc.thinkific.com/">
                    <button className="activity-req-btn">
                        <img src = {pencil}></img>
                        <h1 className = "btn-header">Activity Request</h1>
                        <h2 className = "btn-txt">This document is used to request permission to meet a mentee 
                        outside of approved locations. *Please allow three days for processing.*</h2>
                    </button>
                </a>

                <a target="_blank" href="https://y-knotinc.thinkific.com/">
                    <button className="incident-report-btn">
                        <img src = {incident}></img>
                        <h1 className = "btn-header">Incident Report</h1>
                        <h2 className = "btn-txt">Use this document if any type of incident 
                        takes place that needs reporting. You will also find the number to report for 
                        mandated reporting.</h2>
                    </button>
                </a>
            </div>
        </div>
    );
}

export default LogsReports;