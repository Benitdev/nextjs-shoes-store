import React from 'react'

const ChatBoxMessage = ({
    text,
    own,
    someBeforeMsgSender,
    someAfterMsgSender,
}: any) => {
    let roundedTop, roundedBottom
    if (own) {
        roundedTop = 'rounded-tr-none'
        roundedBottom = 'rounded-br-none'
    } else {
        roundedTop = 'rounded-tl-none'
        roundedBottom = 'rounded-bl-none'
    }
    return (
        <div className={`flex ${own ? 'justify-end' : ''}`}>
            <div
                className={`w-fit rounded-2xl bg-slate-200 px-3 py-1 ${
                    someBeforeMsgSender ? roundedTop : ''
                } ${someAfterMsgSender ? roundedBottom : ''}`}
            >
                {text}
            </div>
        </div>
    )
}

export default ChatBoxMessage
