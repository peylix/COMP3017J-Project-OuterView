import { Button, Space } from '@arco-design/web-react';
import styled from './index.module.css';
import { useNavigate, useLocation } from "react-router-dom";
import { IconArrowRight } from '@arco-design/web-react/icon'

export const ConferenceInformation = () => {
    const {state} = useLocation();
    const navigator = useNavigate();
    return (
        <div className={styled.back}>
            <div className={styled.arrow} onClick={() => { navigator('/viewPage') }}></div>
            <h1 className={styled.title}>会议详情</h1>
            <div className={styled.info}>
                <h2 className={styled.title2}>{state.name}</h2>
                <p className={styled.continue}>60分钟</p>
                <Space direction='horizontal'>
                    <p className={styled.start}>{state.start}</p>
                    <IconArrowRight className={styled.arrow2}/>
                    <p className={styled.end}>{state.start}</p>
                </Space>
                <p className={styled.initiator}>发起人：莽莽</p>
            </div>
            <Button shape='round' type='primary' status='danger' className={styled.button1} onClick={() => { navigator('/viewPage') }}>
                取消会议
            </Button>
            <Button shape='round' type='primary'  status='warning' className={styled.button2} onClick={() => { navigator('/reservationPage') }}>
                编辑会议
            </Button>
            <Button shape='round' type='primary' status='success' className={styled.button3} onClick={() => { alert('你已进入！'); }}>
                进入会议
            </Button>
        </div>
    )

}