import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import Link from 'next/link'
import queryString from 'query-string'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faChevronDown } from '@fortawesome/free-solid-svg-icons'

const categories = [
    'sneaker',
    'life style',
    'jordan',
    'running',
    'football',
    'training & gym',
]

const sizes = [
    25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43,
    44, 45,
]
const FilterBar = ({ category: cate }: any) => {
    const router = useRouter()
    const { query } = router
    const [genderPopup, setGenderPopup] = useState<boolean>(true)
    const [sizePopup, setSizePopup] = useState<boolean>(true)
    return (
        <div className="scroll scrollbar-track-rounded sticky top-[188px] col-span-2 h-[calc(100vh-188px)] overflow-y-auto overflow-x-hidden pb-8 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
            <div className="space-y-4 border-l-[1px] border-slate-50/10 px-4 text-slate-300">
                <ul className="border-b-[1px] border-slate-50/10">
                    {categories.map((category, index) => (
                        <Link
                            href={`/${cate}?${queryString.stringify(
                                {
                                    ...query,
                                    cate:
                                        query.cate !== category
                                            ? category
                                            : null,
                                    category: null,
                                },
                                { skipNull: true }
                            )}`}
                            key={index}
                        >
                            <motion.li
                                className={`cursor-pointer rounded-full py-4 capitalize hover:text-sky-400 ${
                                    query.cate === category
                                        ? '!translate-x-[10px] text-sky-400'
                                        : ''
                                }`}
                                whileHover={{ x: 10 }}
                            >
                                {category}
                            </motion.li>
                        </Link>
                    ))}
                </ul>
                {/* gender filter  */}
                <div>
                    <p
                        className="flex cursor-pointer justify-between px-2 hover:text-sky-400"
                        onClick={() => setGenderPopup(!genderPopup)}
                    >
                        {' '}
                        Gender
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className={`h-4 w-4 ${
                                !genderPopup ? 'rotate-180' : ''
                            } transition`}
                        />
                    </p>
                    <div
                        className={`mt-4 flex flex-col gap-2 overflow-hidden px-4 transition-all duration-200 ${
                            genderPopup ? 'max-h-32' : 'max-h-0'
                        }`}
                    >
                        <div className="flex">
                            <div className="relative mt-[2px] h-4">
                                <input
                                    type="radio"
                                    value="men"
                                    id="gender1"
                                    name="gender"
                                    className="peer h-4 w-4 cursor-pointer appearance-none rounded-sm bg-slate-200"
                                    checked={query.gender === 'men'}
                                    onChange={() =>
                                        router.replace(
                                            `/${cate}?${queryString.stringify(
                                                {
                                                    ...query,
                                                    gender:
                                                        query.gender !== 'men'
                                                            ? 'men'
                                                            : null,
                                                    category: null,
                                                },
                                                { skipNull: true }
                                            )}`
                                        )
                                    }
                                />
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className="absolute -top-[7px] -left-[5px] h-7 w-7 scale-0 text-sky-600 transition peer-checked:scale-90"
                                />
                            </div>
                            <label
                                className="ml-2 cursor-pointer peer-checked:font-bold"
                                htmlFor="gender1"
                            >
                                Men
                            </label>
                        </div>
                        <div className="flex">
                            <div className="relative mt-[2px] h-4">
                                <input
                                    type="radio"
                                    value="women"
                                    id="gender2"
                                    name="gender"
                                    className="peer h-4 w-4 cursor-pointer appearance-none rounded-sm bg-slate-200"
                                    checked={query.gender === 'women'}
                                    onChange={() =>
                                        router.replace(
                                            `/${cate}?${queryString.stringify(
                                                {
                                                    ...query,
                                                    gender:
                                                        query.gender !== 'women'
                                                            ? 'women'
                                                            : null,
                                                    category: null,
                                                },
                                                { skipNull: true }
                                            )}`
                                        )
                                    }
                                />
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className="absolute -top-[7px] -left-[5px] h-7 w-7 scale-0 text-sky-600 transition peer-checked:scale-90"
                                />
                            </div>
                            <label
                                className="ml-2 cursor-pointer peer-checked:font-bold"
                                htmlFor="gender2"
                            >
                                Women
                            </label>
                        </div>
                        <div className="flex">
                            <div className="relative mt-[2px] h-4">
                                <input
                                    type="radio"
                                    value="kid"
                                    name="gender"
                                    id="gender3"
                                    className="peer h-4 w-4 cursor-pointer appearance-none rounded-sm bg-slate-200"
                                    checked={query.gender === 'kid'}
                                    onChange={() =>
                                        router.replace(
                                            `/${cate}?${queryString.stringify(
                                                {
                                                    ...query,
                                                    gender:
                                                        query.gender !== 'kid'
                                                            ? 'kid'
                                                            : null,
                                                    category: null,
                                                },
                                                { skipNull: true }
                                            )}`
                                        )
                                    }
                                />
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className="absolute -top-[7px] -left-[5px] h-7 w-7 scale-0 text-sky-600 transition peer-checked:scale-90"
                                />
                            </div>
                            <label
                                className="ml-2 cursor-pointer peer-checked:font-bold"
                                htmlFor="gender3"
                            >
                                Kid
                            </label>
                        </div>
                    </div>
                </div>
                {/* size filer  */}
                <div>
                    <p
                        className="flex cursor-pointer justify-between px-2 hover:text-sky-400"
                        onClick={() => setSizePopup(!sizePopup)}
                    >
                        {' '}
                        Size
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className={`h-4 w-4 ${
                                !sizePopup ? 'rotate-180' : ''
                            } transition`}
                        />
                    </p>
                    <div
                        className={`mt-4 flex flex-col gap-2 overflow-hidden px-4 transition-all duration-200 ${
                            sizePopup ? 'max-h-64' : 'max-h-0'
                        }`}
                    >
                        <div className="grid grid-cols-3 gap-2">
                            {sizes.map((size: number) => (
                                <button
                                    className={`rounded-lg border-[1px] border-slate-400 hover:bg-sky-500/70 hover:text-slate-200 ${
                                        query.size?.includes(size + '')
                                            ? 'bg-sky-600/80 text-slate-200'
                                            : ''
                                    }`}
                                    key={size}
                                    onClick={() => {
                                        let setSize = `${
                                            query.size || ''
                                        }+${size}`
                                        if (query.size?.includes(size + '')) {
                                            setSize = `${query.size}`.replace(
                                                '+' + size + '',
                                                ''
                                            )
                                        }

                                        router.replace(
                                            `/${cate}?${queryString.stringify(
                                                {
                                                    ...query,
                                                    size: setSize || null,
                                                    category: null,
                                                },
                                                { skipNull: true }
                                            )}`
                                        )
                                    }}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterBar
