export enum ApplicantStages {New = "NEW", Interviewing = "INTERVIEWING", BackgroundCheck = "BACKGROUND CHECK", Accepted = "ACCEPTED", Rejected = "REJECTED"};
export enum PersonTypes {New = "NEW", Interviewing = "INTERVIEWING"}
// {Mentor = "MENTOR", Mentee = "MENTEE"};

type stagesToTextType = {[key in ApplicantStages]: string}
// temp for PersonTypeTile to display Mentor/Mentee

export const stagesToText: stagesToTextType = {
    [ApplicantStages.BackgroundCheck]: 'Background Check',
    [ApplicantStages.New]: 'New Applicants',
    [ApplicantStages.Interviewing]: 'Interviewing',
    [ApplicantStages.Accepted]: 'Accepted',
    [ApplicantStages.Rejected]: 'Rejected'
}

export type MenteeForm = {
    parentName: string,
    childName: string,
    streetAddress: string,
    city: string,
    state: string,
    zip: string,
    phoneNumber: string,
    age: string,
    gender: string,
    school: string,
    requestedBy: string,
    areas: string[],
    interests: string[],
    bestDescribes: string[],
    whyBenefit: string,
    subjects: string,
    otherComments: string,
    email: string,
    grade: string
}

export type Applicant = {
    type: "Applicant",
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    stage: ApplicantStages,
    submissionId: string,
    notes?: string,
    createdAt: string
}

export type Mentor = {
    type: "Mentor",
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    stage: ApplicantStages,
    submissionId: string,
    notes?: string,
    createdAt: string,
    menteeIds: string[]
    firebaseId: string
}

export type Trainee = {
    type: "Trainee",
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    stage: ApplicantStages,
    submissionId: string,
    notes?: string,
    createdAt: string,
    firebaseId: string
}

export type MentorForm = {
    firstName: string,
    lastName: string,
    gender: string,
    age: number,
    schoolLevel: string,
    describesYou: String[],
    interestsAndHobbies: String[]
}

export type JotformResponse = {
    responseCode: number,
    message: string,
    content: any,
    duration: string,
    info?: string
    'limit-left'?: number
}