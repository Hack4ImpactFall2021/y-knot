import React, { createContext, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import NetworkManager, { Endpoints } from '../network/NetworkManager';
import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import Loading from '../widgets/Loading';

interface TraineeContextType {
  submissionId: any
  firstName: string,
  lastName: string
}
const TraineeContext = createContext<TraineeContextType>(null!);

export const useTraineeContext = () => {
  return useContext(TraineeContext);
}

interface Props {
  children: JSX.Element
}

//Ensure that the user currently logged in is a trainee and provide trainee context
const RequireTraineeAuth:React.FC<Props> = ({ children }) => {
  const [trainee, setTrainee] = useState<any>(null);
  const [pending, setPending] = useState<Boolean>(true);

  const getTrainee: VoidFunction = async () => {
    try {
      let snap = await NetworkManager.makeRequest(Endpoints.GetCurrentMentorOrTrainee);
      snap = snap as QuerySnapshot<DocumentData>;
      console.log(snap);
      setTrainee(snap.docs[0].data());
      setPending(false);
    } catch(err) {
      console.log(err);
    }
  }
  useEffect(getTrainee, []);

  const auth = useAuth();
  if (!auth.user || (auth.token.claims.role != "trainee" && auth.token.claims.role != "admin")) {
    return <Navigate to="/login" />;
  }

  if (pending) {
    return <Loading/>
  }

  return (
    <TraineeContext.Provider 
      value={{ submissionId: trainee.submission_id, firstName: trainee.first_name, lastName: trainee.last_name }}
    >
      {children}
    </TraineeContext.Provider>
  );
}
  
export default RequireTraineeAuth;