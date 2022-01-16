export enum ApplicantStages {New = "NEW", Interviewing = "INTERVIEWING", BackgroundCheck = "BACKGROUND CHECK", Accepted = "ACCEPTED", Rejected = "REJECTED"};

type stagesToTextType = {[key in ApplicantStages]: string}

export const stagesToText: stagesToTextType = {
    [ApplicantStages.BackgroundCheck]: 'Background Check',
    [ApplicantStages.New]: 'New Applicants',
    [ApplicantStages.Interviewing]: 'Interviewing',
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

export type JotformResponse = {
    responseCode: number,
    message: string,
    content: any,
    duration: string,
    info?: string
    'limit-left'?: number
}