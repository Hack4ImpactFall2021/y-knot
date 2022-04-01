import React, { useEffect, useState } from 'react';
import LogsReportsSquare from "./LogsReportsSquare";


import "./LogsReports.css";


const LogsReports: React.FC = () => {
    return (
        <section className="logs-reports-list">
            <div>
                <LogsReportsSquare
                    title="Hour Log"
                    text="Please make sure you keep track of all your hours weekly."
                />
                <LogsReportsSquare
                    title="Encounter Note"
                    text="This document is used to provide validation of each meeting. 
                            Please be reminded this is only for actual meetings!"
                />
                <LogsReportsSquare
                    title="School Visitation Request"
                    text="This document authorizes permission for a mentor to visit a
                            mentee's school. Please allow five days to process."
                />
                <LogsReportsSquare
                    title="Attempt Note"
                    text="This document is used to provide proof of attempts made by the mentor to the mentee.
                            Remember, if there are three consecutive missed attempts please reach out to the Director,
                            Mentoring for further recommendations."
                />
                <LogsReportsSquare
                    title="Activity Request"
                    text="This document is used to "
                />
                <LogsReportsSquare
                    title="Hour Log"
                    text="Please make sure you keep track of all your hours weekly."
                />
            </div>
        </section>
    )
}
export default LogsReports;