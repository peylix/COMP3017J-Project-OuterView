import { Button, Space, Input, Select } from '@arco-design/web-react';
import styled from './index.module.css';
import { useNavigate } from "react-router-dom";

export const ReservationPage = () => {
    const navigator = useNavigate();
    const Option = Select.Option;
    const months: number[] = Array.from({ length: 12 }, (_, index) => index + 1);
    const days: number[] = Array.from({ length: 30 }, (_, index) => index + 1);
    const hours: number[] = Array.from({ length: 24 }, (_, index) => index + 1);
    const mins: number[] = Array.from({ length: 60 }, (_, index) => index);
    const times: number[] = [15, 30, 45, 60];

    const getMonthName = (month: number) => {
        const monthNames = [
          '一月', '二月', '三月', '四月', '五月', '六月',
          '七月', '八月', '九月', '十月', '十一月', '十二月'
        ];
        return monthNames[month - 1];
    }

    return (
        <div className={styled.back}>
            <div className={styled.arrow} onClick={() => { navigator('/viewPage') }}></div>
            <h1 className={styled.title}>预约会议</h1>
            <Space direction='vertical' align='start' size={50} className={styled.list}>
                <Space direction='horizontal' align='start' size={200}>
                    <p>会议名称: </p>
                    <Input className={styled.input} allowClear  placeholder='请输入会议名称'/>
                </Space>
                <Space direction='horizontal' align='start'>
                    <p>开始时间: </p>
                    <Select size='large' placeholder='选择月份' className={styled.month} allowClear>
                        {months.map((month) => (
                        <Option key={month} value={getMonthName(month)}>
                            {getMonthName(month)}
                        </Option>
                        ))}
                    </Select>
                    <Select size='large' placeholder='选择日子' className={styled.day} allowClear>
                        {days.map((day) => (
                        <Option key={day} value={day}>
                            {day}号
                        </Option>
                        ))}
                    </Select>
                    <Select size='large' placeholder='选择小时' className={styled.hour} allowClear>
                        {hours.map((hour) => (
                        <Option key={hour} value={hour}>
                            {hour}点
                        </Option>
                        ))}
                    </Select>
                    <Select size='large' placeholder='选择分钟' className={styled.min} allowClear>
                        {mins.map((min) => (
                        <Option key={min} value={min}>
                            {min}分
                        </Option>
                        ))}
                    </Select>
                </Space>
                <Space direction='horizontal' align='start' size={200}>
                    <p>持续时间: </p>
                    <Select size='large' placeholder='会议总时长' className={styled.time} allowClear>
                            {times.map((time) => (
                            <Option key={time} value={time}>
                                {time}分钟
                            </Option>
                            ))}
                    </Select>
                </Space>
                <Space direction='horizontal' align='start' size={200}>
                    <p>提醒时间: </p>
                    <Select size='large' placeholder='提前提醒' className={styled.time} allowClear>
                            {times.map((time) => (
                            <Option key={time} value={time}>
                                {time}分钟
                            </Option>
                            ))}
                    </Select>
                </Space>
                <Space direction='horizontal' align='start' size={200}>
                    <p>邀请人: </p>
                    <Input className={styled.input2} allowClear  placeholder='请输入会议邀请成员ID'/>
                </Space>
                <Button onClick={() => { 
                    navigator('/viewPage') 
                    

                }}shape='round' type='primary' status='success' className={styled.button1} >完成预约</Button>
            </Space>
        </div>
    )

}