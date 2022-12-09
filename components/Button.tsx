import React from 'react'

const Button = ({ text, onClick }: any) => {
    return (
        <button
            className="button-effect rounded-2xl bg-slate-500/50 px-6 py-2 shadow-xl hover:bg-slate-700 "
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export default Button
