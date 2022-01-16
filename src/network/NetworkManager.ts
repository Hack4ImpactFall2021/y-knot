import { AuthError, User } from "@firebase/auth";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth, updateEmail, updatePassword} from "firebase/auth";
import {doc, collection, getDoc, getDocs, DocumentData, FirestoreError, DocumentSnapshot, setDoc, updateDoc, deleteDoc, query, where, orderBy} from "firebase/firestore"

import { Applicant, ApplicantStages, JotformResponse } from "../utils/utils";
import app, { db, storage } from "../config/firebase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { resolve } from "dns";

export enum Endpoints{
    AuthenticateUser, 
    GetAllApplicants,
    GetAcceptedApplicants,
    GetRejectedApplicants,
    UpdateEmail,
    UpdatePassword,
    CreateNewUser,
    GetApplicant,
    GetApplicantForm,
    UpdateNote,
    UploadFile,
    GetFiles,
    UpdateStage,
    SendInterviewEmail,
    SendBackgroundCheckEmail,
    SendRejectionEmail,
    SendAcceptanceEmail
}

const apiKey = "f6ab2830e4825fdc6f2757697e4215be";


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
          case Endpoints.GetApplicant:
            return this.getApplicant(params.submissionId);
          case Endpoints.GetApplicantForm:
            return this.getApplicantForm(params.id);
          case Endpoints.UpdateNote:
            return this.updateNote(params.note, params.id, params.stage);
          case Endpoints.UploadFile:
            return this.uploadFile(params.file, params.id, params.filename);
          case Endpoints.GetFiles:
            return this.getFiles(params.id);
          case Endpoints.UpdateStage:
            return this.updateStage(params.id, params.stage);
          case Endpoints.SendInterviewEmail:
            return this.sendInterviewEmail(params.email);
          case Endpoints.SendBackgroundCheckEmail:
              return this.sendBackgroundCheckEmail(params.email);
          case Endpoints.SendRejectionEmail:
              return this.sendRejectionEmail(params.email, params.name);
          case Endpoints.SendAcceptanceEmail:
              return this.sendAcceptanceEmail(params.email, params.name, params.username, params.password);
          case Endpoints.GetAcceptedApplicants:
              return this.getAcceptedApplicants();
          case Endpoints.GetRejectedApplicants:
              return this.getRejectedApplicants();    
          default:
            return;
        }

    }

    // gets a user from db by submission id
    // submissionId: submission id
    private getApplicant(submissionId: string): Promise<DocumentSnapshot<DocumentData>>{
      return new Promise((resolve, reject) => {
        getDoc(doc(db, "applicants", submissionId))
        .then(snap => {
          resolve(snap);
        })
        .catch(error => {
          reject(error)
        })
      })
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
        getDocs(query(collection(db, "applicants"), where("stage", "in", ["NEW", "INTERVIEWING", "BACKGROUND CHECK"]), orderBy("createdAt", "desc")))
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
              stage: data.stage,
              notes: data.notes,
              createdAt: data.createdAt
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


    private getAcceptedApplicants(): Promise<Applicant []> {
      return new Promise((resolve, reject) => {
        getDocs(query(collection(db, "applicants"), where("stage", "==", "ACCEPTED"), orderBy("createdAt", "desc")))
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
              stage: data.stage,
              notes: data.notes,
              createdAt: data.createdAt
            };
            applicants.push(applicant);
          });
          resolve(applicants);
        })
        .catch((error) => {
          reject(error);
        })
      })
    }

    private getRejectedApplicants(): Promise<Applicant []> {
      return new Promise((resolve, reject) => {
        getDocs(query(collection(db, "applicants"), where("stage", "==", "REJECTED"), orderBy("createdAt", "desc")))
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
              stage: data.stage,
              notes: data.notes,
              createdAt: data.createdAt
            };
            applicants.push(applicant);
          });
          resolve(applicants);
        })
        .catch((error) => {
          reject(error);
        })
      })
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

    // id: id of jotform submission
    // returns the form submission associated with the id
    private getApplicantForm(id: string): Promise<JotformResponse> {
      return new Promise((resolve, reject) => {
        const url = `https://api.jotform.com/submission/${id}?apiKey=${apiKey}`;

        fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.responseCode != 200) {
            reject(new Error('invalid-id'))
          } else {
            resolve(data);
          }
        })
        .catch(error => reject(error));
      })
    }

    // note: note user has created
    // id: id of applicant
    // adds or updates the notes field of applicant in database
    private updateNote(note: string, id: string, stage: ApplicantStages): Promise<void> {
      return new Promise((resolve, reject) => {
       
          updateDoc(doc(db, 'applicants', id), {note: note})
          .then(() => resolve())
          .catch(error => reject(error));
        
      });
    }

    // file: background check file
    // id: id of applicant
    // uploads a file to cloud storage
    private uploadFile(file: File, id: string, filename: string): Promise<string> {
      return new Promise((resolve, reject) => {
        console.log(id);
          uploadBytes(ref(storage, `${id}/${filename}`), file)
          .then(() => {
            getDownloadURL(ref(storage, `${id}/${filename}`))
            .then(url => resolve(url))
            .catch(error => reject(error));
          })
          .catch(error => reject(error));
      })
    }

    // id: id of applicant
    // gets all files uploaded for applicant in cloud storage
    private getFiles(id: string): Promise<[string, string] [] > {
      return new Promise((resolve, reject) => {
        listAll(ref(storage, id))
        .then(res =>  {
          let lst: [string, string] [] = [];
          res.items.forEach((itemRef) => {
            getDownloadURL(itemRef)
            .then(url => lst.push([itemRef.name, url]))
            .catch(error => reject(error));
          });
          resolve(lst);
        })
        .catch(error => reject(error));
      }) 
    }

    private updateStage(id: string, stage: ApplicantStages): Promise<void> {
      return new Promise((resolve, reject) => {
        updateDoc(doc(db, 'applicants', id), {stage: stage})
        .then(() => resolve())
        .catch(error => reject(error));
      })
    }

    private sendInterviewEmail(email: string): Promise<void> {
      return new Promise((resolve, reject) => {
        fetch(`https://us-central1-yknot-ats.cloudfunctions.net/sendInterviewEmail?email=${email}`)
        .then(() => {
          resolve();
        })
        .catch(error => reject(error));
      })
    }

    private sendBackgroundCheckEmail(email: string): Promise<void> {
      return new Promise((resolve, reject) => {
        fetch(`https://us-central1-yknot-ats.cloudfunctions.net/sendBackgroundCheckEmail?email=${email}`)
        .then(() => {
          resolve();
        })
        .catch(error => reject(error));
      })
    }

    private sendRejectionEmail(email: string, name: string): Promise<void> {
      return new Promise((resolve, reject) => {
        fetch(`https://us-central1-yknot-ats.cloudfunctions.net/sendRejectionEmail?email=${email}&name=${name}`)
        .then(() => {
          resolve();
        })
        .catch(error => reject(error));
      });
    }

    private sendAcceptanceEmail(email: string, name: string, username: string, password: string): Promise<void> {
      return new Promise((resolve, reject) => {
        fetch(`https://us-central1-yknot-ats.cloudfunctions.net/sendAcceptanceEmail?email=${email}&name=${name}&username=${username}&password=${password}`)
        .then(() => {
          resolve();
        })
        .catch(error => reject(error));
      });
    }



}

export default NetworkManger.getInstance();
