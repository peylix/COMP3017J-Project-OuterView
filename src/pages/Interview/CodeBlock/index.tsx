import { Button, Select } from "@arco-design/web-react"
import Editor from '@monaco-editor/react';
import { usePython } from 'react-py'

import { useEffect, useState } from "react";




export const CodeBlock = () => {

    const [currentLang, setCurrentLang] = useState<string>('javascript')

    const langOptions = ['javascript', 'python']
    const [showOutput, setShowOutput] = useState(false)
    const {
        runPython,
        stdout,
        stderr,
        isLoading,
        isRunning,
        interruptExecution,
        isAwaitingInput,
        sendInput,
        prompt
    } = usePython()


    function run() {
        console.log(isLoading)
        // runPython(input)
        setShowOutput(true)
    }
    useEffect(() => {

    }, [])
    return <div className={'w-full h-full container flex bg-gray-300'}>

        <div className={'w-1/3 h-full p-3 flex flex-col justify-between'}>
            <Select placeholder="语言选择" onChange={(val) => setCurrentLang(val)} >
                {langOptions.map(item => <Select.Option value={item}></Select.Option>)}
            </Select>
            <div className={'h-full p-5'}><Editor defaultLanguage="markdown" defaultValue="在此处输入题目" /></div>

            <Button type="primary" className={''} onClick={run}>运行</Button>
        </div>
        <div className={'w-11/12 h-full flex p-2 justify-between'}>
            <div className={'w-7/12 h-full  bg-black text-white'}>
                <Editor defaultLanguage="javascript" language={currentLang} />
            </div>
            <div className={'w-4/12 h-full bg-black text-white p-3'}>终端</div>
        </div>

    </div>
}