import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faHeart, faStar } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'

import { useAppDispatch } from '../redux/hooks'
import { cartAddItem } from '../redux/cartSlice'
import { Product } from '../utils/typings'

type Props = {
    product: Product
}

const startInput = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const ProductInfo: React.FC<Props> = ({ product }) => {
    /*    const [numStar, setNumStar] = useState(0)
    const [hoverStar, setHoverStar] = useState(0) */
    let numStar = product.reviews
        .reduce(
            (numStar: number, review: any) =>
                numStar + review.rating / product.reviews.length,
            0
        )
        .toFixed(1)
    const dispatch = useAppDispatch()
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()
    const [quantity, setQuantity] = useState<number>(1)
    const size = watch('size')
    const countInStock = product.countInStock.find((item) => item.size == size)
    const handleCartAddItem = ({ size }: any) => {
        const {
            _id,
            name,
            slug,
            category,
            childrenCategory,
            imageDefault,
            countInStock,
            price,
            rating,
        } = product
        dispatch(
            cartAddItem({
                _id,
                name,
                slug,
                category,
                childrenCategory,
                imageDefault,
                countInStock,
                price,
                rating,
                size,
                quantity,
                isChecked: true,
            })
        )
        toast.success('Thêm vào giỏ hàng thành công !')
        reset()
        setQuantity(1)
    }
    return (
        <div className="flex-1">
            <form
                className="mx-auto space-y-4 text-slate-200 xl:w-4/5"
                onSubmit={handleSubmit(handleCartAddItem)}
            >
                <div>
                    <h1 className="pb-1 text-3xl font-bold">
                        {' '}
                        {product.name}{' '}
                    </h1>
                    <div className="flex items-center gap-2">
                        <span className="font-sans text-xl font-bold text-pink-600 underline underline-offset-1">
                            {numStar}
                        </span>
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
                                        className="h-8 w-4 appearance-none"
                                        /*     onChange={() => setNumStar(input)}
                                    onMouseEnter={() => setHoverStar(input)}
                                    onMouseLeave={() => setHoverStar(0)} */
                                    />
                                    <FontAwesomeIcon
                                        icon={faStar}
                                        className={`absolute h-6 w-6 ${
                                            input % 2 == 0
                                                ? 'right-1'
                                                : 'left-1'
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
                        <div className="h-7 w-[1px] bg-slate-400"></div>
                        <div className="flex items-center gap-2">
                            <span className="font-sans text-xl">
                                {product.reviews.length}
                            </span>
                            <span className="text-sm text-slate-400">
                                {' '}
                                Đánh Giá{' '}
                            </span>
                        </div>
                    </div>
                    <h2 className="flex justify-between py-2 pr-10 text-xl capitalize">
                        <p className="font-serif text-red-400">
                            {' '}
                            {product.childrenCategory}
                        </p>
                        <p className="font-bold text-pink-600">
                            {' '}
                            {product.category}'s shoes
                        </p>
                    </h2>
                </div>
                <p className="font-sans text-3xl font-extrabold">
                    {product.price.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                    })}
                </p>
                <div>
                    <p> Vui lòng chọn size: </p>
                    <div className="mt-4 grid grid-cols-8 gap-3 px-8">
                        {product.countInStock.map(({ size, count }, index) => (
                            <div key={index} className="relative">
                                <input
                                    {...register('size', {
                                        required: true,
                                    })}
                                    type="radio"
                                    className={`peer h-10 w-10 appearance-none ${
                                        count !== 0
                                            ? 'cursor-pointer'
                                            : 'cursor-not-allowed'
                                    }`}
                                    value={size}
                                    required
                                    disabled={count === 0}
                                />
                                <div
                                    className={`pointer-events-none absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-xl border-[1px] border-slate-400 transition-all duration-150  ${
                                        count !== 0
                                            ? 'peer-checked:bg-slate-100 peer-checked:text-slate-900 peer-hover:bg-slate-300 peer-hover:text-slate-900'
                                            : 'opacity-40'
                                    }`}
                                >
                                    <label htmlFor="size">{size}</label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex space-x-2">
                    <p> Chọn số lượng: </p>
                    <input
                        value={quantity}
                        type="number"
                        className="w-16 rounded-lg border-[1px] border-slate-200 bg-transparent px-2 text-slate-200 outline-none"
                        onChange={(e) => {
                            if (
                                e.target.value > '0' &&
                                e.target.value &&
                                !e.target.value.startsWith('0') &&
                                +e.target.value <= countInStock!.count
                            ) {
                                setQuantity(+e.target.value)
                            } else setQuantity(1)
                            if (+e.target.value > countInStock!.count)
                                toast.error('Số lượng trong kho không đủ!!!')
                        }}
                    />
                </div>
                <button
                    type="submit"
                    className="mx-auto flex items-center space-x-3 rounded-full bg-sky-500/70 px-6 py-4 text-xl font-bold capitalize leading-none shadow-md shadow-sky-400 hover:text-slate-900"
                >
                    {' '}
                    <span>thêm vào giỏ hàng</span>
                    <FontAwesomeIcon icon={faCartPlus} className="h-6 w-6" />
                </button>
                <button
                    type="submit"
                    className="mx-auto flex w-[274px] items-center justify-center space-x-3 rounded-full  bg-pink-500/70 py-4 text-xl font-bold capitalize leading-none shadow-md shadow-pink-400 hover:text-slate-900"
                >
                    {' '}
                    <span>yêu thích</span>
                    <FontAwesomeIcon icon={faHeart} className="h-6 w-6" />
                </button>
            </form>
        </div>
    )
}

export default ProductInfo
