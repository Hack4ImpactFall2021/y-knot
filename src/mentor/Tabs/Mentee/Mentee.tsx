import React, { useEffect, useState } from "react";
import MenteeTabItem from "./MenteeTabItem";
import MenteeInfoModal from "./MenteeInfoModal";
import RemoveMenteeModal from "./RemoveMenteeModal";
import { MenteeForm, MenteeFormNotes } from "../../../utils/utils";

import "./Mentee.css";
import { ExtendedMenteeForm } from "../../MentorProfile";
type Props = {
  mentees: ExtendedMenteeForm[];
};
const Mentee: React.FC<Props> = ({ mentees }) => {
  const [mentee, setModal] = useState<ExtendedMenteeForm>();
  const [unassignModalMentee, setUnassignModalMentee] =
    useState<ExtendedMenteeForm>();

  /* RENDER FUNCTIONS */
  const renderModal = (mentee: ExtendedMenteeForm | undefined) => {
    if (mentee)
      return (
        <MenteeInfoModal
          mentee={mentee}
          onCloseModal={() => setModal(undefined)}
        />
      );
    if (unassignModalMentee)
      return (
        <RemoveMenteeModal
          mentee={unassignModalMentee}
          onCloseModal={() => setUnassignModalMentee(undefined)}
        />
      );
  };

  return (
    <div className="mentee-list">
      {renderModal(mentee)}
      {mentees && mentees.length > 0 ? (
        mentees.map((ment, idx) => (
          <MenteeTabItem
            key={idx}
            name={ment.childName}
            onClick={() => setModal(ment)}
            onUnassign={() => setUnassignModalMentee(ment)}
          />
        ))
      ) : (
        <p>No mentees to display</p>
      )}
    </div>
  );
};
export default Mentee;
