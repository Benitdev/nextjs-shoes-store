import React from 'react'

const Loading = ({ children }: any) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center bg-slate-900/50">
            {children}
        </div>
    )
}

export default Loading
