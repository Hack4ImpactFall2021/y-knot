import React, { useState, useEffect } from 'react';
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';

import './Profile.css';
import Content from './Content/Content';
import NetworkManager, { Endpoints } from '../network/NetworkManager';
import { Applicant, ApplicantStages, JotformResponse } from '../utils/utils';
import ApplicantStageTile from '../applicants/ApplicantStageTile/ApplicantStageTile';
import accept from './assets/check-circle.png';
import reject from './assets/x-circle.png';
import close from './assets/close.png';

export enum Tabs { UserInformation = "User Information", Application = "Application", Interview = "Interview", BackgroundCheck = "Background Check" };

const Profile = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [applicant, setApplicant] = useState<Applicant | null>(null);
    const [data, setData] = useState<JotformResponse | null>(null);

    const [tab, setTab] = useState<string>(Tabs.UserInformation);

    useEffect(() => {
        setApplicant({
            firstName: "Test",
            lastName: "User",
            email: "c",
            phoneNumber: "123",
            stage: ApplicantStages.Interviewing,
            submissionId: "1"
        })
        setData({
            "responseCode": 200,
            "message": "success",
            "content": {
                "id": "5141380755815289484",
                "form_id": "213335607234147",
                "ip": "52.124.33.185",
                "created_at": "2021-11-30 22:21:15",
                "status": "ACTIVE",
                "new": "1",
                "flag": "0",
                "notes": "",
                "updated_at": null,
                "answers": {
                    "2": {
                        "name": "submit2",
                        "order": "30",
                        "text": "Submit",
                        "type": "control_button"
                    },
                    "3": {
                        "name": "nameOf3",
                        "order": "1",
                        "sublabels": "{\"prefix\":\"Prefix\",\"first\":\"First Name\",\"middle\":\"Middle Name\",\"last\":\"Last Name\",\"suffix\":\"Suffix\"}",
                        "text": "Name of Applicant",
                        "type": "control_fullname",
                        "answer": {
                            "first": "Dummy",
                            "last": "User"
                        },
                        "prettyFormat": "Dummy User"
                    },
                    "4": {
                        "name": "occupation",
                        "order": "2",
                        "text": "Occupation",
                        "type": "control_textbox",
                        "answer": "Occupation"
                    },
                    "5": {
                        "name": "highestEducational",
                        "order": "3",
                        "text": "Highest Educational Attainment",
                        "type": "control_textbox",
                        "answer": "College"
                    },
                    "6": {
                        "name": "phoneNumber",
                        "order": "5",
                        "sublabels": "{\"country\":\"Country Code\",\"area\":\"Area Code\",\"phone\":\"Phone Number\",\"full\":\"Phone Number\",\"masked\":\"Please enter a valid phone number.\"}",
                        "text": "Phone Number",
                        "type": "control_phone",
                        "answer": {
                            "full": "(123) 123-1234"
                        },
                        "prettyFormat": "(123) 123-1234"
                    },
                    "7": {
                        "name": "email",
                        "order": "6",
                        "text": "Email",
                        "type": "control_email",
                        "answer": "test@test.com"
                    },
                    "8": {
                        "name": "address",
                        "order": "7",
                        "sublabels": "{\"cc_firstName\":\"First Name\",\"cc_lastName\":\"Last Name\",\"cc_number\":\"Credit Card Number\",\"cc_ccv\":\"Security Code\",\"cc_exp_month\":\"Expiration Month\",\"cc_exp_year\":\"Expiration Year\",\"addr_line1\":\"Street Address\",\"addr_line2\":\"Street Address Line 2\",\"city\":\"City\",\"state\":\"State \\/ Province\",\"postal\":\"Postal \\/ Zip Code\",\"country\":\"Country\"}",
                        "text": "Address",
                        "type": "control_address",
                        "answer": {
                            "addr_line1": "123 Reading Rd"
                        },
                        "prettyFormat": "Street Address: 123 Reading Rd"
                    },
                    "9": {
                        "name": "name9",
                        "order": "11",
                        "text": "Age Preference",
                        "type": "control_checkbox",
                        "answer": [
                            "Elementary"
                        ],
                        "prettyFormat": "Elementary"
                    },
                    "12": {
                        "name": "daysAvailable",
                        "order": "9",
                        "text": "Days Available",
                        "type": "control_radio"
                    },
                    "13": {
                        "name": "basedFrom13",
                        "order": "13",
                        "text": "Based from your choices above, please describe the areas which you can be helpful of in providing mentoring",
                        "type": "control_textarea"
                    },
                    "14": {
                        "name": "isThere",
                        "order": "14",
                        "text": "Is there any characteristic in a mentee that you may be uncomfortable handling? Please specify.",
                        "type": "control_textarea"
                    },
                    "15": {
                        "name": "canYou15",
                        "order": "15",
                        "text": "Can you be a mentor for more than one person at the same time? ",
                        "type": "control_textarea"
                    },
                    "19": {
                        "name": "numberOf",
                        "order": "10",
                        "text": "Number of Hours Available Per Week",
                        "type": "control_radio"
                    },
                    "20": {
                        "name": "doYou",
                        "order": "12",
                        "text": "Do you have any health limitations?",
                        "type": "control_radio"
                    },
                    "21": {
                        "name": "willYou",
                        "order": "8",
                        "text": "Will you agree to have Y-KNOT Inc.  check your background through federal and state agencies for criminal records and child abuse and neglect proceedings?",
                        "type": "control_radio"
                    },
                    "22": {
                        "name": "bySigning22",
                        "order": "29",
                        "selectedField": "528c8b8186659c5616000004",
                        "text": "By signing below, you attest to the truthfulness of all information listed on this application. You agree to let our program confirm all information listed and to conduct a federal and state criminal records check.  I have read and understood the program’s rules, regulations, and responsibilities for becoming a mentor. If selected I will follow the rules of the program and be a dedicated mentor. I agree to the time commitment to my mentee of 10 hours a month for 12 months.",
                        "type": "control_signature",
                        "answer": "https://www.jotform.com/uploads/reginang00/213335607234147/5141380755815289484/5141380755815289484_signature_22.png"
                    },
                    "24": {
                        "name": "references24",
                        "order": "16",
                        "text": "References - Please list the names, addresses, and phone numbers of two personal character references.",
                        "type": "control_collapse"
                    },
                    "26": {
                        "name": "name",
                        "order": "17",
                        "sublabels": "{\"prefix\":\"Prefix\",\"first\":\"First Name\",\"middle\":\"Middle Name\",\"last\":\"Last Name\",\"suffix\":\"Suffix\"}",
                        "text": "Name",
                        "type": "control_fullname"
                    },
                    "27": {
                        "name": "address27",
                        "order": "18",
                        "sublabels": "{\"cc_firstName\":\"First Name\",\"cc_lastName\":\"Last Name\",\"cc_number\":\"Credit Card Number\",\"cc_ccv\":\"Security Code\",\"cc_exp_month\":\"Expiration Month\",\"cc_exp_year\":\"Expiration Year\",\"addr_line1\":\"Street Address\",\"addr_line2\":\"Street Address Line 2\",\"city\":\"City\",\"state\":\"State \\/ Province\",\"postal\":\"Postal \\/ Zip Code\",\"country\":\"Country\"}",
                        "text": "Address",
                        "type": "control_address"
                    },
                    "28": {
                        "name": "email28",
                        "order": "19",
                        "text": "Email",
                        "type": "control_email"
                    },
                    "29": {
                        "name": "phoneNumber29",
                        "order": "20",
                        "sublabels": "{\"country\":\"Country Code\",\"area\":\"Area Code\",\"phone\":\"Phone Number\",\"full\":\"Phone Number\",\"masked\":\"Please enter a valid phone number.\"}",
                        "text": "Phone Number",
                        "type": "control_phone"
                    },
                    "30": {
                        "name": "name30",
                        "order": "21",
                        "sublabels": "{\"prefix\":\"Prefix\",\"first\":\"First Name\",\"middle\":\"Middle Name\",\"last\":\"Last Name\",\"suffix\":\"Suffix\"}",
                        "text": "Name",
                        "type": "control_fullname"
                    },
                    "31": {
                        "name": "address31",
                        "order": "22",
                        "sublabels": "{\"cc_firstName\":\"First Name\",\"cc_lastName\":\"Last Name\",\"cc_number\":\"Credit Card Number\",\"cc_ccv\":\"Security Code\",\"cc_exp_month\":\"Expiration Month\",\"cc_exp_year\":\"Expiration Year\",\"addr_line1\":\"Street Address\",\"addr_line2\":\"Street Address Line 2\",\"city\":\"City\",\"state\":\"State \\/ Province\",\"postal\":\"Postal \\/ Zip Code\",\"country\":\"Country\"}",
                        "text": "Address",
                        "type": "control_address"
                    },
                    "32": {
                        "name": "email32",
                        "order": "23",
                        "text": "Email",
                        "type": "control_email"
                    },
                    "33": {
                        "name": "phoneNumber33",
                        "order": "24",
                        "sublabels": "{\"country\":\"Country Code\",\"area\":\"Area Code\",\"phone\":\"Phone Number\",\"full\":\"Phone Number\",\"masked\":\"Please enter a valid phone number.\"}",
                        "text": "Phone Number",
                        "type": "control_phone"
                    },
                    "34": {
                        "name": "name34",
                        "order": "25",
                        "sublabels": "{\"prefix\":\"Prefix\",\"first\":\"First Name\",\"middle\":\"Middle Name\",\"last\":\"Last Name\",\"suffix\":\"Suffix\"}",
                        "text": "Name",
                        "type": "control_fullname"
                    },
                    "35": {
                        "name": "address35",
                        "order": "26",
                        "sublabels": "{\"cc_firstName\":\"First Name\",\"cc_lastName\":\"Last Name\",\"cc_number\":\"Credit Card Number\",\"cc_ccv\":\"Security Code\",\"cc_exp_month\":\"Expiration Month\",\"cc_exp_year\":\"Expiration Year\",\"addr_line1\":\"Street Address\",\"addr_line2\":\"Street Address Line 2\",\"city\":\"City\",\"state\":\"State \\/ Province\",\"postal\":\"Postal \\/ Zip Code\",\"country\":\"Country\"}",
                        "text": "Address",
                        "type": "control_address"
                    },
                    "36": {
                        "name": "email36",
                        "order": "27",
                        "text": "Email",
                        "type": "control_email"
                    },
                    "37": {
                        "name": "phoneNumber37",
                        "order": "28",
                        "sublabels": "{\"country\":\"Country Code\",\"area\":\"Area Code\",\"phone\":\"Phone Number\",\"full\":\"Phone Number\",\"masked\":\"Please enter a valid phone number.\"}",
                        "text": "Phone Number",
                        "type": "control_phone"
                    },
                    "38": {
                        "name": "areYou",
                        "order": "4",
                        "text": "Are you an employee of any of the following, FBI, Secret Service, CIA or police department.",
                        "type": "control_radio",
                        "answer": "No"
                    }
                }
            },
            "duration": "38.89ms",
            "limit-left": 9993
        });
        // getApplicant();
        // getApplicantForm();
        // getDocuments();
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
                    submissionId: data.submission_id
                });
                console.log(applicant);
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
            setData(data as JotformResponse);
        } catch (error) {
            console.log(error);
        }
    }



    const handleClick = (tab: string) => {
        setTab(tab);
    }

    if (applicant) {
        return (
            <div className='profile'>
                <img className='exit-btn' src={close} onClick={() => navigate('/')} />
                <div className='profile-container'>
                    <div className='profile-header'>
                        <div className='profile-header-left'>
                            <h1 className='name'>{applicant.firstName} {applicant.lastName}</h1>
                            <ApplicantStageTile stage={applicant.stage} maximized />
                        </div>
                        <div className='profile-header-right'>
                            <button className='button accept'><>Accept <img src={accept} /></></button>
                            <button className='button reject'><>Reject <img src={reject} /></></button>
                        </div>
                    </div>
                    <div className='profile-tabs'>
                        {Object.values(Tabs).map(curr => {
                            return (
                                <h1 className={curr === tab ? 'tab-title selected' : 'tab-title'} onClick={e => handleClick(e.currentTarget.innerHTML)}>{curr}</h1>
                            );
                        })}
                    </div>
                    <Content type={tab} data={data} />
                </div>
            </div>
        );
    } else {
        return (
            <div>404 Not Found</div>
        );
    }
}

export default Profile;