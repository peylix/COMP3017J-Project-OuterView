import { Button, Space, Input, Select, Message } from '@arco-design/web-react';
import styled from './index.module.css';
import { useLocation, useNavigate } from "react-router-dom";
import { postCreateMeeting } from '../../service/api';
import { useState } from 'react';
import dayjs from 'dayjs';

export const ReservationPage = () => {
    const {state} = useLocation();
    const navigator = useNavigate();
    const Option = Select.Option;
    const months: number[] = Array.from({ length: 12 }, (_, index) => index + 1);
    const days: number[] = Array.from({ length: 30 }, (_, index) => index + 1);
    const hours: number[] = Array.from({ length: 24 }, (_, index) => index + 1);
    const mins: number[] = Array.from({ length: 60 }, (_, index) => index);
    const times: number[] = [15, 30, 45, 60];
    const [name, setName] = useState<string>('');
    const [start, setStart] = useState<number>(0);
    const [month, setMonth] = useState<number>(0);
    const [day, setDay] = useState<number>(0);
    const [hour, setHour] = useState<number>(0);
    const [min, setMin] = useState<number>(0);
    const [continu, setContinu] = useState<number>(0);
    const [invitee, setInvitee] = useState<string>('');
    const [type, setType] = useState<boolean>(true);

    const getMonthName = (month: number) => {
        const monthNames = [
          '一月', '二月', '三月', '四月', '五月', '六月',
          '七月', '八月', '九月', '十月', '十一月', '十二月'
        ];
        return monthNames[month - 1];
    }

    const handleEditMeeting = async () => {
        try {
            const date = dayjs();
            const updatedDate = date
                .set('month', month-1)
                .set('date', day)
                .set('hour', hour) 
                .set('minute', min);
            setStart(updatedDate.unix());
            setType(state.interview);
            const response = await postCreateMeeting({ 
                continue: continu,
                invitees: [name, invitee],
                name: name,
                start: start,
                type: type
             });
            if (response.status === 200) {
                const data = await response.json();
                if (data.status === 1) {
                    Message.success('会议已创建');
                    navigator('/viewPage')
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
            <div className={styled.arrow} onClick={() => { navigator('/viewPage') }}></div>
            <h1 className={styled.title}>预约会议</h1>
            <Space direction='vertical' align='start' size={50} className={styled.list}>
                <Space direction='horizontal' align='start' size={200}>
                    <p>会议名称: </p>
                    <Input className={styled.input} value={state.name} onChange={(v) => {setName(v)}} allowClear placeholder='请输入会议名称'/>
                </Space>
                <Space direction='horizontal' align='start'>
                    <p>开始时间: </p>
                    <Select size='large' placeholder='选择月份' value={getMonthName(dayjs.unix(state.start).month() + 1)} onChange={(v) => { setMonth(v) }} className={styled.month} allowClear>
                        {months.map((month) => (
                        <Option key={month} value={getMonthName(month)}>
                            {getMonthName(month)}
                        </Option>
                        ))}
                    </Select>
                    <Select size='large' placeholder='选择日子' value={dayjs.unix(state.start).date()} onChange={(v) => {setDay(v)}} className={styled.day} allowClear>
                        {days.map((day) => (
                        <Option key={day} value={day}>
                            {day}号
                        </Option>
                        ))}
                    </Select>
                    <Select size='large' placeholder='选择小时' value={dayjs.unix(state.start).hour()} onChange={(v) => {setHour(v)}} className={styled.hour} allowClear>
                        {hours.map((hour) => (
                        <Option key={hour} value={hour}>
                            {hour}点
                        </Option>
                        ))}
                    </Select>
                    <Select size='large' placeholder='选择分钟' value={dayjs.unix(state.start).minute()} onChange={(v) => {setMin(v)}} className={styled.min} allowClear>
                        {mins.map((min) => (
                        <Option key={min} value={min}>
                            {min}分
                        </Option>
                        ))}
                    </Select>
                </Space>
                <Space direction='horizontal' align='start' size={200}>
                    <p>持续时间: </p>
                    <Select size='large' placeholder='会议总时长' className={styled.time} allowClear onChange={(v) => {setContinu(v)}}>
                            {times.map((time) => (
                            <Option key={time} value={time}>
                                {time}分钟
                            </Option>
                            ))}
                    </Select>
                </Space>
                <Space direction='horizontal' align='start' size={200}>
                    <p>邀请人: </p>
                    <Input className={styled.input2} onChange={(v) => {setInvitee(v)}} allowClear  placeholder='请输入会议邀请成员ID'/>
                </Space>
                <Button onClick={() => { 
                    navigator('/viewPage') 
                    

                }}shape='round' type='primary' status='success' onChange={handleEditMeeting} className={styled.button1} >完成预约</Button>
            </Space>
        </div>
    )

}