import React, { MouseEventHandler, useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MenteeForm, Mentor, MentorForm } from '../utils/utils';

import assign_icon from "./assets/assign_mentee_icon.png";
import close from "../profile/assets/close.png";
import "./MentorMenteeMatch.css"
import NetworkManager, { Endpoints } from '../network/NetworkManager';
import Loading from '../widgets/Loading';

import { QuerySnapshot, DocumentData, enableMultiTabIndexedDbPersistence } from 'firebase/firestore';
import { Modal } from '../widgets/Modal';



const useClickOutside = (onClickOutside: () => void) => {
  //Super jank
  const first = useRef<any>(null);
  const second = useRef<any>(null);
  const third = useRef<any>(null);
  const fourth = useRef<any>(null);

  const clickedOutsideDomNodes = (e:any) => {
    let clickedFirst = first.current && first.current.contains(e.target);
    let clickedSecond = second.current && second.current.contains(e.target);
    let clickedThird = third.current && third.current.contains(e.target);
    let clickedFourth = fourth.current && fourth.current.contains(e.target);
    return !clickedFirst && !clickedSecond && !clickedThird && !clickedFourth;
  }
  //Because I gave up on trying to get the types to work.
  const handleClick = (e:any) => {
      e.preventDefault();
      if (clickedOutsideDomNodes(e)) {
         onClickOutside();
      } 
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);       
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return [first, second, third, fourth];
}

