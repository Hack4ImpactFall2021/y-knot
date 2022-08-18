import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import NetworkManager, { Endpoints } from '../network/NetworkManager';
import { useAuth } from './AuthProvider';
import Loading from '../widgets/Loading';

interface MentorContextType {
  submissionId: any
  firstName: string,
  lastName: string
}
const MentorContext = createContext<MentorContextType>(null!);

export const useMentorContext = () => {
  return useContext(MentorContext);
}

interface Props {
  children: JSX.Element
}


//Ensure that the user currently logged in is a mentor and provide mentor context
const RequireMentorAuth:React.FC<Props> = ({ children }) => {
  const [mentor, setMentor] = useState<any>(null);
  const [pending, setPending] = useState<Boolean>(true);

  const getMentor: VoidFunction = async () => {
    try {
      let snap = await NetworkManager.makeRequest(Endpoints.GetCurrentMentorOrTrainee);
      snap = snap as QuerySnapshot<DocumentData>;
      setMentor(snap.docs[0].data());
      setPending(false);
    } catch(err) {
      console.log(err);
    }
  }
  useEffect(getMentor, []);

  const auth = useAuth();
  if (!auth.user || (auth.token.claims.role != "mentor" && auth.token.claims.role != "admin")) {
      return <Navigate to="/login" />
  }

  if (pending) {
    return <Loading/>
  }

  return (
    <MentorContext.Provider 
      value={{ submissionId: mentor.submission_id, firstName: mentor.first_name, lastName: mentor.last_name }}
    >
      {children}
    </MentorContext.Provider>
  );
  }
  
export default RequireMentorAuth;