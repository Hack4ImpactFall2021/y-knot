import React, { useEffect, useState } from 'react';
import MenteeTile from "./MenteeTile";


import "./Mentee.css";
type Props = {
    mentees: any[]
}
/*
mentee -> list of mentee objects
{
    name

*/
const Mentee: React.FC<Props> = ({ mentees }) => {
    return (
        <section className="mentee-list">
            <div className="scroll-section">
                {mentees.map((ment, idx) => 
                    <MenteeTile 
                        key={idx}
                        name={ment.name}
                    />)
                }
            </div>
        </section>
    )
}
export default Mentee;