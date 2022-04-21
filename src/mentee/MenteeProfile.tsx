import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import close from "../profile/assets/close.png";

import "./MenteeProfile.css";

const MenteeProfile = () => {
    let name = "Aayushi";
    const navigate = useNavigate();

    return (
        <div className="mentee-content">
            {/* Close button */}
            <img className="exit-btn" src={close} onClick={() => navigate(-1)} />

            {/* <div className="mentee-content"> */}
                <h1 className="mentee-name">{name}</h1>

                <div className="parent-guardian mentee-info-response-box">
                    <h1 className="mentee-info-response-title">Parent/Guardian"s Name</h1>
                    <div className="mentee-info-response-body">
                        <p className="mentee-info-response-text"></p>
                    </div>
                </div>

                <div className="address mentee-info-response-box">
                <h1 className="mentee-info-response-title">Address</h1>
                <div className="address1">
                    <div className="response-body">
                        <p className="response-text"></p>
                        <p className="response-subtext">Street Address 1</p>
                    </div>
                </div>

                <div className="address2">
                    <div className="response-body">
                        <p className="response-text"></p>
                        <p className="response-subtext">Street Address 2</p>
                    </div>
                </div>

                <div className="city">
                    <div className="response-body">
                        <p className="response-text"></p>
                        <p className="response-subtext">City</p>
                    </div>
                </div>

                <div className="state">
                    <div className="response-body">
                        <p className="response-text"></p>
                        <p className="response-subtext">State</p>
                    </div>
                </div>

                <div className="zip-code">
                    <div className="response-body">
                        <p className="response-text"></p>
                        <p className="response-subtext">Zip Code</p>
                    </div>
                </div>
                </div>

                <div className="phone-age-grade">
                <div className="phone mentee-info-response-box">
                    <h1 className="mentee-info-response-title">Phone Number</h1>
                    <div className="mentee-info-response-body">
                    <p className="mentee-info-response-text"></p>
                    </div>
                </div>

                <div className="age mentee-info-response-box">
                    <h1 className="mentee-info-response-title">Age</h1>
                    <div className="mentee-info-response-body">
                    <p className="mentee-info-response-text"></p>
                    </div>
                </div>

                <div className="grade mentee-info-response-box">
                    <h1 className="mentee-info-response-title">Grade</h1>
                    <div className="mentee-info-response-body">
                    <p className="mentee-info-response-text"></p>
                    </div>
                </div>
                </div>

                <div className="email mentee-info-response-box">
                    <h1 className="mentee-info-response-title">Email</h1>
                    <div className="mentee-info-response-body">
                        <p className="mentee-info-response-text"></p>
                    </div>
                </div>

                <div className="school mentee-info-response-box">
                    <h1 className="mentee-info-response-title">School</h1>
                    <div className="mentee-info-response-body">
                        <p className="mentee-info-response-text"></p>
                    </div>
                </div>

                <div className="requested-by mentee-info-response-box">
                    <h1 className="mentee-info-response-title">Requested By</h1>
                    <div className="mentee-info-response-body">
                        <p className="mentee-info-response-text"></p>
                    </div>
                </div>

                <div className="position mentee-info-response-box">
                    <h1 className="mentee-info-response-title">Position</h1>
                    <div className="mentee-info-response-body">
                        <p className="mentee-info-response-text"></p>
                    </div>
                </div>

                <div className="assistance-areas mentee-info-response-box">
                    <h1 className="mentee-info-response-title">This child is being referred for assistance in the following areas</h1>
                    <div className="mentee-info-response-body">
                        <p className="mentee-info-response-text"></p>
                    </div>
                </div>

                <div className="interests mentee-info-response-box">
                    <h1 className="mentee-info-response-title">What particular interests, either in school or out, do you know this child has?</h1>
                    <div className="mentee-info-response-body">
                        <p className="mentee-info-response-text"></p>
                    </div>
                </div>

                <div className="strategies mentee-info-response-box">
                    <h1 className="mentee-info-response-title">What strategies/learning models might be effective for a Mentor working with this child?</h1>
                    <div className="mentee-info-response-body">
                        <p className="mentee-info-response-text"></p>
                    </div>
                </div>

                <div className="subjects mentee-info-response-box">
                    <h1 className="mentee-info-response-title">With what specific academic subjects, if any, does the child need assistance?</h1>
                    <div className="mentee-info-response-body">
                        <p className="mentee-info-response-text"></p>
                    </div>
                </div>

                <div className="additional-comments mentee-info-response-box">
                    <h1 className="mentee-info-response-title">Additional Comments:</h1>
                    <div className="mentee-info-response-body">
                        <p className="mentee-info-response-text"></p>
                    </div>
                </div>

            {/* </div> */}

        </div>

    );
}

export default MenteeProfile;