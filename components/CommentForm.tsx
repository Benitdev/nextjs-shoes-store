import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'

import { useAppDispatch } from '../redux/hooks'
import { setIsLoading } from '../redux/headerSlice'
import { toast } from 'react-toastify'

const startInput = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const commentTags = [
    'Chất lượng sản phẩm tuyệt vời!',
    'Đóng gói sản phẩm rất đẹp và chắc chắn',
    'Shop phục vụ rất tốt',
    'Rất đáng tiền!',
    'Giao hàng rất nhanh',
]

const CommentForm = ({
    item,
    orderId,
    setShowFormComment,
    setRefetch,
}: any) => {
    const dispatch = useAppDispatch()
    const [numStar, setNumStar] = useState(0)
    const [hoverStar, setHoverStar] = useState(0)
    const [comment, setComment] = useState<string>('')

    const submitHandler = async (e: any) => {
        e.preventDefault()
        try {
            dispatch(setIsLoading(true))
            await axios.post(`/api/products/reviews`, {
                id: item._id,
                rating: numStar / 2,
                comment,
                orderId,
                size: item.size,
            })
            toast.success('Đánh giá thành công!')
            setShowFormComment(false)
            setRefetch((pre: any) => !pre)
            dispatch(setIsLoading(false))
        } catch (err) {
            // enqueueSnackbar(getError(err), { variant: 'error' })
            console.log(err)
        }
    }
    return (
        <div className="min-h-[400px]">
            <div className="flex gap-4 bg-white/80 p-2">
                <div className="relative h-16 w-16 ">
                    <Image
                        src={`/images/products/${item.image}`}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div>
                    <h1 className="font-bold">{item.name}</h1>
                    <p className="text-sm"> Size: {item.size}</p>
                    <span className="text-sm">
                        {' '}
                        Giá:{' '}
                        <span className="font-bold text-pink-900">
                            {item.price.toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                            })}{' '}
                        </span>
                    </span>
                </div>
            </div>
            <form onSubmit={submitHandler} className="space-y-2">
                <div className="mt-4 flex items-center justify-center">
                    {startInput.map((input) => (
                        <div
                            key={input}
                            className="relative flex h-8 w-4 items-center overflow-hidden"
                        >
                            <input
                                type="radio"
                                name="star"
                                value={input}
                                className="h-8 w-4 cursor-pointer appearance-none"
                                onChange={() => setNumStar(input)}
                                onMouseEnter={() => setHoverStar(input)}
                                onMouseLeave={() => setHoverStar(0)}
                            />
                            <FontAwesomeIcon
                                icon={faStar}
                                className={`absolute h-6 w-6 ${
                                    input % 2 == 0 ? 'right-1' : 'left-1'
                                } ${
                                    input <= numStar || input <= hoverStar
                                        ? 'text-pink-700'
                                        : ''
                                } 
                                    pointer-events-none`}
                            />
                        </div>
                    ))}
                </div>
                <div className="flex justify-center gap-4">
                    <button className="border-[1px] border-pink-600 px-4 py-2 capitalize hover:bg-pink-600 hover:text-slate-200">
                        {' '}
                        thêm hình ảnh
                    </button>
                    <button className="border-[1px] border-pink-600 px-4 py-2 capitalize hover:bg-pink-600 hover:text-slate-200">
                        {' '}
                        thêm video
                    </button>
                </div>
                <div className="h-[150px] overflow-y-auto rounded-xl bg-slate-700/40 p-4">
                    <h1 className="text-slate-900 underline underline-offset-1">
                        Bình luận:
                    </h1>
                    <textarea
                        name=""
                        value={comment}
                        cols={30}
                        rows={10}
                        className="h-[80px] w-full bg-transparent indent-3 text-sm font-bold outline-none placeholder:text-slate-700"
                        placeholder="Hãy chia sẻ những điều bạn thích về sản phẩm này nhé!"
                        onChange={(e: any) => setComment(e.target.value)}
                    ></textarea>
                </div>
                <div className="overflow-x-scroll scrollbar-hide">
                    <div className="flex w-max gap-4">
                        {commentTags.map((item, index) => (
                            <span
                                key={index}
                                className="w-30 cursor-pointer rounded-xl bg-slate-400 p-2 text-xs"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
                <button className="mx-auto block rounded-xl bg-pink-600 px-7 py-2 text-sm font-bold hover:text-slate-200">
                    Đánh Giá
                </button>
            </form>
        </div>
    )
}

export default CommentForm
