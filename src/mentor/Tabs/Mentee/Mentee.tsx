import React, { useEffect, useState } from 'react';
import MenteeTabItem from "./MenteeTabItem";
import MenteeInfoModal from "./MenteeInfoModal";

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
  const [name, setModal] = useState("");


  /* RENDER FUNCTIONS */
  const renderModal = (name: string) => {
    if (!name) return;
    return (
      <MenteeInfoModal 
        name={name}
        onCloseModal={() => setModal("")}
      />
    );
  }

  return (
    <div className="mentee-list">
      {renderModal(name)}
      {mentees.map((ment, idx) => 
        <MenteeTabItem 
          key={idx}
          name={ment.name}
          onClick={(name) => setModal(name)}
        />)
      }
    </div>
  )
}
export default Mentee;