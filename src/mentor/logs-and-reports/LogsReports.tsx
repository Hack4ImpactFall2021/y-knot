import React from 'react';
import LogsReportsSquare from "./LogsReportsSquare";

import bus from "./assets/bus.png"
import comments from "./assets/comments.png"
import encounter from "./assets/encounter.png"
import hours from "./assets/hours.png"
import incident from "./assets/incident.png"
import pencil from "./assets/pencil.png"

import "./LogsReports.css"

const LogsReports = () => {
    return (

            <div className="logs-reports-list">
                <div className = "item1">
                    <LogsReportsSquare
                        icon={hours}
                        title="Hour Log"
                        text="Please make sure you keep track of all your hours weekly."
                        color="#45963B"
                    />
                </div>
                <div className="item2">
                    <a target="_blank" style={{textDecoration: `none`}} href="https://form.jotform.com/210117812875050" >
                    <LogsReportsSquare
                        icon={encounter}
                        title="Encounter Note"
                        text="This document is used to provide validation of each meeting. 
                                Please be reminded this is only for actual meetings!"
                        color="#45963B"
                    />
                    </a>
                </div>
                <div className="item3">
                    <a target="_blank" style={{textDecoration: `none`}} href="https://form.jotform.com/210196013862046">
                    <LogsReportsSquare
                        icon={bus}
                        title="School Visitation Request"
                        text="This document authorizes permission for a mentor to visit a
                                mentee's school. Please allow five days to process."
                        color="#2912BE"
                    />
                    </a>
                </div>
                <div className = "item4">
                    <a target="_blank" style={{textDecoration: `none`}} href="https://form.jotform.com/210117785912051">
                <LogsReportsSquare
                    icon={comments}
                    title="Attempt Note"
                    text="This document is used to provide proof of attempts made by the mentor to the mentee.
                            Remember, if there are three consecutive missed attempts please reach out to the Director,
                            Mentoring for further recommendations."
                    color="#FFE425"
                    />
                    </a>
                </div>
                <div className = "item5"> 
                    <a target="_blank" style={{textDecoration: `none`}} href="https://form.jotform.com/210806121792046">
                    <LogsReportsSquare
                        icon={pencil}
                        title="Activity Request"
                        text="This document is used to request permission to meet a mentee outside of approved locations.
                        *Please allow three days for processing.*"
                        color="#FFE425"
                    />
                    </a>
                </div>
                <div className="item6">
                    <a target="_blank" style={{textDecoration: `none`}} href="https://form.jotform.com/220267320255043">
                    <LogsReportsSquare
                        icon={incident}
                        title="Incident Report"
                        text="Use this document if any type of incident takes place that needs reporting. You will also find the number to report for mandated reporting."
                        color="#F27F1E"
                    />
                    </a>
                </div>
            </div>
    );
}

export default LogsReports;