import React, { useEffect, useState } from 'react';
import MenteeTabItem from "./MenteeTabItem";
import MenteeInfoModal from "./MenteeInfoModal";
import { MenteeForm } from "../../../utils/utils";

import "./Mentee.css";
type Props = {
    mentees: MenteeForm[]
}
const Mentee: React.FC<Props> = ({ mentees }) => {
  const [mentee, setModal] = useState<MenteeForm>();

  /* RENDER FUNCTIONS */
  const renderModal = (mentee: MenteeForm | undefined) => {
    if (!mentee) return;
    return (
      <MenteeInfoModal 
        mentee={mentee}
        onCloseModal={() => setModal(undefined)}
      />
    );
  }

  return (
    <div className="mentee-list">
      {renderModal(mentee)}
      {mentees.map((ment, idx) => 
        <MenteeTabItem 
          key={idx}
          name={ment.childName}
          onClick={() => setModal(ment)}
        />)
      }
    </div>
  )
}
export default Mentee;