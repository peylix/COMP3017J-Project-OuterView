import { Button, Divider, Message, Select } from "@arco-design/web-react"
import Editor from '@monaco-editor/react';
import { usePython } from 'react-py'

import { useEffect, useState } from "react";
import { postRunCode } from "../../../service/api";




export const CodeBlock = ({ IDE, send }: any) => {

    const [currentLang, setCurrentLang] = useState<string>('javascript')

    const langOptions = ['javascript', 'python', 'ruby', 'lua', 'shell']
    const [output, setOutput] = useState<string>('')

    const handleRunCode = async () => {
        try {

            const response = await postRunCode({ code: IDE.code, language: currentLang });
            if (response.status === 200) {
                const res = await response.json()
                setOutput(res.output!)
                if (res.error) {
                    Message.error(`代码运行失败: ${res.error}`)
                }
            } else {
                const errorData = await response.json();
            }
        } catch (error) {
            Message.error(`代码运行失败: ${error}`)
            console.error('代码运行失败:', error);
        }
    }


    useEffect(() => {

    }, [])
    return <div className={'w-full h-full container flex bg-gray-300'}>

        <div className={'w-1/3 h-full p-3 flex flex-col justify-between'}>
            <Select placeholder="语言选择" onChange={(val) => setCurrentLang(val)} defaultValue={'javascript'} >
                {langOptions.map(item => <Select.Option value={item}></Select.Option>)}
            </Select>
            <div className={'h-full p-5'}><Editor defaultLanguage="markdown" value={IDE.question}
                onChange={(val) => {
                    send('Ques', val)
                }}
            /></div>

            <Button type="primary" className={''} onClick={() => handleRunCode()}>运行</Button>
        </div>
        <div className={'w-11/12 h-full flex p-2 justify-between'}>
            <div className={'w-7/12 h-full  bg-black text-white'}>
                <Editor defaultLanguage="javascript" language={currentLang} value={IDE.code} onChange={(val) => {
                    send('Code', val)
                }} />
            </div>
            <div className={'w-4/12 h-full bg-black text-white p-3'}>{output && output.split('\n').map((item) => <div>{item}</div>)}</div>
        </div>

    </div>
}