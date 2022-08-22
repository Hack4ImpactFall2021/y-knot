import React, { useEffect, useState } from "react";

import "./AdvancementModal.css";
import loading from "../assets/loading.gif";
import { Actions } from "../Profile";
import Loading from "../../widgets/Loading";

type Props = {
  firstname: string;
  lastname: string;
  action: Actions;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setApplicantLogin: React.Dispatch<React.SetStateAction<[string, string]>>;
  accept: () => void;
  reject: () => void;
};

const AdvancementModal: React.FC<Props> = ({
  firstname,
  lastname,
  action,
  email,
  setEmail,
  setApplicantLogin,
  accept,
  reject,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [newEmail, setNewEmail] = useState(email);
  const [username, setUsername] = useState(
    firstname
      .charAt(0)
      .concat(lastname)
      .concat("@yknotinc.org")
      .toLocaleLowerCase()
  );
  const [password, setPassword] = useState(Math.random().toString(36).slice(2));
  const name = firstname + " " + lastname;

  useEffect(() => {
    console.log("setting email");
    setEmail(newEmail);
  }, [newEmail]);

  useEffect(() => {
    setApplicantLogin([username, password]);
  }, [username, password]);

  return (
    <div className="profile-modal">
      <div className="modal-container">
        {isLoading ? (
          <div className="modal-spinner">
            <img src={loading} />
          </div>
        ) : null}
        <div>
          <h2 className="modal-title">Confirm Changes</h2>
          <h3 className="modal-message">
            {action === Actions.MoveToInterviewStage ? (
              <p className="modal-message-text">
                Are you sure you want to move {name} to the{" "}
                <b>Interview Stage</b>? This action <b>cannot</b> be undone.{" "}
                <br></br> <br></br>This will send an email to the applicant
                asking them to schedule an interview.
              </p>
            ) : null}
            {action === Actions.MoveToBackgroundCheckStage ? (
              <p className="modal-message-text">
                Are you sure you want to move {name} to the{" "}
                <b>Background Check Stage</b>? This action <b>cannot</b> be
                undone. <br></br> <br></br>This will send an email to the
                applicant asking them to complete a background check.
              </p>
            ) : null}
            {action === Actions.Accept ? (
              <p className="modal-message-text">
                Are you sure you want to <b>accept</b> {name}? This action{" "}
                <b>cannot</b> be undone. <br></br> <br></br>Please make sure
                that you have created {name}'s Y-KNOT Gmail account and Y-KNOT
                mentor portal account (credentials below) before you proceed.
              </p>
            ) : null}
            {action === Actions.Reject ? (
              <p className="modal-message-text">
                Are you sure you want to <b>reject</b> {name}? This action{" "}
                <b>cannot</b> be undone.
              </p>
            ) : null}
            <br />
            <form
              className="modal-message-email"
              onSubmit={(e) => {
                e.preventDefault();
                setIsReady(!isReady);
              }}
            >
              <label>Email: </label>
              <input
                required
                type="email"
                disabled={isReady}
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />

              <input
                type="submit"
                className="modal-message-email-button"
                value={isReady ? "Change" : "Confirm"}
              />
            </form>

            {action === Actions.Accept ? (
              <div className="modal-message-login">
                <div className="modal-message-login-box">
                  <label>Username:</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="modal-message-login-box">
                  <label>Password:</label>
                  <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            ) : null}
          </h3>
        </div>
        <div className="modal-buttons-container">
          <button
            className="modal-button modal-reject"
            disabled={isLoading}
            onClick={() => {
              setIsLoading(true);
              reject();
            }}
          >
            Cancel
          </button>
          <button
            className="modal-button modal-accept"
            disabled={
              isLoading ||
              !isReady ||
              (action != Actions.Accept
                ? false
                : username.trim().length === 0 || password.trim().length === 0)
            }
            onClick={() => {
              setIsLoading(true);
              accept();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancementModal;
