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
                    icon={addressbook}
                    title="Hour Log"
                    text="Please make sure you keep track of all your hours weekly."
                />
                <LogsReportsSquare
                    icon={bus}
                    title="Encounter Note"
                    text="This document is used to provide validation of each meeting. 
                            Please be reminded this is only for actual meetings!"
                />
                <LogsReportsSquare
                    icon={clock}
                    title="School Visitation Request"
                    text="This document authorizes permission for a mentor to visit a
                            mentee's school. Please allow five days to process."
                />
                <LogsReportsSquare
                    icon={comments}
                    title="Attempt Note"
                    text="This document is used to provide proof of attempts made by the mentor to the mentee.
                            Remember, if there are three consecutive missed attempts please reach out to the Director,
                            Mentoring for further recommendations."
                />
                <LogsReportsSquare
                    icon={hand}
                    title="Activity Request"
                    text="This document is used to "
                />
                <LogsReportsSquare
                    icon={pencil}
                    title="Hour Log"
                    text="Please make sure you keep track of all your hours weekly."
                />
            </div>
        </section>
    )
}
export default LogsReports;