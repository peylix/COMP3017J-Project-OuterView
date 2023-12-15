import { LabeledValue } from "@arco-design/web-react/es/Select/interface";

const getConfig = (method: string, params?: Record<string, any>) => ({
    method: method,
    headers: {
        "Content-Type": "application/json",
    },
    body: params ? JSON.stringify(params) : undefined,
})

export const postUserLogin = async (params: {
    userId: string;
    password: string;
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
    return await fetch(`api/reservation/get_reservations?userId=${params.userId}`,
        getConfig('GET'))
}


export const postJoinMeetings = async (params: {
    meetingId: string;
    userId: string;
}) => {
    return await fetch(`api/reservation/get_into_room`, getConfig('POST', params))
}


export const deleteMeeting = async (params: { meetingId: string }) => {
    return await fetch('api/reservation/delete_reservation', getConfig('DELETE', params))
}


export const postCreateMeeting = async (params: {
    end: number;
    invitees: string[];
    name: string;
    start: number;
    type: boolean;
}) => {
    return await fetch('api/reservation/create_reservation', getConfig('POST', params))
}


export const getInterviewees = async () => {
    return await fetch('api/interviewees', {
        method: "GET"
    })
}



export const postRunCode = async (params: {
    code: string
    language: string;
    problem_id: number
}) => {
    return await fetch('api/reservation/run_code', getConfig('POST', params))
}


export const getAllQuestion = async (params: any) => {
    return await fetch('api/reservation/get_problem_list', getConfig('GET', params))
}