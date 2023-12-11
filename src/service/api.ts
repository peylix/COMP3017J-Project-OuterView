import { LabeledValue } from "@arco-design/web-react/es/Select/interface";

const getConfig = (method: string, params: Record<string, any>) => ({
    method: method,
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
})

export const postUserLogin = async (params: {
    userId: string;
    password: string;
    auth: '0' | '1';
}) => {
    // 接口前加个/api
    return await fetch('api/user/login', getConfig('POST', params))
}

export const postUserRegister = async (params: {
    userId: string;
    password: string;
    name: string;
    auth: '0' | '1'
}) => {
    return await fetch('api/user/register', getConfig('POST', params))
}

export const getUserMeetings = async (params: {
    userId: string
}) => {
    return await fetch(`api/userMeetings?userId=${params.userId}`,
        {
            method: "GET",
        })
}


export const postJoinMeetings = async (params: {
    meetingId: string;
    userId: string;
}) => {
    return await fetch(`api/joinMeetings`, getConfig('POST', params))
}


export const deleteMeeting = async (params: { meetingId: string }) => {
    return await fetch('api/deleteMeeting', getConfig('DELETE', params))
}


export const postCreateMeeting = async (params: {
    continue: number;
    invitees: string[];
    name: string;
    start: number;
    type: boolean;
}) => {
    return await fetch('api/createMeeting', getConfig('POST', params))
}


export const getInterviewees = async () => {
    return await fetch('api/interviewees', {
        method: "GET"
    })
}