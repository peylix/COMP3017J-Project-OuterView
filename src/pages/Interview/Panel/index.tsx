import { Button, Select, Icon } from "@arco-design/web-react"
import { IconSound, IconStar, IconVideoCamera } from '@arco-design/web-react/icon'

export const Panel = ({ start, allClients }: any) => {

    return <div className="flex bg-white h-full w-full p-2 flex-col">
        <div className="flex-start border-2 border-solid border-slate-400 text-center w-full h-8 leading-7">参会人员</div>
        <div className="flex flex-col h-2/3 bg-gray-100 p-3 pl-6">
            {allClients.map((item: any) => {
                return <div className="w-full flex justify-between">
                    <div>{item}</div>
                    <div>面试官</div>
                    <div className="flex text-lg">
                        <div className="mr-3"><IconSound /></div>
                        <div><IconVideoCamera /></div>
                    </div>
                </div>
            })}


        </div>
        <div className="w-2/3 p-3">
            <Button className={'w-full'} type='primary' onClick={() => start()} >加入面试</Button>
        </div>
        <div className="w-full m-auto">
            <Button className={'w-full'} type='primary' status='danger' >退出</Button>
        </div>
    </div>
}