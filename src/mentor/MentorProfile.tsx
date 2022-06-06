import { useState, useEffect } from "react";
import { QuerySnapshot, DocumentData, DocumentSnapshot } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";

import NetworkManager, { Endpoints } from "../network/NetworkManager";
import { Applicant, JotformResponse, MenteeForm } from "../utils/utils";
import close from "../profile/assets/close.png";

import MentorInfo from "./Tabs/MentorInfo/MentorInfo";
import Mentee from "./Tabs/Mentee/Mentee";
import LogsReports from "./Tabs/LogsReports/LogsReports";

import "./MentorProfile.css";
import Loading from "../widgets/Loading";

export enum Tabs { MentorInfo = "Your Profile" , MenteeProfile = "Mentee Profile", LogsAndReports = "Logs and Reports" };

type Props = {
  defaultTab: string
}

const MentorProfile: React.FC<Props> = ({defaultTab}) => {
  const navigate = useNavigate();
  const { mentorId } = useParams();
  const [applicant, setApplicant] = useState<Applicant | null>(null);
  const [formData, setFormData] = useState<JotformResponse | null>(null);
  const [menteeList, setMenteeList] = useState<MenteeForm[]>([]);

  const [tab, setTab] = useState<string>(defaultTab);

  useEffect(() => {
    getApplicant();
    getApplicantForm();
    getMentees();
  }, []);
  

  const getMentees: VoidFunction = async () => {
    try {
      let snap = await NetworkManager.makeRequest(Endpoints.GetApplicant, { submissionId: mentorId });
      console.log(snap);
      snap = snap as QuerySnapshot<DocumentData>;
      const menteeIds = snap.data()?.mentee_ids;
      const menteeData = [];
      for(let id of menteeIds ) {
        let data = await NetworkManager.makeRequest(Endpoints.GetMenteeForm, {id: id});
        data = data.content.answers;
        let mentee : MenteeForm;
        mentee = {
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
        menteeData.push(mentee);
      }
      setMenteeList(menteeData);
    } catch (error) {
      console.error(error);
    }
  }

  const getApplicant = async () => {
    try {
      console.log(mentorId);
      let snap = await NetworkManager.makeRequest(Endpoints.GetApplicant, { submissionId: mentorId });
      snap = snap as DocumentSnapshot<DocumentData>
      if (!snap.exists()) {
        throw new Error("not-found")
      }
      const data = snap.data();
      setApplicant({
        type: "Applicant",
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        phoneNumber: data.phone_number,
        stage: data.stage,
        submissionId: data.submission_id,
        notes: data.note || "",
        createdAt: data.createdAt
      });
      console.log(applicant);
    } catch (error) {
        console.log(error);
    }
  }

  const getApplicantForm = async () => {
    try {
      let data = await NetworkManager.makeRequest(Endpoints.GetApplicantForm, { id: mentorId });
      setFormData(data as JotformResponse);
    } catch (error) {
      console.log(error);
    }
  }

  /* RENDER FUNCTIONS */
  const renderTabs = (tab: string) => {
    const tabs = Object.values(Tabs).map(curr => 
      <h1 key={curr} 
        className={curr === tab ? "tab-title selected" : "tab-title"} 
        onClick={e => setTab(e.currentTarget.innerHTML)}
      >
        {curr}
      </h1>
    );
    return tabs;
  }

  const getTabContents = (tab: string, formData: JotformResponse | null, menteeList: MenteeForm[]) => {
    switch (tab) {
      case Tabs.MentorInfo:
        return (
          formData && <MentorInfo data={formData} />
        );
      case Tabs.MenteeProfile:
        return (
          <Mentee mentees={menteeList} />
        );
      case Tabs.LogsAndReports:
        return (
          <LogsReports />
        );
      default:
        return null;
    }
  }

  if (!applicant || !menteeList || !formData) {
    return <Loading/>;
  }
  return (
    <div className="mentor-profile">
      {/* Close button */}
      <img className="exit-btn" src={close} onClick={() => navigate(-1)} />

      <div className="mentor-profile-container">
        {/* Mentor Name */}
        <h1 className="mentor-name">
          {applicant.firstName} {applicant.lastName}
        </h1>
        {/* Tabs */}
        <div className="mentor-profile-tabs">
          {renderTabs(tab)}
        </div>
        {/* Tab Content */}
        <section className="tab-content-wrapper">
          {getTabContents(tab, formData, menteeList)}
        </section>
      </div>
    </div>
  );
}

export default MentorProfile;