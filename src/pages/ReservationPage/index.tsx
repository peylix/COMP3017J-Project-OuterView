import { Button, Space, Input, Select, Message } from '@arco-design/web-react';
import styled from './index.module.css';
import { useLocation, useNavigate } from "react-router-dom";
import { postCreateMeeting } from '../../service/api';
import { useMemo, useState } from 'react';
import dayjs from 'dayjs';

export const ReservationPage = () => {
    const { state } = useLocation();
    const navigator = useNavigate();
    const Option = Select.Option;
    const months: number[] = Array.from({ length: 12 }, (_, index) => index + 1);
    const days: number[] = Array.from({ length: 30 }, (_, index) => index + 1);
    const hours: number[] = Array.from({ length: 24 }, (_, index) => index + 1);
    const mins: number[] = Array.from({ length: 60 }, (_, index) => index);
    const times: number[] = [15, 30, 45, 60];
    const [id, setId] = useState<string>(state?.name || '');
    const [month, setMonth] = useState<number>(1);
    const [day, setDay] = useState<number>(1);
    const [hour, setHour] = useState<number>(0);
    const [min, setMin] = useState<number>(0);
    const [continu, setContinu] = useState<number>(0);
    const [invitee, setInvitee] = useState<string>('');
    const [type, setType] = useState<boolean>(true);
    const realStart = useMemo(() => {
        const date = dayjs();
        const updatedDate = date
            .set('month', month - 1)
            .set('date', day)
            .set('hour', hour)
            .set('minute', min);
        return updatedDate.unix()
    }, [month, day, hour, min])

    const handleEditMeeting = async () => {
        try {
            setType(state.identitier);
            const response = await postCreateMeeting({
                end: realStart + continu * 60,
                invitees: [invitee, state.userId],
                name: id,
                start: realStart,
                type: type
            });
            console.log(type)
            console.log(invitee)
            if (response.status === 201) {
                const data = await response.json();
                if (data.status === 0) {
                    Message.success('会议已创建');
                    navigator('/viewPage', {
                        state
                    })
                } else {
                    Message.error(data.message);
                }
            } else {
                const errorData = await response.json();
                Message.error(errorData.message);
            }
        } catch (error) {
            console.error('创建会议失败:', error);
            Message.error('创建会议失败');
        }
    }

    return (
        <div className={styled.back}>
            <div className={styled.arrow} onClick={() => { navigator('/viewPage', { state }) }}></div>
            <h1 className={styled.title}>预约会议</h1>
            <Space direction='vertical' align='start' size={50} className={styled.list}>
                <Space direction='horizontal' align='start' size={200}>
                    <p>会议名称: </p>
                    <Input className={styled.input} value={id} onChange={(v) => { setId(v) }} allowClear placeholder='请输入会议名称' />
                </Space>
                <Space direction='horizontal' align='start'>
                    <p>开始时间: </p>
                    <Select size='large' placeholder='选择月份' onChange={(v) => { setMonth(v) }} className={styled.month} allowClear>
                        {months.map((month) => (
                            <Option key={month} value={month}>
                                {month}月
                            </Option>
                        ))}
                    </Select>
                    <Select size='large' placeholder='选择日子' onChange={(v) => { setDay(v) }} className={styled.day} allowClear>
                        {days.map((day) => (
                            <Option key={day} value={day}>
                                {day}号
                            </Option>
                        ))}
                    </Select>
                    <Select size='large' placeholder='选择小时' onChange={(v) => { setHour(v) }} className={styled.hour} allowClear>
                        {hours.map((hour) => (
                            <Option key={hour} value={hour}>
                                {hour}点
                            </Option>
                        ))}
                    </Select>
                    <Select size='large' placeholder='选择分钟' onChange={(v) => { setMin(v) }} className={styled.min} allowClear>
                        {mins.map((min) => (
                            <Option key={min} value={min}>
                                {min}分
                            </Option>
                        ))}
                    </Select>
                </Space>
                <Space direction='horizontal' align='start' size={200}>
                    <p>持续时间: </p>
                    <Select size='large' placeholder='会议总时长' className={styled.time} allowClear onChange={(v) => { setContinu(v) }}>
                        {times.map((time) => (
                            <Option key={time} value={time}>
                                {time}分钟
                            </Option>
                        ))}
                    </Select>
                </Space>
                <Space direction='horizontal' align='start' size={200}>
                    <p>邀请人: </p>
                    <Input className={styled.input2} onChange={(v) => { setInvitee(v) }} allowClear placeholder='请输入会议邀请成员ID' />
                </Space>
                <Button onClick={handleEditMeeting} shape='round' type='primary' status='success' className={styled.button1} >完成预约</Button>
            </Space>
        </div>
    )

}