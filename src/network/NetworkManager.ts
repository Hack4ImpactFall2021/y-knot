import { AuthError, User } from "@firebase/auth";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
  updateEmail,
  updatePassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  doc,
  collection,
  getDoc,
  getDocs,
  arrayUnion,
  DocumentData,
  FirestoreError,
  DocumentSnapshot,
  QuerySnapshot,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  arrayRemove,
} from "firebase/firestore";

import {
  Applicant,
  ApplicantStages,
  JotformResponse,
  Mentor,
  Trainee,
  AssignmentsTabPerson,
} from "../utils/utils";
import app, { db, storage } from "../config/firebase";
import secondaryApp from "../config/secondaryFirebase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import {
  connectFunctionsEmulator,
  getFunctions,
  httpsCallable,
} from "firebase/functions";
import UserInformation from "../profile/UserInformation/UserInformation";
import { resolve } from "dns";
import { rejects } from "assert";

const functions = getFunctions();
connectFunctionsEmulator(functions, "127.0.0.1", 5001);

export enum Endpoints {
  AuthenticateUser,
  GetAllApplicants,
  GetAcceptedApplicants,
  GetRejectedApplicants,
  GetAllTrainees,
  GetAllMentors,
  UpdateEmail,
  UpdatePassword,
  CreateNewUser,
  GetApplicant,
  GetApplicantForm,
  GetMentee,
  GetAllMentees,
  SetRole,
  GetMenteeForm,
  SetTrainingComplete,
  GetUnassignedMentees,
  GetFinishedTrainees,
  GetCurrentMentorOrTrainee,
  UpdateNote,
  UploadFile,
  GetFiles,
  GetLoginId,
  MatchMentee,
  UnmatchMentee,
  UpdateStage,
  UpdateFirebaseId,
  SendInterviewEmail,
  SendTrainingCompletedEmail,
  SendTrainingCompletedInternalEmail,
  SendBackgroundCheckEmail,
  SendRejectionEmail,
  SendAcceptanceEmail,
  SendMenteeMatchEmail,
  GetCalendlyLink,
  GetScheduledInterview,
  SendPasswordResetEmail,
  SendNewAccountCreatedEmail,
}

class NetworkManager {
  // singleton instance of network manager
  private static instance: NetworkManager;

  // returns singleton instance of network manager
  public static getInstance(): NetworkManager {
    if (!NetworkManager.instance) {
      NetworkManager.instance = new NetworkManager();
    }
    return NetworkManager.instance;
  }

