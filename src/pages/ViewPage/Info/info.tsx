import { meetings } from './data.js';
import styled from './info.module.css';
import { Space, Divider } from '@arco-design/web-react';
import { useNavigate } from "react-router-dom";
import { IconCaretRight } from '@arco-design/web-react/icon';
import { FC } from 'react';
import { IMeeting } from '../interface.js';

interface IInformation {
    meetings: IMeeting[]
}

export const Information: FC<IInformation> = (param) => {
    const navigator = useNavigate();
    const meetingInfo = meetings.map(meeting =>
        <div className={styled.meeting} key={meeting.meetingID}>
            <Space direction='vertical' className={styled.info} size={20}>
                <Space split={<Divider type='vertical' style={{ backgroundColor: 'black' }} />}>
                    <p className={styled.p}>{meeting.time}</p>
                    <p className={styled.p}>{meeting.meetingID}</p>
                    <p className={styled.p}>{meeting.status}</p>
                </Space>
                <p className={styled.p}>{meeting.conferenceName}</p>
            </Space>
            <h1 className={styled.title}>预约{meeting.id}</h1>
            <IconCaretRight className={styled.arcoIcon} onClick={() => {
                navigator('/conferenceInformation', { state: { name: meeting.conferenceName, start: meeting.time } })
            }} />
        </div>
    );
    return <div>{meetingInfo}</div>;
}