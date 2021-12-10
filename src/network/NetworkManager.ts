import { AuthError, User } from "@firebase/auth";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth, updateEmail, updatePassword} from "firebase/auth";
import {collection, getDocs} from "firebase/firestore"

import { Applicant, ApplicantStages } from "../utils/utils";
import app, { db } from "../config/firebase";

export enum Endpoints{
    AuthenticateUser, 
    GetAllApplicants,
    UpdateEmail,
    UpdatePassword,
    CreateNewUser
}

class NetworkManger {
    
    // singleton instance of network manager
    private static instance: NetworkManger;

    // returns singleton instance of network manager
    public static getInstance(): NetworkManger {
        if (!NetworkManger.instance) {
            NetworkManger.instance = new NetworkManger();
        }
        return NetworkManger.instance;
    }

    public async makeRequest (endpoint: Endpoints, params?: any) {
        switch (endpoint){
          case Endpoints.AuthenticateUser:
            return this.authenticateUser(params.email, params.password);
          case Endpoints.GetAllApplicants:
            return this.getAllApplicants();
          case Endpoints.UpdateEmail:
            return this.updateUserEmail(params.email);
          case Endpoints.UpdatePassword:
            return this.updateUserPassword(params.password);
          case Endpoints.CreateNewUser:
            return this.createNewUser(params.email, params.password);
        }

    }

    // signs in user using email and password
    // email: email address
    // password: password
    private authenticateUser(email: string, password: string): Promise<User> {
      return new Promise((resolve, reject) => {
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          resolve(userCredential.user)
        })
        .catch((error: AuthError) => {    
          reject(error);
        });
      })
    }

    // returns all applicants from db
    private getAllApplicants(): Promise<Applicant []> {
      return new Promise((resolve, reject) => {
        getDocs(collection(db, "applicants"))
        .then((docs) => {
          let applicants: Applicant[] = [];
          docs.forEach((doc) => {
            let data = doc.data();
            const applicant: Applicant = {
              firstName: data.first_name,
              lastName: data.last_name,
              email: data.email,
              phoneNumber: data.phone_number,
              submissionId: data.submission_id,
              stage: data.stage
            };
            applicants.push(applicant);
          });
          resolve(applicants);
        })
        .catch((error) => {
          reject(error);
        })
      });
    }

    // updates email of current user in auth
    // email: new email
    private updateUserEmail(email: string): Promise<void> {
      return new Promise((resolve, reject) => {
        const auth = getAuth(app);
        let user = auth.currentUser;

        if (user === null) {
          reject("user is null");
        }
        user = user as User;

        updateEmail(user, email).then(() => { 
          resolve();
        }).catch((error) => { 
          reject(error);
        })
      });
    }

    // updates password of current user in auth
    // password: new password
    private updateUserPassword(password: string): Promise<void> {
      return new Promise((resolve, reject) => {
        const auth = getAuth(app);
        let user = auth.currentUser;

        if (user === null) {
          reject("user is null");
        }
        user = user as User;

        updatePassword(user, password).then(() => { 
          resolve();
        }).catch((error) => { 
          reject(error);
        
        })
      }); 
    }

    // creates a new user in db
    // email: email of new user
    // password: password of new user
    private createNewUser(email: string, password: string): Promise<void> {
      return new Promise((resolve, reject) => {
        const auth = getAuth(app);

        createUserWithEmailAndPassword(auth, email, password)
        .then((user) => { 
          resolve();
        }).catch((error) => { 
          reject(error);
        })
      })
    }

}

export default NetworkManger.getInstance();
