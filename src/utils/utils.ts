export enum ApplicantStages {New = "NEW", Interviewing = "INTERVIEWING", BackgroundCheck = "BACKGROUND CHECK", Accepted = "ACCEPTED", Rejected = "REJECTED"};
export enum PersonTypes {New = "NEW", Interviewing = "INTERVIEWING"}
// {Mentor = "MENTOR", Mentee = "MENTEE"};

type stagesToTextType = {[key in ApplicantStages]: string}
// temp for PersonTypeTile to display Mentor/Mentee
type stagesToTextTypeMen = {[key in ApplicantStages]: string}

export const stagesToText: stagesToTextType = {
    [ApplicantStages.BackgroundCheck]: 'Background Check',
    [ApplicantStages.New]: 'New Applicants',
    [ApplicantStages.Interviewing]: 'Interviewing',
    [ApplicantStages.Accepted]: 'Accepted',
    [ApplicantStages.Rejected]: 'Rejected'
}

// export const typesToText: typesToTextType = {
//     [PersonTypes.Mentor]: 'Mentor',
//     [PersonTypes.Mentee]: 'Mentee',
// }

export const stagesToTextMen: stagesToTextTypeMen = {
    [ApplicantStages.New]: 'Mentor',
    [ApplicantStages.Interviewing]: 'Mentee',
    [ApplicantStages.BackgroundCheck]: 'Background Check',
    [ApplicantStages.Accepted]: 'Accepted',
    [ApplicantStages.Rejected]: 'Rejected'
}


export type Applicant = {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    stage: ApplicantStages,
    submissionId: string,
    notes?: string,
    createdAt: string
}

export type Mentee = {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    submissionId: string,
    notes?: string,
    createdAt: string,
}

export type Mentor = {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    submissionId: string,
    notes?: string,
    createdAt: string
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

export type Person = 
    Mentor | Mentee

export type JotformResponse = {
    responseCode: number,
    message: string,
    content: any,
    duration: string,
    info?: string
    'limit-left'?: number
}