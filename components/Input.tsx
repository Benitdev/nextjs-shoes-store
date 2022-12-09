import React from 'react'

type Props = {
    label?: string
    name?: string
    register?: any
    type?: string
}
const Input: React.FC<Props> = ({ register, label, name, type }) => {
    return (
        <div className="relative">
            <input
                {...register}
                className={`peer w-full border-b-2 border-b-gray-400 bg-transparent p-1 text-sm text-shop-orange placeholder-transparent focus:border-b-shop-orange focus:outline-none`}
                placeholder="Email or Phone"
                type={type}
            />
            <label
                htmlFor={name}
                className="pointer-events-none absolute left-0 -top-3.5 text-sm font-bold text-shop-orange transition-all peer-placeholder-shown:top-2
                        peer-placeholder-shown:left-[8px] peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-400"
            >
                {label}
            </label>
        </div>
    )
}

export default Input
