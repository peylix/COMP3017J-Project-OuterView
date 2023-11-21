import { Button, Divider, Form, Input, Link, Message, Space } from "@arco-design/web-react"
import "@arco-design/web-react/dist/css/arco.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postUserLogin } from "../../service/api";
const FormItem = Form.Item;
export const Login = () => {
    // Regarding the status of the input user ID and password
    const identities = ['User', 'Administor']
    const [identity, setIdentity] = useState<string>('User')
    const [userId, setUserID] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    // Hooks for route jumps
    const navigator = useNavigate()
    // Maintained Forms
    const [form] = Form.useForm();


    const handleInput = (v: Record<string, string>) => {
        if (v.userId) {
            setUserID(v.userId)
        }
        if (v.password) {
            setPassword(v.password)
        }
    }

    // login request
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

        const raw = await postUserLogin(params)
        if (raw.status === 201) {
            const res = await raw.json()
            // If the request is successful, go to the homepage and carry the user information
            navigator('/main', { state: { auth: res.auth, userId: res.userId, name: res.name, } })
        } else {
            // Otherwise, an error will pop up
            Message.error(raw.statusText)
        }


    }

    // The dynamic HTML structure is organized in the form of jsx/tsx because we use React.js
    return <>
        <div>
            {/* Translate CSS code into a class name system through tailwind CSS implementation (such as flex, justify content: center required for flex layout) */}
            {/* Login Card */}
            <div className={'container flex mx-auto w-3/5  h-screen justify-center items-center'}>
                <div className={'flex p-[50px] mx-auto h-300 flex-col flex-1 justify-start items-center bg-white rounded-3xl'}>
                    {/* Title/Website Name */}
                    <div className={'text-4xl '}>COMP3017J-Project-Outerview</div>
                    <Divider />
                    {/* Switch between user login or administrator login based on different identities */}
                    <div className={'text-base mb-4'}>{`${identity} Login`}</div>
                    {/* The form used for login, including some rules (required) */}
                    <Form form={form} onChange={(v) => handleInput(v)} autoComplete='off' className={'w-5/6 flex justify-start'} >
                        <FormItem field='userId' className={'flex justify-center'} rules={[{
                            validator(value, cb) {
                                if (!value) {
                                    return cb('The userId is required');
                                }
                                return cb();
                            },
                        }]}>
                            <Input placeholder='Please enter user id' />
                        </FormItem>
                        <FormItem field='password' className={'flex justify-center'} rules={[{
                            validator(value, cb) {
                                if (!value) {
                                    return cb('The password is required');
                                }

                                return cb();
                            },
                        }]}>
                            <Input.Password placeholder='Please enter password' />
                        </FormItem>
                        {/* Normal login button and tourist login button */}
                        <div className={'flex justify-around mb-3'}>
                            <Button
                                className={'w-32'} onClick={() => {
                                    form.validate();
                                    if (userId && password) {
                                        postUserLoginReq()
                                    }
                                }} type='primary' >Login</Button>
                        </div>

                        {/* Jump to the registration page and switch current identity */}
                        <div className={'flex justify-between items-center'}>
                            <Link onClick={() => navigator('/register')}>Register</Link>
                            <Link href="/viewPage">adw</Link>
                        </div>
                    </Form>
                </div>
            </div >
        </div>
    </>
}