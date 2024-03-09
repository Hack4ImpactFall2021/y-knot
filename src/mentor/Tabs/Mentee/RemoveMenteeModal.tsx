import React, { useEffect, useState } from "react";
import { MenteeForm } from "../../../utils/utils";

import "./RemoveMenteeModal.css";
import NetworkManager, { Endpoints } from "../../../network/NetworkManager";
import { ExtendedMenteeForm } from "../../MentorProfile";
type Props = {
  mentee: ExtendedMenteeForm;
  onCloseModal: () => void;
};

const RemoveMenteeModal: React.FC<Props> = ({ mentee, onCloseModal }) => {
  /* RENDER FUNCTIONS */
  const [notes, setNotes] = useState<string>("");
  const renderModalContent = () => {
    const onUnassign = async () => {
      await NetworkManager.makeRequest(Endpoints.UnmatchMentee, {
        menteeId: mentee.menteeId,
        mentorId: mentee.mentorId,
        mentorNotes: notes,
      });
      onCloseModal();
      window.location.reload();
    };

    return (
      <div className="modal-content">
        <p className="info-text">Reason for Removal</p>
        <textarea
          className="reason-note"
          value={notes}
          onChange={(event) => {
            setNotes(event.target.value);
          }}
        ></textarea>
        <div className="unassign-button" onClick={() => onUnassign()}>
          Remove
        </div>
      </div>
    );
  };
  return (
    <div className="remove-mentee-modal">
      <h1 className="mentee-name">{mentee?.childName}</h1>
      <span className="modal-close-btn" onClick={onCloseModal}>
        &times;
      </span>
      {renderModalContent()}
    </div>
  );
};
export default RemoveMenteeModal;
