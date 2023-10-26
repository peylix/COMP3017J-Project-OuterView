import { Button, Select } from "@arco-design/web-react"

export const CodeBlock = () => {


    return <div className={'w-full h-full container flex bg-gray-300'}>
        <div className={'w-1/3 h-full p-3 flex flex-col justify-between'}>
            <Select  placeholder="语言选择" />
            <div>共享题目</div>
            <Button type="primary" className={''}>运行</Button>
        </div>
        <div className={'w-11/12 h-full flex p-2 justify-between'}>
            <div className={'w-7/12 h-full  bg-black text-white p-3'}>IDE1</div>
            <div className={'w-4/12 h-full bg-black text-white p-3'}>终端</div>
        </div>

    </div>
}