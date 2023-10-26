import { CodeBlock } from "./CodeBlock"
import "@arco-design/web-react/dist/css/arco.css";
import { Panel } from "./Panel";
import { VideoArea } from "./VideoArea";




export const Interview = () => {
    return <div className={'w-screen h-screen container '}>
        <div className={'w-screen h-12 p-3 text-2xl bg-white pl-[32px] leading-6 '}>A 公司面试-创建人：B</div>
        <div className={'flex w-screen h-[calc(100%-3rem)]'}>
            <div className={'w-4/5'}>
                <div className={'container h-1/2'}>
                    <VideoArea />
                </div>
                <div className={'container h-1/2 p-3'}>
                    <CodeBlock />
                </div>
            </div>
            <div className={' w-2/5  p-3'}>
                <Panel />
            </div>
        </div>


    </div>
} 