export enum ApplicantStages {New = "NEW", Interviewing = "INTERVIEWING", BackgroundCheck = "BACKGROUND CHECK", Rejected = "REJECTED", Accepted = "ACCEPTED"};

export enum ApplicantFilters {AllApplicants = "All Applicants", NewApplicants = "New Applicants", Interviewing = "Interviewing", BackgroundCheck = "Background Check"}


export type Applicant = {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    stage: ApplicantStages,
    submissionId: string,
}

export type JotformResponse = {
    responseCode: number,
    message: string,
    content: any,
    duration: string,
    info?: string
    'limit-left'?: number
}