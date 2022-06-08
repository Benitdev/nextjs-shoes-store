import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

import type { Product } from '../utils/typings'
import UserCommentItem from './UserCommentItem'

type Props = {
    product: Product
}

const startInput = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const btnCate = [
    'tất cả',
    '5 sao',
    '4 sao',
    '3 sao',
    '2 sao',
    '1 sao',
    'có bình luận',
    'có hình ảnh / video',
]

const ProductReviews: React.FC<Props> = ({ product }) => {
    const [btnCategory, setBtnCategory] = useState(0)
    const [reviews, setReviews] = useState([])
    const numStar = product.reviews
        .reduce(
            (numStar: number, review: any) =>
                numStar + review.rating / product.reviews.length,
            0
        )
        .toFixed(1)

    useEffect(() => {
        const fetchReviews = async () => {
            const { data } = await axios.get('/api/products/reviews', {
                params: {
                    id: product._id,
                },
            })
            setReviews(data)
        }
        fetchReviews()
    }, [])

    return (
        <div className="mx-16 max-h-[1000px] w-[600px] space-y-4 overflow-y-auto rounded-xl bg-slate-700/40 p-7 lg:w-[800px] xl:w-[1000px]">
            <h1 className="text-xl font-bold capitalize tracking-widest text-slate-200 underline underline-offset-2">
                đánh giá sản phẩm
            </h1>
            <div className="flex h-[150px] items-center rounded-xl bg-red-300/20 p-6">
                <div className="font-bold text-pink-700">
                    <p className="text-center text-2xl">{numStar} Trên 5 </p>
                    <div className="flex items-center">
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
                                    /*     onChange={() => setNumStar(input)}
                                    onMouseEnter={() => setHoverStar(input)}
                                    onMouseLeave={() => setHoverStar(0)} */
                                />
                                <FontAwesomeIcon
                                    icon={faStar}
                                    className={`absolute h-6 w-6 ${
                                        input % 2 == 0 ? 'right-1' : 'left-1'
                                    } ${
                                        input <= numStar * 2
                                            ? ''
                                            : 'text-slate-900'
                                    } 
                                    pointer-events-none`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="ml-6 flex h-full flex-wrap items-center gap-4">
                    {btnCate.map((btn, index) => (
                        <button
                            key={index}
                            className={`h-8 border-[1px] px-3 text-sm font-bold capitalize text-slate-200 ${
                                index === btnCategory ? 'bg-pink-700' : ''
                            } transition duration-150 hover:bg-pink-700`}
                            onClick={() => setBtnCategory(index)}
                        >
                            {' '}
                            {btn}
                            <span className="text-slate-400"> (0)</span>
                        </button>
                    ))}
                </div>
            </div>
            <div className="space-y-2">
                {reviews.map((review: any, index: number) => {
                    if (btnCategory === 0)
                        return <UserCommentItem review={review} key={index} />
                    if (5 - Math.floor(review.rating) + 1 == btnCategory)
                        return <UserCommentItem review={review} key={index} />
                })}
            </div>
        </div>
    )
}

export default ProductReviews