  public async makeRequest(endpoint: Endpoints, params?: any) {
    switch (endpoint) {
      case Endpoints.AuthenticateUser:
        return this.authenticateUser(params.email, params.password);
      case Endpoints.GetAllApplicants:
        return this.getAllApplicants();
      case Endpoints.MatchMentee:
        return this.matchMentee(params.menteeId, params.mentorId);
      case Endpoints.UnmatchMentee:
        return this.unmatchMentee(
          params.menteeId,
          params.mentorId,
          params.mentorNotes
        );
      case Endpoints.UpdateEmail:
        return this.updateUserEmail(params.email);
      case Endpoints.GetFinishedTrainees:
        return this.getFinishedTrainees();
      case Endpoints.GetUnassignedMentees:
        return this.getUnassignedMentees();
      case Endpoints.UpdatePassword:
        return this.updateUserPassword(params.password);
      case Endpoints.GetCurrentMentorOrTrainee:
        return this.getCurrentMentorOrTrainee();
      case Endpoints.SetTrainingComplete:
        return this.setTrainingComplete(params.id);
      case Endpoints.CreateNewUser:
        return this.createNewUser(params.email, params.password, params.role);
      case Endpoints.GetApplicant:
        return this.getApplicant(params.submissionId);
      case Endpoints.GetApplicantForm:
        return this.getApplicantForm(params.id);
      case Endpoints.GetMentee:
        return this.getMentee(params.submissionId);
      case Endpoints.GetMenteeForm:
        return this.getMenteeForm(params.id);
      case Endpoints.GetAllMentees:
        return this.getAllMentees();
      case Endpoints.SetRole:
        return this.setRole(params.id, params.firebaseId, params.role);
      case Endpoints.UpdateNote:
        return this.updateNote(params.note, params.id, params.stage);
      case Endpoints.UploadFile:
        return this.uploadFile(params.file, params.id, params.filename);
      case Endpoints.GetFiles:
        return this.getFiles(params.id);
      case Endpoints.UpdateStage:
        return this.updateStage(params.id, params.stage);
      case Endpoints.UpdateFirebaseId:
        return this.updateFirebaseId(params.id, params.firebaseId);
      case Endpoints.GetLoginId:
        return this.getLoginId();
      case Endpoints.SendInterviewEmail:
        return this.sendInterviewEmail(params.email, params.url);
      case Endpoints.SendTrainingCompletedEmail:
        return this.sendTrainingCompletedEmail(params.email, params.name);
      case Endpoints.SendTrainingCompletedInternalEmail:
        return this.sendTrainingCompletedInternalEmail(params.name);
      case Endpoints.SendBackgroundCheckEmail:
        return this.sendBackgroundCheckEmail(params.email);
      case Endpoints.SendRejectionEmail:
        return this.sendRejectionEmail(params.email, params.name);
      case Endpoints.SendAcceptanceEmail:
        return this.sendAcceptanceEmail(
          params.email,
          params.name,
          params.username,
          params.password
        );
      case Endpoints.SendMenteeMatchEmail:
        return this.sendMenteeMatchEmail(
          params.email,
          params.menteeName,
          params.characteristic1,
          params.characteristic2,
          params.characteristic3,
          params.menteeAge,
          params.menteeGrade,
          params.menteeSchool,
          params.parentName,
          params.phoneNumber,
          params.menteeEmail,
          params.mentorName
        );
      case Endpoints.GetAcceptedApplicants:
        return this.getAcceptedApplicants();
      case Endpoints.GetAllTrainees:
        return this.getAllTrainees();
      case Endpoints.GetAllMentors:
        return this.getAllMentors();
      case Endpoints.GetRejectedApplicants:
        return this.getRejectedApplicants();
      case Endpoints.GetCalendlyLink:
        return this.getCalendlyLink();
      case Endpoints.GetScheduledInterview:
        return this.getScheduledInterview(params.email);
      case Endpoints.SendPasswordResetEmail:
        return this.sendResetPasswordEmail(params.email);
      case Endpoints.SendNewAccountCreatedEmail:
        return this.sendNewAccountCreatedEmail(params.email, params.password);
      default:
        return;
    }
  }
  // gets a user from db by submission id
  // submissionId: submission id
  private getApplicant(
    submissionId: string
  ): Promise<DocumentSnapshot<DocumentData>> {
    return new Promise((resolve, reject) => {
      getDoc(doc(db, "applicants", submissionId))
        .then((snap) => {
          resolve(snap);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  private getFinishedTrainees(): Promise<AssignmentsTabPerson[]> {
    return new Promise((resolve, reject) => {
      getDocs(
        query(collection(db, "applicants"), where("stage", "==", "TRAINEE"))
      )
        .then((docs) => {
          let people: AssignmentsTabPerson[] = [];
          docs.forEach((doc) => {
            let data = doc.data();
            let person: AssignmentsTabPerson = {
              firstName: data.first_name,
              lastName: data.last_name,
              submissionId: data.submission_id,
              type: "Trainee",
              firebaseId: data.firebase_id,
              email: data.email,
            };

            people.push(person);
          });

          resolve(people);
        })
        .catch((error) => reject(error));
    });
  }

  private getUnassignedMentees(): Promise<AssignmentsTabPerson[]> {
    return new Promise((resolve, reject) => {
      getDocs(query(collection(db, "mentees"), where("matched", "==", false)))
        .then((docs) => {
          let people: AssignmentsTabPerson[] = [];
          docs.forEach((doc) => {
            let data = doc.data();
            let person: AssignmentsTabPerson = {
              firstName: data.first_name,
              lastName: data.last_name,
              submissionId: data.submission_id,
              type: "Mentee",
              firebaseId: "",
              email: "",
            };
            people.push(person);
          });

          resolve(people);
        })
        .catch((error) => reject(error));
    });
  }

  // signs in user using email and password
  // email: email address
  // password: password
  private authenticateUser(email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      const auth = getAuth(app);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          resolve(userCredential.user);
        })
        .catch((error: AuthError) => {
          reject(error);
        });
    });
  }

  private getLoginId(): Promise<string> {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      if (!auth) reject("error");
      else {
        if (auth.currentUser) {
          const uid: string = auth.currentUser.uid;
          resolve(uid);
        } else reject("error");
      }
    });
  }

  private setTrainingComplete(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      updateDoc(doc(db, "applicants", id), { training_complete: true })
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  }

  // returns all applicants from db
  private getAllApplicants(): Promise<Applicant[]> {
    return new Promise((resolve, reject) => {
      getDocs(
        query(
          collection(db, "applicants"),
          where("stage", "in", ["NEW", "INTERVIEWING", "BACKGROUND CHECK"]),
          orderBy("createdAt", "desc")
        )
      )
        .then((docs) => {
          let applicants: Applicant[] = [];
          docs.forEach((doc) => {
            let data = doc.data();
            const applicant: Applicant = {
              type: "Applicant",
              firstName: data.first_name,
              lastName: data.last_name,
              email: data.email,
              phoneNumber: data.phone_number,
              submissionId: data.submission_id,
              stage: data.stage,
              notes: data.notes,
              createdAt: data.createdAt,
            };
            applicants.push(applicant);
          });
          resolve(applicants);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  private getAcceptedApplicants(): Promise<Applicant[]> {
    return new Promise((resolve, reject) => {
      getDocs(
        query(
          collection(db, "applicants"),
          where("stage", "==", "ACCEPTED"),
          orderBy("createdAt", "desc")
        )
      )
        .then((docs) => {
          let applicants: Applicant[] = [];
          docs.forEach((doc) => {
            let data = doc.data();
            const applicant: Applicant = {
              type: "Applicant",
              firstName: data.first_name,
              lastName: data.last_name,
              email: data.email,
              phoneNumber: data.phone_number,
              submissionId: data.submission_id,
              stage: data.stage,
              notes: data.notes,
              createdAt: data.createdAt,
            };
            applicants.push(applicant);
          });
          resolve(applicants);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  private getAllMentors(): Promise<Mentor[]> {
    return new Promise((resolve, reject) => {
      getDocs(
        query(
          collection(db, "applicants"),
          where("stage", "==", "MENTOR"),
          orderBy("createdAt", "desc")
        )
      )
        .then((docs) => {
          let mentors: Mentor[] = [];
          docs.forEach((doc) => {
            let data = doc.data();
            const mentor: Mentor = {
              type: "Mentor",
              firstName: data.first_name,
              lastName: data.last_name,
              email: data.email,
              phoneNumber: data.phone_number,
              submissionId: data.submission_id,
              stage: data.stage,
              notes: data.notes,
              createdAt: data.createdAt,
              firebaseId: data.firebase_id,
              menteeIds: data.mentee_ids,
              canHaveManyMentees: data.can_have_multiple_mentees,
              bestDescribes: data.best_describes,
              interestsAndHobbies: data.interests_hobbies,
              agePreference: data.age_preference,
            };
            mentors.push(mentor);
          });
          resolve(mentors);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  private getAllTrainees(): Promise<Trainee[]> {
    return new Promise((resolve, reject) => {
      getDocs(
        query(
          collection(db, "applicants"),
          where("stage", "==", "TRAINEE"),
          orderBy("createdAt", "desc")
        )
      )
        .then((docs) => {
          let trainees: Trainee[] = [];
          docs.forEach((doc) => {
            let data = doc.data();
            const trainee: Trainee = {
              type: "Trainee",
              firstName: data.first_name,
              lastName: data.last_name,
              email: data.email,
              phoneNumber: data.phone_number,
              submissionId: data.submission_id,
              stage: data.stage,
              notes: data.notes,
              createdAt: data.createdAt,
              firebaseId: data.firebase_id,
            };
            trainees.push(trainee);
          });
          resolve(trainees);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  private getRejectedApplicants(): Promise<Applicant[]> {
    return new Promise((resolve, reject) => {
      getDocs(
        query(
          collection(db, "applicants"),
          where("stage", "==", "REJECTED"),
          orderBy("createdAt", "desc")
        )
      )
        .then((docs) => {
          let applicants: Applicant[] = [];
          docs.forEach((doc) => {
            let data = doc.data();
            const applicant: Applicant = {
              type: "Applicant",
              firstName: data.first_name,
              lastName: data.last_name,
              email: data.email,
              phoneNumber: data.phone_number,
              submissionId: data.submission_id,
              stage: data.stage,
              notes: data.notes,
              createdAt: data.createdAt,
            };
            applicants.push(applicant);
          });
          resolve(applicants);
        })
        .catch((error) => {
          reject(error);
        });
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

      updateEmail(user, email)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
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

      updatePassword(user, password)
        .then(() => {
          fetch(
            `https://us-central1-yknot-ats.cloudfunctions.net/sendPasswordUpdatedEmail?email=${auth.currentUser?.email}`
          )
            .then(() => {
              resolve();
            })
            .catch((error) => {
              console.log(error);
              resolve();
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  private setRole(id: string, firebaseId: string, role: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const setRole = httpsCallable(functions, "setUserRole");
      getAuth()
        .currentUser?.getIdToken()
        .then((idToken) => {
          setRole({ uid: firebaseId, role: role, idToken: idToken })
            .then((response: any) => {
              updateDoc(doc(db, "applicants", id), {
                stage: role.toUpperCase(),
              })
                .then(() => resolve())
                .catch((error) => reject(error));
            })
            .catch((error) => {
              reject();
            });
        });
    });
  }

  // creates a new user in db
  // email: email of new user
  // password: password of new user
  private createNewUser(
    email: string,
    password: string,
    role: string
  ): Promise<string> {
    const auth = getAuth(app);
    const auth2 = getAuth(secondaryApp);

    return new Promise((resolve, reject) => {
      auth.currentUser?.getIdToken().then((idToken) => {
        createUserWithEmailAndPassword(auth2, email, password)
          .then((userCredential) => {
            console.log("account made");
            const setRole = httpsCallable(functions, "setUserRole");
            const user = userCredential.user;
            console.log(user);
            setRole({ uid: user.uid, role: role, idToken: idToken }).then(
              (response: any) => {
                resolve(user.uid);
              }
            );
          })
          .catch((error) => {
            reject(error);
          })
          .catch((error) => {
            reject(error);
          });
      });
    });
  }

  private matchMentee(menteeId: string, mentorId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const user = getAuth(app).currentUser;
      if (!user) {
        reject();
      }
      updateDoc(doc(db, "applicants", mentorId), {
        mentee_ids: arrayUnion(menteeId),
      })
        .then(() => {
          updateDoc(doc(db, "mentees", menteeId), { matched: true }).then(
            () => {
              resolve();
            }
          );
        })
        .catch((error) => reject(error));
    });
  }
  private unmatchMentee(
    menteeId: string,
    mentorId: string,
    mentorNotes: string
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const user = getAuth(app).currentUser;
      if (!user) {
        reject();
      }
      updateDoc(doc(db, "applicants", mentorId), {
        mentee_ids: arrayRemove(menteeId),
      })
        .then(() => {
          getDoc(doc(db, "applicants", mentorId)).then((snap) => {
            const mentorName =
              snap.data()?.first_name + " " + snap.data()?.last_name;
            updateDoc(doc(db, "mentees", menteeId), {
              matched: false,
              priorMentors: arrayUnion({
                name: mentorName,
                notes: mentorNotes,
              }),
            }).then(() => {
              resolve();
            });
          });
        })
        .catch((error) => reject(error));
    });
  }
  // id: id of jotform submission
  // returns the form submission associated with the id
  private getApplicantForm(id: string): Promise<JotformResponse> {
    return new Promise((resolve, reject) => {
      const getForm: any = httpsCallable(functions, "getApplicantForm");

      getAuth()
        .currentUser?.getIdToken()
        .then((idToken) => {
          getForm({ id: id, idToken: idToken })
            .then((response: any) => response.data)
            .then((data: any) => {
              console.log(data);
              if (data.responseCode != 200) {
                reject(new Error("invalid-id"));
              } else {
                resolve(data);
              }
            })
            .catch((error: any) => {
              reject(error);
            });
        });
    });
  }
  // gets a user from db by submission id
  // submissionId: submission id
  private getMentee(
    submissionId: string
  ): Promise<DocumentSnapshot<DocumentData>> {
    return new Promise((resolve, reject) => {
      getDoc(doc(db, "mentees", submissionId))
        .then((snap) => {
          resolve(snap);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  private getMenteeForm(id: string): Promise<JotformResponse> {
    return new Promise((resolve, reject) => {
      const getForm: any = httpsCallable(functions, "getMenteeForm");
      getAuth()
        .currentUser?.getIdToken()
        .then((idToken) => {
          getForm({ id: id, idToken: idToken })
            .then((response: any) => response.data)
            .then((data: any) => {
              if (data.responseCode != 200) {
                reject(new Error("invalid-id"));
              } else {
                resolve(data);
              }
            })
            .catch((error: any) => {
              reject(error);
            });
        });
    });
  }

  private getAllMentees(): Promise<any> {
    return new Promise((resolve, reject) => {
      const getForms: any = httpsCallable(functions, "getMenteeForms");

      getAuth()
        .currentUser?.getIdToken()
        .then((idToken) => {
          getForms({ idToken: idToken })
            .then((response: any) => response.data)
            .then((data: any) => {
              if (data.responseCode != 200) {
                reject(new Error("invalid-id"));
              } else {
                resolve(data);
              }
            })
            .catch((error: any) => {
              reject(error);
            });
        });
    });
  }

  private getCurrentMentorOrTrainee(): Promise<QuerySnapshot<DocumentData>> {
    return new Promise((resolve, reject) => {
      getDocs(
        query(
          collection(db, "applicants"),
          where("firebase_id", "==", getAuth().currentUser?.uid)
        )
      )
        .then((snap) => {
          console.log(snap);
          resolve(snap);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  // note: note user has created
  // id: id of applicant
  // adds or updates the notes field of applicant in database
  private updateNote(
    note: string,
    id: string,
    stage: ApplicantStages
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      updateDoc(doc(db, "applicants", id), { note: note })
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  }

  // file: background check file
  // id: id of applicant
  // uploads a file to cloud storage
  private uploadFile(
    file: File,
    id: string,
    filename: string
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      console.log(id);
      uploadBytes(ref(storage, `${id}/${filename}`), file)
        .then(() => {
          getDownloadURL(ref(storage, `${id}/${filename}`))
            .then((url) => resolve(url))
            .catch((error) => reject(error));
        })
        .catch((error) => reject(error));
    });
  }

  // id: id of applicant
  // gets all files uploaded for applicant in cloud storage
  private getFiles(id: string): Promise<[string, string][]> {
    return new Promise((resolve, reject) => {
      listAll(ref(storage, id))
        .then((res) => {
          let lst: [string, string][] = [];
          res.items.forEach((itemRef) => {
            getDownloadURL(itemRef)
              .then((url) => lst.push([itemRef.name, url]))
              .catch((error) => reject(error));
          });
          resolve(lst);
        })
        .catch((error) => reject(error));
    });
  }

  private updateStage(id: string, stage: ApplicantStages): Promise<void> {
    return new Promise((resolve, reject) => {
      updateDoc(doc(db, "applicants", id), { stage: stage })
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  }

  private updateFirebaseId(id: string, firebaseId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      updateDoc(doc(db, "applicants", id), { firebase_id: firebaseId })
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  }

  private sendInterviewEmail(email: string, url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fetch(
        `https://us-central1-yknot-ats.cloudfunctions.net/sendInterviewEmail?email=${email}&url=${encodeURIComponent(
          url
        )}`
      )
        .then(() => {
          resolve();
        })
        .catch((error) => reject(error));
    });
  }

  private sendTrainingCompletedEmail(
    email: string,
    name: string
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      fetch(
        `https://us-central1-yknot-ats.cloudfunctions.net/sendTrainingCompletedEmail?email=${email}&name=${name}`
      )
        .then(() => {
          resolve();
        })
        .catch((error) => reject(error));
    });
  }

  private sendTrainingCompletedInternalEmail(name: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fetch(
        `https://us-central1-yknot-ats.cloudfunctions.net/sendTrainingCompletedInternalEmail?name=${name}`
      )
        .then(() => {
          resolve();
        })
        .catch((error) => reject(error));
    });
  }

  private sendBackgroundCheckEmail(email: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fetch(
        `https://us-central1-yknot-ats.cloudfunctions.net/sendBackgroundCheckEmail?email=${email}`
      )
        .then(() => {
          resolve();
        })
        .catch((error) => reject(error));
    });
  }

  private sendRejectionEmail(email: string, name: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fetch(
        `https://us-central1-yknot-ats.cloudfunctions.net/sendRejectionEmail?email=${email}&name=${name}`
      )
        .then(() => {
          resolve();
        })
        .catch((error) => reject(error));
    });
  }

  private sendAcceptanceEmail(
    email: string,
    name: string,
    username: string,
    password: string
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      fetch(
        `https://us-central1-yknot-ats.cloudfunctions.net/sendAcceptanceEmail?email=${email}&name=${name}&username=${username}&password=${password}`
      )
        .then(() => {
          resolve();
        })
        .catch((error) => reject(error));
    });
  }

  private sendMenteeMatchEmail(
    email: string,
    menteeName: string,
    characteristic1: string,
    characteristic2: string,
    characteristic3: string,
    menteeAge: string,
    menteeGrade: string,
    menteeSchool: string,
    parentName: string,
    phoneNumber: string,
    menteeEmail: string,
    mentorName: string
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      fetch(`https://us-central1-yknot-ats.cloudfunctions.net/sendMenteeMatchEmail?email=${email}
          &menteeName=${menteeName}&characteristic1=${characteristic1}&characteristic2=${characteristic2}
          &characteristic3=${characteristic3}&menteeAge=${menteeAge}&menteeGrade=${menteeGrade}
          &menteeSchool=${menteeSchool}&parentName=${parentName}&phoneNumber=${phoneNumber}
          &menteeEmail=${menteeEmail}&mentorName=${mentorName}`)
        .then(() => {
          resolve();
        })
        .catch((error) => reject(error));
    });
  }

  private getCalendlyLink(): Promise<string> {
    return new Promise((resolve, reject) => {
      const calendlyLinkFunc = httpsCallable(functions, "getCalendlyLink");
      calendlyLinkFunc()
        .then((response: any) => response.data)
        .then((data) => {
          if (data && data["resource"] && data["resource"]["booking_url"]) {
            console.log(data["resource"]["booking_url"]);
            resolve(data["resource"]["booking_url"]);
          }
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  private getScheduledInterview(email: string): Promise<Date> {
    return new Promise((resolve, reject) => {
      console.log("checking if interview has been scheduled");
      const interviewFunc = httpsCallable(functions, "getScheduledInterview");
      interviewFunc({ email: email })
        .then((response: any) => response.data)
        .then((data) => {
          if (data["collection"] && data["collection"].length > 0) {
            resolve(new Date(data["collection"][0]["start_time"]));
          } else {
            reject();
          }
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }

  private sendResetPasswordEmail(email: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      sendPasswordResetEmail(auth, email)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  private sendNewAccountCreatedEmail(
    email: string,
    password: string
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      fetch(
        `https://us-central1-yknot-ats.cloudfunctions.net/sendNewAccountCreatedEmail?email=${email}&password=${password}`
      )
        .then(() => {
          resolve();
        })
        .catch((error) => reject(error));
    });
  }
}

export default NetworkManager.getInstance();
