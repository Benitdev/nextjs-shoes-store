import React, { useEffect, useRef, useState } from 'react'
import { socket } from '../pages/_app'
import ChatBoxMessage from './ChatBoxMessage'

const ChatBoxContain = () => {
    const [messages, setMessages] = useState<any>([])
    const bottomRef = useRef<any>()
    useEffect(() => {
        socket.on('receive-msg', (data) => {
            setMessages((prev: any) => [
                ...prev,
                {
                    ...data,
                    own: data.sender === socket.id,
                },
            ])
        })
        return () => {
            socket.off('receive-msg')
        }
    }, [])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
        <div className="flex flex-1 flex-col justify-end overflow-hidden bg-slate-300">
            <div className="max-h-full space-y-1 overflow-y-auto p-2">
                {messages.map((msg: any, index: any) => {
                    let someBeforeMsgSender = false
                    let someAfterMsgSender = false
                    if (msg.sender === messages[index - 1]?.sender) {
                        someBeforeMsgSender = true
                    }
                    if (msg.sender === messages[index + 1]?.sender) {
                        someAfterMsgSender = true
                    }
                    return (
                        <ChatBoxMessage
                            key={index}
                            text={msg.text}
                            own={msg.own}
                            someBeforeMsgSender={someBeforeMsgSender}
                            someAfterMsgSender={someAfterMsgSender}
                        />
                    )
                })}
                <div ref={bottomRef}></div>
            </div>
        </div>
    )
}

export default ChatBoxContain
