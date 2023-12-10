import { Button, Message, Space } from '@arco-design/web-react';
import styled from './index.module.css';
import { useNavigate, useLocation } from "react-router-dom";
import { IconArrowRight } from '@arco-design/web-react/icon'
import dayjs from 'dayjs';
import { deleteMeeting } from '../../service/api';

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
                    navigator('/viewPage', { state: { refresh: true } })
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

    const handleEditMeeting = () => {
        navigator('/reservationPage', { state: { interview: state.interview, name: state.name, start: state.start, continue: state.continue } })
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
                <p className={styled.initiator}>发起人：莽莽</p>
            </div>
            <Button shape='round' type='primary' status='danger' className={styled.button1} onClick={handleCancelMeeting}>
                取消会议
            </Button>
            <Button shape='round' type='primary'  status='warning' className={styled.button2} onClick={() => { handleEditMeeting }}>
                编辑会议
            </Button>
            <Button shape='round' type='primary' status='success' className={styled.button3} onClick={() => { alert('你已进入！'); }}>
                进入会议
            </Button>
        </div>
    )

}