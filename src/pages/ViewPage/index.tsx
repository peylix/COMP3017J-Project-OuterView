import { Space, Button, Message } from '@arco-design/web-react';
import styled from './index.module.css';
import { useLocation, useNavigate } from "react-router-dom";
import { Information } from './Info/info';
import { useEffect, useState } from 'react';
import { IMeeting, IUserInfo, Identity } from './interface';
import { getUserMeetings } from '../../service/api';



export const ViewPage = () => {
    const {state} = useLocation();
    const navigator = useNavigate();


    const [userInfo, setUserInfo] = useState<IUserInfo>({
        userId: '111',
        userName: 'Jack',
        identity: 0
    })

    const [meetings, setMeetings] = useState<IMeeting[]>([])



    const getMeetingsReq = async () => {
        const raw = await getUserMeetings({ userId: userInfo.userId })
        if (raw.status === 200) {
            const res = await raw.json()
            if (res.status === 1) {
                setMeetings(res.meetings)
            } else {
                Message.error(res.message)
            }
        } else {
            const res = await raw.json()
            Message.error(res.message)
        }
    }


    useEffect(() => {
        getMeetingsReq()
    }, [userInfo, state.refresh])

    return (
        <div className={styled.back}>
            <Space direction='horizontal' align='start' size={300}>
                <Space direction='vertical' align='start' className={styled.leftButton} size={100}>
                    <Space className={styled.user}>
                        <h1>用户名：</h1>
                        <h1>{userInfo.userName}</h1>
                        <h1>身份：</h1>
                        <h1>{Identity[userInfo.identity]}</h1>
                    </Space>
                    <Button shape='round' type='primary' className={styled.button} status='warning' onClick={() => { navigator('/reservationPage') }}>
                        预约会议
                    </Button>
                    <div className={styled.arrow} onClick={() => { navigator('/') }}></div>
                </Space>
                <div className={styled.scrollContainer}>
                    <h1>待参加的会议</h1>
                    <Information meetings={meetings} />
                </div>
            </Space>
        </div>
    )

}