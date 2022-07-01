import Image from 'next/image'
import React, { useState } from 'react'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

type Props = {
    isSlideProducts: any
}
const variants = {
    enter: {
        x: -300,
        opacity: 0,
    },
    present: {
        x: 0,
        opacity: 1,
    },
    exit: {
        x: -300,
        opacity: 0,
    },
}
const HomeSlider: React.FC<Props> = ({ isSlideProducts }) => {
    const [currentSlide, setCurrentSlide] = useState<number>(1)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    return (
        <div className="flex h-[calc(100vh-140px)] flex-col justify-between">
            {/* slider  */}
            <div className="flex gap-4 pt-10">
                <AnimatePresence exitBeforeEnter>
                    <motion.div
                        key={currentSlide}
                        className="flex w-[50%] flex-col items-end space-y-8 pt-20"
                        initial="enter"
                        animate="present"
                        exit="exit"
                        transition={{ staggerChildren: 0.1 }}
                    >
                        <motion.h1
                            className="text-5xl tracking-widest text-pink-600 transition-all"
                            variants={variants}
                            transition={{ duration: 0.3, type: 'spring' }}
                        >
                            {' '}
                            {isSlideProducts[currentSlide].name}
                        </motion.h1>
                        <motion.p
                            className="text-3xl capitalize tracking-widest text-red-400"
                            variants={variants}
                            transition={{ duration: 0.3, type: 'spring' }}
                        >
                            {' '}
                            {isSlideProducts[currentSlide].childrenCategory}
                        </motion.p>
                        <motion.p
                            className="text-right indent-4 text-xl text-slate-400"
                            variants={variants}
                            transition={{ duration: 0.3, type: 'spring' }}
                        >
                            {isSlideProducts[currentSlide].description}
                        </motion.p>
                        <motion.button
                            className="!mt-14 h-14 w-60 rounded-md bg-gradient-to-r from-cyan-500 to-sky-500/80 text-xl font-bold text-slate-800 transition hover:!scale-105 hover:text-slate-300"
                            variants={variants}
                            transition={{ duration: 0.3, type: 'spring' }}
                        >
                            <Link
                                href={`products/${isSlideProducts[currentSlide].slug}`}
                            >
                                <a className="flex h-full w-full items-center justify-center">
                                    Mua Ngay{' '}
                                </a>
                            </Link>
                        </motion.button>
                    </motion.div>
                </AnimatePresence>
                <div className="flex w-[50%] items-center justify-center ">
                    <AnimatePresence exitBeforeEnter>
                        <motion.div
                            key={currentSlide}
                            initial={{ x: 300, opacity: 0 }}
                            animate={{
                                y: [-50, 40, -50],
                                x: 0,
                                opacity: 1,
                                scale: 1.3,
                            }}
                            exit={{ x: 300, opacity: 0 }}
                            transition={{
                                y: {
                                    repeat: Infinity,
                                    duration: 2,
                                },
                                default: { duration: 0.5 },
                            }}
                        >
                            <Image
                                src={`/images/products/${isSlideProducts[currentSlide].images[4]}`}
                                width={500}
                                height={500}
                                className="-rotate-[30deg] bg-transparent"
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
            {/* slider control  */}
            <div className="pb-4">
                <div className="mx-auto mt-12 flex w-fit items-center justify-center gap-6 rounded-t-3xl bg-slate-400/10 px-6 py-2 shadow-md shadow-red-400/50">
                    {isSlideProducts.map((product: any, index: any) => (
                        <motion.div
                            key={index}
                            // whileHover={'active'}
                            // variants={variants}
                            className={'group relative cursor-pointer px-2'}
                            onClick={() => {
                                if (!isLoading) {
                                    setCurrentSlide(index)
                                    setIsLoading(true)
                                    setTimeout(() => {
                                        setIsLoading(false)
                                    }, 500)
                                }
                            }}
                        >
                            <div
                                className={`transition duration-300 group-hover:-translate-y-[50%] group-hover:-rotate-[30deg] ${
                                    currentSlide === index
                                        ? '-translate-y-[50%] -rotate-[30deg] scale-125'
                                        : ''
                                }`}
                            >
                                <Image
                                    src={`/images/products/${product.images[4]}`}
                                    width={70}
                                    height={70}
                                    objectFit="cover"
                                />
                            </div>
                            <span
                                className={`absolute bottom-0 left-0 h-1 rounded-xl bg-red-400 transition-all duration-300 group-hover:w-full ${
                                    currentSlide === index ? 'w-full' : 'w-0'
                                }`}
                            ></span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomeSlider
