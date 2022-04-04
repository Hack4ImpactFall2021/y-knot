import React, { useEffect, useState } from 'react';
import LogsReportsSquare from "./LogsReportsSquare";


import "./LogsReports.css";

import addressbook from "./assets/address-book.png";
import bus from "./assets/bus.png";
import clock from "./assets/clock.png";
import comments from "./assets/comments.png";
import hand from "./assets/hand.png";
import pencil from "./assets/pencil.png";


const LogsReports: React.FC = () => {
    return (
        <section className="logs-reports-list">
            <div>
                <LogsReportsSquare
                    icon={clock}
                    title="Hour Log"
                    text="Please make sure you keep track of all your hours weekly."
                    color="#45963B"
                />
                <LogsReportsSquare
                    icon={addressbook}
                    title="Encounter Note"
                    text="This document is used to provide validation of each meeting. 
                            Please be reminded this is only for actual meetings!"
                    color="#45963B"
                />
                <LogsReportsSquare
                    icon={bus}
                    title="School Visitation Request"
                    text="This document authorizes permission for a mentor to visit a
                            mentee's school. Please allow five days to process."
                    color="#2912BE"
                />
                <LogsReportsSquare
                    icon={comments}
                    title="Attempt Note"
                    text="This document is used to provide proof of attempts made by the mentor to the mentee.
                            Remember, if there are three consecutive missed attempts please reach out to the Director,
                            Mentoring for further recommendations."
                    color="#FFE425"
                />
                <LogsReportsSquare
                    icon={pencil}
                    title="Activity Request"
                    text="This document is used to request permission to meet a mentee outside of approved locations.
                    *Please allow three days for processing.*"
                    color="#FFE425"
                />
                <LogsReportsSquare
                    icon={hand}
                    title="Incident Report"
                    text="Use this document if any type of incident takes place that needs reporting. You will also find the number to report for mandated reporting."
                    color="#F27F1E"
                />
            </div>
        </section>
    )
}
export default LogsReports;