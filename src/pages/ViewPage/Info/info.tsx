import { meetings } from './data.js';
import styled from './info.module.css';
import { Space, Divider } from '@arco-design/web-react';
import { useLocation, useNavigate } from "react-router-dom";
import { IconCaretRight } from '@arco-design/web-react/icon';
import { FC } from 'react';
import { IMeeting, Identity } from '../interface.js';
import dayjs from 'dayjs';

interface IInformation {
    meetings: IMeeting[],
    userID: string,
    identity: Identity
}

export const Information: FC<IInformation> = (param) => {
    const { state } = useLocation();

    const navigator = useNavigate();
    const meetingInfo = param.meetings.map(meeting =>
        <div className={styled.meeting} key={meeting.id}>
            <Space direction='vertical' className={styled.info} size={20}>
                <Space split={<Divider type='vertical' style={{ backgroundColor: 'black' }} />}>
                    <p className={styled.p}>{dayjs.unix(meeting.startTimeLimit).format("YYYY/MM/DD")}</p>
                    <p className={styled.p}>{meeting.status ? '会议已开始' : '会议关闭'}</p>
                </Space>
                <p className={styled.p}>{meeting.name}</p>
            </Space>
            {/* <h1 className={styled.title}>预约{meeting.id}</h1> */}
            <IconCaretRight className={styled.arcoIcon} onClick={() => {
                navigator('/conferenceInformation', {
                    state: {
                        meetingId: meeting.id,
                        name: meeting.name,
                        userID: param.userID,
                        identity: param.identity,
                        start: meeting.startTimeLimit,
                        end: meeting.endTimeLimit,
                        interview: meeting.interview,
                        ...state
                    }
                })
            }} />
        </div>
    );
    return <div>{meetingInfo}</div>;
}