const MentorMenteeMatch = () => {
  const navigate = useNavigate();
  const { menteeId } = useParams();
  const [selectedMentor, setSelectedMentor] = useState(-1);
  const [assignMenteeToMentorModal, setAssignMenteeToMentorModal] = useState<Mentor | null>(null);
  const [mentee, setMentee] = useState<MenteeForm>();
  const [mentors, setMentors] = useState<Mentor[]>();
  const refs = useClickOutside(() => setSelectedMentor(-1));

  useEffect(() => {
    getMentee();
    getMentors();
  }, []);

  const getMentee = async () => {
    try {
      let data = await NetworkManager.makeRequest(Endpoints.GetMenteeForm, {id: menteeId});
      data = data.content.answers;
      let newMentee : MenteeForm;
      newMentee = {
        parentName: data['100']?.answer?.first + " " + data['100']?.answer?.last,
        childName: data['103']?.answer?.first + " " + data['103']?.answer?.last,
        streetAddress: data['3']?.answer,
        city: data['4']?.answer,
        state: data['5']?.answer,
        zip: data['6']?.answer,
        phoneNumber: data['7']?.answer,
        age: data['9']?.answer,
        gender: data['11']?.answer,
        school: data['101']?.answer,
        requestedBy: data['102']?.answer,
        whyBenefit: data['109']?.answer,
        subjects: data['110']?.answer,
        otherComments: data['111']?.answer,
        areas: data['105']?.answer,
        interests: data['106']?.answer,
        bestDescribes: data['107']?.answer,
        email: data['112']?.answer,
        grade: data['113']?.answer
      };

      setMentee(newMentee);
    } catch (error) {
      console.log(error);
    }
  }

  const getMentors = async () => {
    let data = await NetworkManager.makeRequest(Endpoints.GetAllMentors);
    setMentors(data);
  }

  const onAssignMenteeToMentor = () => {
    if (selectedMentor == -1) return;
    if (!mentors) return;
    setAssignMenteeToMentorModal(mentors[selectedMentor]);
  }


  const assignConfirmed: VoidFunction = async () => {
    if (!mentors || selectedMentor == -1 || !mentee || !mentors[selectedMentor]) {
      return;
    }

    let mentor = mentors[selectedMentor];
    let numChars = mentee?.bestDescribes?.length || 0;
    try {
      await NetworkManager.makeRequest(Endpoints.MatchMentee, {menteeId: menteeId, mentorId: mentor.submissionId});
      await NetworkManager.makeRequest(Endpoints.SendMenteeMatchEmail, {
        email: mentor.email, 
        menteeName: mentee.childName, 
        characteristic1: numChars > 0 ? mentee.bestDescribes[0] : undefined,
        characteristic2: numChars > 1 ? mentee.bestDescribes[1] : undefined, 
        characteristic3: numChars > 2 ? mentee.bestDescribes[2] : undefined, 
        menteeAge: mentee.age, 
        menteeGrade: mentee.grade,
        menteeSchool: mentee.school, 
        parentName: mentee.parentName,
        phoneNumber: mentee.phoneNumber, 
        menteeEmail: mentee.email,
        mentorName: mentor.firstName
      });
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  }
  
  //RENDER FUNCTIONS
  const renderAssignMentorToMenteeModal = () => {
    if (!assignMenteeToMentorModal) {
      return;
    }

    return (
      <Modal 
        ref={refs[3]}
        title="Assign Mentee to Mentor"
        content={`Are you sure you wish to assign ${mentee?.childName} to ${assignMenteeToMentorModal.firstName} ${assignMenteeToMentorModal.lastName}?`}
        onConfirm={() => {assignConfirmed()}}
        onCancel={() => setAssignMenteeToMentorModal(null)}
      />
    );
  }

  if (!mentee || !mentors) {
    return <Loading/>
  }

  return (
    <div className="mentor-mentee-match">
      {/* Close Button */}
      <img className='exit-btn' ref={refs[0]} src={close} onClick={() => navigate("/admin/assignments")} />
      {/* Header */}
      <div className="mentor-mentee-match-header">
        {/* Mentee Name */}
        <h1 className="mentee-name">
          {mentee?.childName}
        </h1>
        {/* Assign Button */}
        <button 
          className={`assign-btn ${selectedMentor === -1 ? "unclickable" : ""}`}
          ref={refs[1]}
          onClick={onAssignMenteeToMentor}
        >
          <img className="assign-icon" src={assign_icon} alt=""/>
          Assign
        </button>
      </div>
      
      {/* Assign Modal */}
      {renderAssignMentorToMenteeModal()}

      {/* Mentee Info Box */}
      <div className="mentee-info-box">
        <p className="mentee-info-text"> Gender: {mentee.gender}</p>
        <p className="mentee-info-text"> Age: {mentee.age}</p>
        <p className="mentee-info-text"> Grade: {mentee.grade} </p>
      </div>
      
      {/* Mentor Table */}
      <table className="mentor-table" ref={refs[2]}>
        {/* Mentor Table Header */}
        <thead>
          <tr>
            <th className="mentor-table-header">Mentor</th>
            <th className="mentor-table-header">Mentees</th>
            <th className="mentor-table-header">Able To Have More Than One Mentee</th>
            <th className="mentor-table-header">Age Preference</th>
            <th className="mentor-table-header">Best Describes You</th>
            <th className="mentor-table-header">Interests and Hobbies</th>
          </tr>
        </thead>
        
        {/* Mentor List */}
        <tbody>
        {mentors == undefined || mentors.length == 0 ? 
        <tr>There are no mentors to display</tr>
        : 
        mentors.map((mentor, idx) => 
            <tr 
              key={idx} className={`mentor-table-row-clickable ${selectedMentor === idx ? "selected" : ""}`} 
              onClick={() => setSelectedMentor(idx)}
            >
              <td className="mentor-table-cell mentor-table-cell-left">
                <div>
                  {mentor.firstName + " " + mentor.lastName}
                </div>
              </td>
              <td className="mentor-table-cell">
                <div>{mentor?.menteeIds?.length || 0}</div>
              </td>
              <td className="mentor-table-cell">
                <div>
                  {mentor.canHaveManyMentees}
                </div>
              </td>
              <td className="mentor-table-cell">
                <div>
                  {mentor.agePreference?.join(", ")}
                </div>
              </td>
              <td className="mentor-table-cell">
                <div className="describes-you">
                  {mentor.bestDescribes?.map((elem, i) => <div key={i} className="descriptor">{elem}</div>)}
                </div>
              </td>
              <td className="mentor-table-cell mentor-table-cell-right">
                <div className="describes-you">
                  {mentor.interestsAndHobbies?.map((elem, i) => <div key={i} className="descriptor">{elem}</div>)}
                </div>
              </td>
            </tr>
        )}
        </tbody>
      </table>
    </div>
  );
}

export default MentorMenteeMatch;
