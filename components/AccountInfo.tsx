import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import UserInfoForm from './UserInfoForm'
import UserOrder from './UserOrder'

const accountCategory = [
    'thông tin cá nhân',
    'đơn hàng',
    'danh mực yêu thích',
    'thoát',
]
const AccountInfo = () => {
    const [activeCate, setActiveCate] = useState<number>(0)
    const underlineRef = useRef<HTMLSpanElement>(null)
    const refArray = [1, 2, 3, 4, 5].map((item) =>
        useRef<HTMLButtonElement>(null)
    )
    useEffect(() => {
        underlineRef.current!.style.left = `${refArray[activeCate].current?.offsetLeft}px`
        underlineRef.current!.style.width = `${refArray[activeCate].current?.offsetWidth}px`
    }, [activeCate])
    return (
        <div className="flex-1">
            <div className="relative flex justify-center">
                {accountCategory.map((category, index) => (
                    <button
                        key={index}
                        ref={refArray[index]}
                        className={`relative block px-4 py-2 font-serif text-sm font-bold uppercase  hover:text-shop-orange ${
                            activeCate === index
                                ? 'text-shop-orange '
                                : 'text-slate-200'
                        }`}
                        onClick={() => setActiveCate(index)}
                    >
                        {category}
                    </button>
                ))}
                <span
                    ref={underlineRef}
                    className={`absolute bottom-0 left-0 h-[6px] w-full rounded-full bg-shop-orange  transition-all duration-200`}
                ></span>
            </div>
            {activeCate === 0 && <UserInfoForm />}
            {activeCate === 1 && <UserOrder />}
        </div>
    )
}

export default AccountInfo
