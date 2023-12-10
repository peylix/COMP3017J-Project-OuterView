import { CodeBlock } from "./CodeBlock"
import "@arco-design/web-react/dist/css/arco.css";
import { Panel } from "./Panel";
import { VideoArea } from "./VideoArea";
import { useEffect, useRef } from "react";
import { useVideoInSocket } from "./useVideoInSocket";




export const Interview = () => {
    // 进入视频会议后，我们拥有当前会议的id和本用户id
    // 去连接指定的房间id
    let myID = ''
    const roomID = '3333'
    useEffect(() => {
        myID = Math.floor(Math.random() * 20) + ''
        info.myID = myID
    }, [])

    const info = { myID, roomID }
    const { yourVideoLoading: hasGetYourVideo, yourVideoStream, pushStream, allClients, IDE, send } = useVideoInSocket({ info })
    const myVideoStream = useRef<MediaStream | null>(null)

    const init = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
        myVideoStream.current = stream

    }
    useEffect(() => {
        init()
    }, [])

    const mount = async () => {
        // 把获取到的音视频流推送到远端
        pushStream && (await pushStream(myVideoStream.current!))
    }

    return <div className={'w-screen h-screen container '}>
        <div className={'w-screen h-12 p-3 text-2xl bg-white pl-[32px] leading-6 '}>A 公司面试-创建人：B</div>
        <div className={'flex w-screen h-[calc(100%-3rem)]'}>
            <div className={'w-4/5'}>
                <div className={'container h-1/2'}>
                    <VideoArea
                        myVideoStream={myVideoStream}
                        hasGetYourVideo={hasGetYourVideo} yourVideoStream={yourVideoStream} />
                </div>
                <div className={'container h-1/2 p-3'}>
                    <CodeBlock IDE={IDE} send={send} />
                </div>
            </div>
            <div className={' w-2/5  p-3'}>
                <Panel start={mount} allClients={allClients} />
            </div>
        </div>


    </div>
} 