import React from 'react'
import Link from 'next/link'

import { useAppSelector } from '../redux/hooks'
import { useRouter } from 'next/router'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons'

type Props = {
    category: string
    productPage?: boolean
}
const WallHeader: React.FC<Props> = ({ category, productPage }) => {
    const router = useRouter()
    const { cate, gender, size } = router.query
    const isScroll = useAppSelector((state) => state.headerState.isScroll)
    const headerBlur = useAppSelector((state) => state.headerState.headerBlur)
    return (
        <div
            className={`sticky z-20 px-6 text-slate-200 ${
                isScroll ? '!top-[80px]' : '!top-[140px]'
            } ${headerBlur ? 'bg-black/90 backdrop-blur' : ''}`}
        >
            <div className="flex h-14 items-center justify-between">
                <div className="flex justify-center gap-14">
                    <div className="flex items-center gap-4 font-serif font-bold">
                        <Link href={'/'}>
                            <a> Trang Chủ </a>
                        </Link>
                        <FontAwesomeIcon
                            icon={faAnglesRight}
                            className="h-4 w-4"
                        />
                        <a className="text-sky-300 underline underline-offset-2">
                            {category}
                        </a>
                    </div>
                    <div className="flex items-center gap-4">
                        {cate && (
                            <span className="rounded-xl bg-cyan-600 px-5 py-1 font-bold capitalize tracking-wider text-slate-200">
                                {' '}
                                {cate}
                            </span>
                        )}
                        {gender && (
                            <span className="rounded-xl bg-cyan-600 px-5 py-1 font-bold capitalize tracking-wider text-slate-200">
                                {' '}
                                {gender}
                            </span>
                        )}
                        {size && (
                            <span className="rounded-xl bg-cyan-600 px-5 py-1 font-bold capitalize tracking-wider text-slate-200">
                                {' '}
                                size:
                                {`${size}`.replace('+', ' ')}
                            </span>
                        )}
                    </div>
                </div>
                {productPage && (
                    <div>
                        <p> Hide Filter</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default WallHeader
