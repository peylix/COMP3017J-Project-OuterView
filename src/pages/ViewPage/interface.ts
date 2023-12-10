export enum Identity {
    interviewer = 0,
    interviewee = 1,
}


export interface IUserInfo {
    userId: string
    userName: string
    identity: Identity
}

export interface IMeeting {
    continue: number;
    id: string;
    name: string;
    start: number;
    status: boolean;
    interview: string[];
}