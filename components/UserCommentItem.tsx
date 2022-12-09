import React from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const startInput = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const UserCommentItem = ({ review }: any) => {
    const avatar = review.image ? review.image : '/images/avatar-default.jpg'
    return (
        <div className="min-h-[100px] rounded-xl bg-slate-700/40 p-2">
            <div className="flex gap-4 text-slate-200">
                <div className="relative h-[100px] w-[100px] overflow-hidden rounded-lg">
                    <Image src={avatar} layout="fill" objectFit="cover" />
                </div>
                <div className="flex flex-1 flex-col justify-between pr-4">
                    <div>
                        <h2 className="flex justify-between">
                            <span>{review.name}</span>
                            <div className="flex items-center">
                                {startInput.map((input) => (
                                    <div
                                        key={input}
                                        className="relative flex h-7 w-3 items-center overflow-hidden"
                                    >
                                        <input
                                            type="radio"
                                            name="star"
                                            value={input}
                                            className="h-7 w-3 cursor-pointer appearance-none"
                                            /*     onChange={() => setNumStar(input)}
                                    onMouseEnter={() => setHoverStar(input)}
                                    onMouseLeave={() => setHoverStar(0)} */
                                        />
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            className={`absolute h-4 w-4 ${
                                                input % 2 == 0
                                                    ? 'right-1'
                                                    : 'left-1'
                                            } ${
                                                input <= review.rating * 2
                                                    ? 'text-shop-orange'
                                                    : 'text-slate-500'
                                            } 
                                    pointer-events-none`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </h2>
                        <p className="indent-2 text-sm text-slate-100">
                            {review.comment}
                        </p>
                    </div>
                    <p className="text-right text-sm font-bold text-slate-400">
                        {' '}
                        Ngày tạo:{' '}
                        <span>
                            {new Date(review.createdAt).toLocaleString('en-US')}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default UserCommentItem
