
import React, { useEffect, useState } from "react";
import { MenteeForm } from "../../../utils/utils";

import "./MenteeInfoModal.css";
type Props = {
  mentee: MenteeForm
  onCloseModal: () => void
}

const MenteeInfoModal: React.FC<Props> = ({ mentee, onCloseModal }) => {

  console.log(mentee)

  /* RENDER FUNCTIONS */
  const renderModalContent = () => {
    return (
      <div className="modal-content">

      <div className="parent-guardian mentee-info-response-box">
        <h1 className="mentee-info-response-title">Parent/Guardian's Name</h1>
        <div className="mentee-info-response-body">
          <p className="mentee-info-response-text">{mentee.parentName}</p>
        </div>
      </div>

      <div className="address mentee-info-response-box">
        <h1 className="mentee-info-response-title">Address</h1>
        <div className="address1">
            <div className="mentee-info-response-body">
                <p className="mentee-info-response-text">{mentee.streetAddress}</p>
                <p className="mentee-info-response-subtext">Street Address 1</p>
            </div>
        </div>

        <div className="address2">
            <div className="mentee-info-response-body">
                <p className="mentee-info-response-text"></p>
                <p className="mentee-info-response-subtext">Street Address 2</p>
            </div>
        </div>

        <div className="city">
            <div className="mentee-info-response-body">
                <p className="mentee-info-response-text">{mentee.city}</p>
                <p className="mentee-info-response-subtext">City</p>
            </div>
        </div>

        <div className="state">
            <div className="mentee-info-response-body">
                <p className="mentee-info-response-text">{mentee.state}</p>
                <p className="mentee-info-response-subtext">State/Province/Region</p>
            </div>
        </div>

        <div className="zip-code">
            <div className="mentee-info-response-body">
                <p className="mentee-info-response-text">{mentee.zip}</p>
                <p className="mentee-info-response-subtext">Zip Code</p>
            </div>
        </div>
        <div className="country">
            <div className="mentee-info-response-body">
                <p className="mentee-info-response-text"></p>
                <p className="mentee-info-response-subtext">Country</p>
            </div>
        </div>
      </div>

      <div className="phone-age-grade">
        <div className="phone mentee-info-response-box">
          <h1 className="mentee-info-response-title">Phone Number</h1>
          <div className="mentee-info-response-body">
            <p className="mentee-info-response-text">{mentee.phoneNumber}</p>
          </div>
        </div>

        <div className="age mentee-info-response-box">
          <h1 className="mentee-info-response-title">Age</h1>
          <div className="mentee-info-response-body">
            <p className="mentee-info-response-text">{mentee.age}</p>
          </div>
        </div>

        <div className="grade mentee-info-response-box">
          <h1 className="mentee-info-response-title">Grade</h1>
          <div className="mentee-info-response-body">
            <p className="mentee-info-response-text">{mentee.grade}</p>
          </div>
        </div>
      </div>

      <div className="email mentee-info-response-box">
        <h1 className="mentee-info-response-title">Email</h1>
        <div className="mentee-info-response-body">
          <p className="mentee-info-response-text">{mentee.email}</p>
        </div>
      </div>

      <div className="school mentee-info-response-box">
        <h1 className="mentee-info-response-title">School</h1>
        <div className="mentee-info-response-body">
          <p className="mentee-info-response-text">{mentee.school}</p>
        </div>
      </div>

      <div className="requested-by mentee-info-response-box">
        <h1 className="mentee-info-response-title">Requested By</h1>
        <div className="mentee-info-response-body">
          <p className="mentee-info-response-text">{mentee.requestedBy}</p>
        </div>
      </div>

      <div className="assistance-areas mentee-info-response-box">
        <h1 className="mentee-info-response-title">This child is being referred for assistance in the following areas</h1>
        <div className="mentee-info-response-body-lg">
          <p className="mentee-info-response-text">{mentee.areas.join(", ")}</p>
        </div>
      </div>

      <div className="interests mentee-info-response-box">
        <h1 className="mentee-info-response-title">What particular interests, either in school or out, do you know this child has?</h1>
        <div className="mentee-info-response-body-lg">
          <p className="mentee-info-response-text">{mentee.interests.reduce((p, c, i) => {return i == 0 ? c : `${p}, ${c}`})}</p>
        </div>
      </div>

      <div className="strategies mentee-info-response-box">
        <h1 className="mentee-info-response-title">What words best describe the child?</h1>
        <div className="mentee-info-response-body-lg">
          <p className="mentee-info-response-text">{mentee.bestDescribes.reduce((p, c, i) => {return i == 0 ? c : `${p}, ${c}`})}</p>
        </div>
      </div>

      <div className="subjects mentee-info-response-box">
        <h1 className="mentee-info-response-title">With what specific academic subjects, if any, does the child need assistance?</h1>
        <div className="mentee-info-response-body-lg">
          <p className="mentee-info-response-text">{mentee.subjects}</p>
        </div>
      </div>

      <div className="additional-comments mentee-info-response-box">
        <h1 className="mentee-info-response-title">Additional Comments:</h1>
        <div className="mentee-info-response-body-lg">
          <p className="mentee-info-response-text">{mentee.otherComments}</p>
        </div>
      </div>
      </div>

    );
  }
  return (
    <div className="mentee-info-modal">
      <h1 className="mentee-name">{mentee?.childName}</h1>
      <span className="modal-close-btn" onClick={onCloseModal}>&times;</span>
      {renderModalContent()}
    </div>
  );
}
export default MenteeInfoModal;