import { Button, Divider, Form, Input, Link, Message, Space } from "@arco-design/web-react"
import "@arco-design/web-react/dist/css/arco.css";
import styled from "./index.module.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postUserLogin } from "../../service/api";
const FormItem = Form.Item;
export const Login = () => {
    const identities = ['User', 'Administor']
    const navigator = useNavigate()
    const [identity, setIdentity] = useState<string>('User')
    const [userId, setUserID] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [form] = Form.useForm();

    const handleInput = (v: Record<string, string>) => {
        if (v.userId) {
            setUserID(v.userId)
        }
        if (v.password) {
            setPassword(v.password)
        }
    }

    const postUserLoginReq = async () => {
        const params = {
            userId,
            password,
            auth: identity === 'User' ? '0' : '1'
        } as {
            userId: string,
            password: string,
            auth: '0' | '1'
        }
        navigator('/main')

        const res = await postUserLogin(params)
        if (res.code === '0') {
            Message.error('UserId or password is not correct')
        } else if (res.code === '1') {
            navigator('/main', { state: { token: userId, userId } })
        }
    }

    return <>
        <div className={styled.container}>
            <div className={styled.card}>
                <div className={styled.title}>Event Reservation Center</div>
                <Divider />
                <div className={styled.subTitle}>{`${identity} Login`}</div>
                <Form form={form} onChange={(v) => handleInput(v)} autoComplete='off' style={{ justifyContent: 'center' }} >
                    <FormItem field='userId' style={{ justifyContent: 'center' }} rules={[{
                        validator(value, cb) {
                            if (!value) {
                                return cb('The userId is required');
                            }

                            return cb();
                        },
                    }]}>
                        <Input placeholder='Please enter Email' />
                    </FormItem>
                    <FormItem field='password' style={{ justifyContent: 'center' }} rules={[{
                        validator(value, cb) {
                            if (!value) {
                                return cb('The password is required');
                            }

                            return cb();
                        },
                    }]}>
                        <Input placeholder='Please enter password' />
                    </FormItem>
                    <FormItem style={{ justifyContent: 'center' }} >
                        <Button onClick={() => {
                            form.validate();
                            if (userId && password) {
                                postUserLoginReq()
                            }
                        }} type='primary' style={{ width: 300, marginLeft: 50 }}>Login</Button>
                    </FormItem>
                    <Space style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ width: 300, display: 'flex', justifyContent: 'space-between' }}>
                            <Link onClick={() => navigator('/register')}>Register</Link>
                            <Link onClick={() => setIdentity((cur) => identities.filter((i) => i !== cur)[0])}>Switch User/Administor</Link>
                        </div>
                    </Space>
                </Form>
            </div>
        </div >
    </>
}