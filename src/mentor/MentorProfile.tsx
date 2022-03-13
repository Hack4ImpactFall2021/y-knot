import React, { useState, useEffect } from 'react';
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';

import './MentorProfile.css';
import Content from './Content/Content';
import NetworkManager, { Endpoints } from '../network/NetworkManager';
import { Applicant, JotformResponse } from '../utils/utils';
import close from '../profile/assets/close.png';

export enum Tabs { MentorInfo = "Your Profile" , MenteeProfile = "Mentee Profile"};

const MentorProfile = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [applicant, setApplicant] = useState<Applicant | null>(null);
    const [formData, setFormData] = useState<JotformResponse | null>(null);
    const [email, setEmail] = useState<string>("");
    const [applicantLogin, setApplicantLogin] = useState<[string, string]>(["", ""]);

    const [tab, setTab] = useState<string>(Tabs.MentorInfo);

    useEffect(() => {
        getApplicant();
        getApplicantForm();
    }, []);


    const getApplicant = async () => {
        try {
            let snap = await NetworkManager.makeRequest(Endpoints.GetApplicant, { submissionId: id });
            snap = snap as DocumentSnapshot<DocumentData>
            if (snap.exists()) {
                const data = snap.data();
                setApplicant({
                    firstName: data.first_name,
                    lastName: data.last_name,
                    email: data.email,
                    phoneNumber: data.phone_number,
                    stage: data.stage,
                    submissionId: data.submission_id,
                    notes: data.note || '',
                    createdAt: data.createdAt
                });
                console.log(applicant);
                setEmail(data.email);

            } else {
                throw new Error("not-found")
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getApplicantForm = async () => {
        try {
            let data = await NetworkManager.makeRequest(Endpoints.GetApplicantForm, { id: id });
            setFormData(data as JotformResponse);
        } catch (error) {
            console.log(error);
        }
    }


    if (!applicant) {
        return (<div></div>);
    }
    return (
        <div className="mentor-profile">
            {/* Close button */}
            <img 
                className="exit-btn" 
                src={close} 
                onClick={() => navigate(-1)} 
            />
            <div className="mentor-profile-container">
                {/* Mentor Name */}
                <h1 className="mentor-name">
                    {applicant.firstName} {applicant.lastName}
                </h1>
                {/* Tabs */}
                <div className="mentor-profile-tabs">
                    {Object.values(Tabs).map(curr => {
                        return (
                            <h1 
                                key={curr} 
                                className={curr === tab ? "tab-title selected" : "tab-title"} 
                                onClick={e => setTab(e.currentTarget.innerHTML)}
                            >
                                {curr}
                            </h1>
                        );
                    })}
                </div>
                <Content 
                    type={tab} 
                    formData={formData} 
                />
            </div>
        </div>
    );
}

export default MentorProfile;