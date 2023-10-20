import { Avatar, Space, Button} from '@arco-design/web-react';
import avatar from '../../asset/avatar/OIP-C.jpg';
import styled from './index.module.css';
import { useNavigate } from "react-router-dom";
import { Information } from './Info/info';

export const ViewPage = () => {
    const navigator = useNavigate();
    return (
        <div className={styled.back}>
            <Space direction='horizontal' align='start' size={300}>
                <Space direction='vertical' align='start' className={styled.leftButton} size={100}>
                    <Space className={styled.user}>
                        <Avatar size= {70}>
                        <img 
                            alt='avatar'
                            src={avatar}
                        />
                        </Avatar>
                        <h1>魔女的味道真不错</h1>
                    </Space>
                    <Button shape='round' type='primary' className={styled.button} onClick={() => { navigator('/conferenceInformation') }}>
                        加入会议
                    </Button>
                    <Button shape='round' type='primary' className={styled.button} status='warning' onClick={() => { navigator('/reservationPage') }}>
                        预约会议
                    </Button>
                    <div className={styled.arrow} onClick={() => { navigator('/') }}></div>
                </Space>
                <div className={styled.scrollContainer}>
                    <h1>待参加的会议</h1>
                    <Information/>
                </div>
            </Space>
        </div>
    )

}