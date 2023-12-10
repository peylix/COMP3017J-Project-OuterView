import { useEffect, useRef, useState } from "react"
import { Socket, io } from 'socket.io-client'

export interface IInfo {
    myID: string,
    roomID: string
}

export const useVideoInSocket = (props: { info: IInfo }) => {
    const peerRef = useRef<RTCPeerConnection | null>(new RTCPeerConnection())
    // rtc信令服务器
    const socketRef = useRef<Socket | null>(io('http://localhost:3333'))

    const [hasConnect, setHasConnect] = useState<boolean>(false)
    const [yourVideoLoading, setYourVideoLoading] = useState<boolean>(false)
    const yourVideoStream = useRef<MediaStream | null>(new MediaStream())

    const [allClients, setAllClients] = useState<string[]>([])

    // IDE相关信息
    const [question, setQuestion] = useState<string>('在此处输入题目')
    const [code, setCode] = useState<string>('aaaa')

    const IDE = { question, setQuestion, code, setCode }

    const send = (type: 'Code' | 'Ques', content: string) => {
        const socket = socketRef.current!

        if (type === 'Code') {
            setCode(content)
            socket.send({
                type: 'updateCode',
                data: {
                    content
                }
            })

        } else if (type === 'Ques') {
            setQuestion(content)
            socket.send({
                type: 'updateQues',
                data: {
                    content
                }
            })
        }
    }


    useEffect(() => {
        const socket = socketRef.current!
        const peer = peerRef.current!
        // 接受到其他 client 的 call
        socket.on('call', async (res) => {

            const sdp = res.data
            await peer.setRemoteDescription({
                type: 'offer',
                sdp,
            })

            // answer 其他 client
            peer.createAnswer().then(async answer => {
                await peer.setLocalDescription(answer)

                socket.send({
                    type: 'answer',
                    data: {
                        sdp: answer.sdp,
                        roomID: props.info.roomID,
                        myID: props.info.myID
                    }
                })
            })
        })

        socket.on('answer', async (res) => {
            const sdp = res.data
            await peer.setRemoteDescription({
                type: 'answer',
                sdp
            })
        })

        // 接受到其他client的 update
        socket.on('updateMyCode', async (res) => {
            console.log(1)
            const content = res.data
            setCode(content)
        })
        socket.on('updateMyQues', async (res) => {
            console.log(2)
            const content = res.data
            setQuestion(content)
        })

        socket.on('candidate', async (res) => {
            const candidate = res.data
            await peer.addIceCandidate(new RTCIceCandidate(candidate))
        })

        socket.on('updateAllClients', async (res) => {
            const allClients = res.data
            setAllClients(allClients)
        })

        peer.onicecandidate = (event) => {
            const candidate = event.candidate;
            if (candidate) {
                socket.send({
                    type: 'candidate',
                    data: {
                        candidate,
                        roomID: props.info.roomID,
                        myID: props.info.myID
                    }
                })
            }
        }

        peer.ontrack = (e) => {
            yourVideoStream.current!.addTrack(e.track)
            setYourVideoLoading(true)
        }
        return () => {
            socket.off('call')
            socket.off('answer')
            socket.off('candidate')
            socket.off('updateAllClients')
            socket.off('updateMyCode')
            socket.off('updateMyQues')
            peer.ontrack = null
            peer.onicecandidate = null
        }

    }, [props.info])




    const pushStream = async (stream: MediaStream) => {
        const socket = socketRef.current!
        const peer = peerRef.current!
        if (!hasConnect) {
            socket.send({
                type: 'connect',
                data: {
                    myID: props.info.myID,
                    roomID: props.info.roomID
                }
            })
            setHasConnect(true)
        }

        stream.getTracks().forEach((track) => peer.addTrack(track))
        const offer = await peer.createOffer()
        await peer.setLocalDescription(offer)
        socket.send({
            type: 'offer',
            data: {
                sdp: offer.sdp,
                myID: props.info.myID,
                roomID: props.info.roomID
            }
        })

    }

    return { yourVideoLoading, yourVideoStream, pushStream, allClients, IDE, send }


}