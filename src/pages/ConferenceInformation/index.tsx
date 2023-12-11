import { Button, Message, Space } from '@arco-design/web-react';
import styled from './index.module.css';
import { useNavigate, useLocation } from "react-router-dom";
import { IconArrowRight } from '@arco-design/web-react/icon'
import dayjs from 'dayjs';
import { deleteMeeting, postJoinMeetings } from '../../service/api';

export const ConferenceInformation = () => {
    const {state} = useLocation();
    const navigator = useNavigate();

    const handleCancelMeeting = async () => {
        try {
            const response = await deleteMeeting({ meetingId: state.meetingId });
            if (response.status === 200) {
                const data = await response.json();
                if (data.status === 1) {
                    Message.success('会议已取消');
                    navigator('/viewPage')
                } else {
                    Message.error(data.message);
                }
            } else {
                const errorData = await response.json();
                Message.error(errorData.message);
            }
        } catch (error) {
            console.error('取消会议失败:', error);
            Message.error('取消会议失败');
        }
    }

    const handleEnterMeeting = async () => {
        try {
            const response = await postJoinMeetings({ userId: state.userID, meetingId: state.meetingId });
            if (response.status === 200) {
                const data = await response.json();
                if (data.status === 0) {
                    Message.success('会议已进入');
                    navigator('/interview/room', { state: {} })//
                } else {
                    Message.error(data.message);
                }
            } else {
                const errorData = await response.json();
                Message.error(errorData.message);
            }
        } catch (error) {
            console.error('进入会议失败:', error);
            Message.error('进入会议失败');
        }
    }

    const handleEditMeeting = () => {
        navigator('/reservationPage', { state: { interview: false, name: state.name, start: state.start, continue: state.continue } })
    }

    return (
        <div className={styled.back}>
            <div className={styled.arrow} onClick={() => { navigator('/viewPage') }}></div>
            <h1 className={styled.title}>会议详情</h1>
            <div className={styled.info}>
                <h2 className={styled.title2}>{state.name}</h2>
                <p className={styled.continue}>{Math.floor(state.continue / 60)}分钟</p>
                <Space direction='horizontal'>
                    <p className={styled.start}>{dayjs.unix(state.start).format("YYYY/MM/DD")}</p>
                    <IconArrowRight className={styled.arrow2}/>
                    <p className={styled.end}>{dayjs.unix(state.start + state.continue).format("YYYY/MM/DD")}</p>
                </Space>
                <p className={styled.initiator}>{state.interview[0]}</p>
            </div>
            {(state.identity === 0) && <Button shape='round' type='primary' status='danger' className={styled.button1} onClick={handleCancelMeeting}>
                取消会议
            </Button>}
            {(state.identity === 0) && <Button shape='round' type='primary'  status='warning' className={styled.button2} onClick={() => { handleEditMeeting }}>
                编辑会议
            </Button>}
            <Button shape='round' type='primary' status='success' className={styled.button3} onClick={() => { handleEnterMeeting }}>
                进入会议
            </Button>
        </div>
    )

}