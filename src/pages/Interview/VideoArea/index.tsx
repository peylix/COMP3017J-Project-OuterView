import { IconExpand } from "@arco-design/web-react/icon"
import { useEffect, useRef } from "react"

export const VideoArea = () => {
    let stream = null
    const local_video = useRef()
    const getMedia = async () => {
        let ori_stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        })
        stream = ori_stream
        if (local_video.current) {
            local_video.current.srcObject = stream
        }
        let peer = new RTCPeerConnection()
        stream.getTracks().forEach((track) => {
            peer.addTrack(track, stream)
        })
    }
    useEffect(() => {
        getMedia()
    }, [])
    return <div className='flex w-full p-3 h-full'>
        {/* 副屏 */}
        <div className="w-1/2 flex h-full flex-wrap ">
            <div className="w-1/2 h-2/5 p-2 ">
                <div className="bg-white h-full flex flex-col justify-between">
                    <div className=" bg-gray-500 h-full" ></div>
                    <div className="h-[2rem] flex-end leading-5 flex p-1" >
                        <div className="w-11/12">JIEGE</div>
                        <IconExpand className="w-1/12 text-xl leading-6" />
                    </div>
                </div>
            </div>


        </div>
        {/* 主屏幕 */}
        <div className="w-1/2 h-full p-4">
            <div className="bg-white h-full flex flex-col p-2 justify-between">
                <div className="h-7/8 bg-gray-500" >
                    <video className="w-full h-full" ref={local_video} autoPlay muted />
                </div>
                <div className="h-1/8 flex-end text-center leading-7" >AWEI</div>
            </div>
        </div>
    </div>
}