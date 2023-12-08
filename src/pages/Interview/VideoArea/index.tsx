import { IconExpand } from "@arco-design/web-react/icon"
import { useEffect, useRef } from "react"

export const VideoArea = ({ hasGetYourVideo, yourVideoStream, myVideoStream }: any) => {
    const myVideoRef = useRef<HTMLVideoElement>(null)
    const yourVideoRef = useRef<HTMLVideoElement>(null)



    useEffect(() => {
        if (yourVideoRef.current && hasGetYourVideo) {
            yourVideoRef.current.srcObject = yourVideoStream.current!
        }
    }, [hasGetYourVideo])


    useEffect(() => {
        if (myVideoRef.current) {
            myVideoRef.current.srcObject = myVideoStream.current!
        }
    }, [myVideoStream, myVideoStream.current])



    return <div className='flex w-full p-3 h-full'>
        {/* 副屏 */}
        <div className="w-1/2 h-full p-4">
            <div className="bg-white h-full flex flex-col p-1 justify-between">
                <div className="h-7/8 bg-gray-500" >
                    <video className="w-full h-full" autoPlay ref={myVideoRef} />
                </div>
                <div className="mt-3 flex-end text-center leading-7">{ }</div>
            </div>
        </div>
        {/* 主屏幕 */}
        <div className="w-1/2 h-full p-4">
            <div className="bg-white h-full flex flex-col p-1 justify-between">
                <div className="h-7/8 bg-gray-500" >
                    <video className="w-full h-full" autoPlay ref={yourVideoRef} />
                </div>
                <div className="mt-3 h-1/8 flex-end text-center leading-7" >{ }</div>
            </div>
        </div>
    </div>
}