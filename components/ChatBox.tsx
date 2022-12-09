import React, { useState } from 'react'
import { socket } from '../pages/_app'
import ChatBoxContain from './ChatBoxContain'

const ChatBox = () => {
    const [text, setText] = useState<string>('')

    const handleSendMessage = () => {
        socket.emit('send-msg', {
            text,
            sender: socket.id,
        })
    }

    console.log(text)
    const handleSendIcon = () => {}
    return (
        <div className="flex h-full flex-col">
            <div className="bg-teal-800 px-3 py-2 text-slate-200">
                Benit-Store
            </div>
            <ChatBoxContain />
            <div className="flex h-[50px] items-center bg-white p-2">
                <div className="flex text-gray-600">
                    <div className="cursor-pointer rounded-full p-1 hover:bg-gray-400">
                        <svg
                            viewBox="0 0 24 24"
                            height="20px"
                            width="20px"
                            fill="currentColor"
                        >
                            <g fillRule="evenodd">
                                <polygon
                                    fill="none"
                                    points="-6,30 30,30 30,-6 -6,-6 "
                                ></polygon>
                                <path d="m18,11l-5,0l0,-5c0,-0.552 -0.448,-1 -1,-1c-0.5525,0 -1,0.448 -1,1l0,5l-5,0c-0.5525,0 -1,0.448 -1,1c0,0.552 0.4475,1 1,1l5,0l0,5c0,0.552 0.4475,1 1,1c0.552,0 1,-0.448 1,-1l0,-5l5,0c0.552,0 1,-0.448 1,-1c0,-0.552 -0.448,-1 -1,-1m-6,13c-6.6275,0 -12,-5.3725 -12,-12c0,-6.6275 5.3725,-12 12,-12c6.627,0 12,5.3725 12,12c0,6.6275 -5.373,12 -12,12"></path>
                            </g>
                        </svg>
                    </div>
                    <div
                        className={`cursor-pointer rounded-full p-1 hover:bg-gray-400 ${
                            text ? 'hidden' : ''
                        }`}
                    >
                        <svg viewBox="0 -1 17 17" height="20px" width="20px">
                            <g fill="none" fillRule="evenodd">
                                <path
                                    d="M2.882 13.13C3.476 4.743 3.773.48 3.773.348L2.195.516c-.7.1-1.478.647-1.478 1.647l1.092 11.419c0 .5.2.9.4 1.3.4.2.7.4.9.4h.4c-.6-.6-.727-.951-.627-2.151z"
                                    className="fill-gray-600"
                                ></path>
                                <circle cx="8.5" cy="4.5" r="1.5"></circle>
                                <path
                                    d="M14 6.2c-.2-.2-.6-.3-.8-.1l-2.8 2.4c-.2.1-.2.4 0 .6l.6.7c.2.2.2.6-.1.8-.1.1-.2.1-.4.1s-.3-.1-.4-.2L8.3 8.3c-.2-.2-.6-.3-.8-.1l-2.6 2-.4 3.1c0 .5.2 1.6.7 1.7l8.8.6c.2 0 .5 0 .7-.2.2-.2.5-.7.6-.9l.6-5.9L14 6.2z"
                                    className="fill-gray-600"
                                ></path>
                                <path
                                    d="M13.9 15.5l-8.2-.7c-.7-.1-1.3-.8-1.3-1.6l1-11.4C5.5 1 6.2.5 7 .5l8.2.7c.8.1 1.3.8 1.3 1.6l-1 11.4c-.1.8-.8 1.4-1.6 1.3z"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="fill-gray-600"
                                ></path>
                            </g>
                        </svg>
                    </div>
                    <div
                        className={`cursor-pointer rounded-full p-1 hover:bg-gray-400 ${
                            text ? 'hidden' : ''
                        }`}
                    >
                        <svg
                            x="0px"
                            y="0px"
                            viewBox="0 0 17 16"
                            height="20px"
                            width="20px"
                            // class="a8c37x1j ms05siws hr662l2t b7h9ocf4 crt8y2ji"
                            fill="currentColor"
                        >
                            <g fillRule="evenodd">
                                <circle
                                    fill="none"
                                    cx="5.5"
                                    cy="5.5"
                                    r="1"
                                ></circle>
                                <circle
                                    fill="none"
                                    cx="11.5"
                                    cy="4.5"
                                    r="1"
                                ></circle>
                                <path
                                    d="M5.3 9c-.2.1-.4.4-.3.7.4 1.1 1.2 1.9 2.3 2.3h.2c.2 0 .4-.1.5-.3.1-.3 0-.5-.3-.6-.8-.4-1.4-1-1.7-1.8-.1-.2-.4-.4-.7-.3z"
                                    fill="none"
                                ></path>
                                <path d="M10.4 13.1c0 .9-.4 1.6-.9 2.2 4.1-1.1 6.8-5.1 6.5-9.3-.4.6-1 1.1-1.8 1.5-2 1-3.7 3.6-3.8 5.6z"></path>
                                <path
                                    d="M2.5 13.4c.1.8.6 1.6 1.3 2 .5.4 1.2.6 1.8.6h.6l.4-.1c1.6-.4 2.6-1.5 2.7-2.9.1-2.4 2.1-5.4 4.5-6.6 1.3-.7 1.9-1.6 1.9-2.8l-.2-.9c-.1-.8-.6-1.6-1.3-2-.7-.5-1.5-.7-2.4-.5L3.6 1.5C1.9 1.8.7 3.4 1 5.2l1.5 8.2zm9-8.9c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm-3.57 6.662c.3.1.4.4.3.6-.1.3-.3.4-.5.4h-.2c-1-.4-1.9-1.3-2.3-2.3-.1-.3.1-.6.3-.7.3-.1.5 0 .6.3.4.8 1 1.4 1.8 1.7zM5.5 5.5c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z"
                                    fillRule="nonzero"
                                ></path>
                            </g>
                        </svg>
                    </div>
                </div>
                <div className="ml-2 mr-1 flex-1 rounded-xl bg-slate-300 px-2 py-1">
                    <input
                        type="text"
                        className="w-full bg-transparent text-sm outline-none"
                        placeholder="Gõ vào đây và nhấn Enter"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div>
                    <div
                        className="cursor-pointer rounded-full p-2 hover:bg-slate-400"
                        onClick={text ? handleSendMessage : handleSendIcon}
                    >
                        {text ? (
                            <svg
                                width="20px"
                                height="20px"
                                viewBox="0 0 24 24"
                                className="fill-gray-600"
                            >
                                <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 C22.8132856,11.0605983 22.3423792,10.4322088 21.714504,10.118014 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.8376543,3.0486314 1.15159189,3.99121575 L3.03521743,10.4322088 C3.03521743,10.5893061 3.34915502,10.7464035 3.50612381,10.7464035 L16.6915026,11.5318905 C16.6915026,11.5318905 17.1624089,11.5318905 17.1624089,12.0031827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z"></path>
                            </svg>
                        ) : (
                            <svg
                                viewBox="0 0 16 16"
                                height="20"
                                width="20"
                                className="fill-gray-600"
                            >
                                <path d="M16,9.1c0-0.8-0.3-1.1-0.6-1.3c0.2-0.3,0.3-0.7,0.3-1.2c0-1-0.8-1.7-2.1-1.7h-3.1c0.1-0.5,0.2-1.3,0.2-1.8 c0-1.1-0.3-2.4-1.2-3C9.3,0.1,9,0,8.7,0C8.1,0,7.7,0.2,7.6,0.4C7.5,0.5,7.5,0.6,7.5,0.7L7.6,3c0,0.2,0,0.4-0.1,0.5L5.7,6.6 c0,0-0.1,0.1-0.1,0.1l0,0l0,0L5.3,6.8C5.1,7,5,7.2,5,7.4v6.1c0,0.2,0.1,0.4,0.2,0.5c0.1,0.1,1,1,2,1h5.2c0.9,0,1.4-0.3,1.8-0.9 c0.3-0.5,0.2-1,0.1-1.4c0.5-0.2,0.9-0.5,1.1-1.2c0.1-0.4,0-0.8-0.2-1C15.6,10.3,16,9.9,16,9.1z"></path>
                                <path d="M3.3,6H0.7C0.3,6,0,6.3,0,6.7v8.5C0,15.7,0.3,16,0.7,16h2.5C3.7,16,4,15.7,4,15.3V6.7C4,6.3,3.7,6,3.3,6z"></path>
                            </svg>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatBox
