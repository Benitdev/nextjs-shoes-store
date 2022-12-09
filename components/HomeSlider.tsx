import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import { motion, AnimatePresence } from 'framer-motion'
import { SocialIcon } from 'react-social-icons'

import Link from 'next/link'

import { socket } from '../pages/_app'

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
    useEffect(() => {
        socket.on('ahihi', (data) => {
            console.log(data)
        })
    }, [])

    const [currentSlide, setCurrentSlide] = useState<number>(1)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    return (
        <div className="flex h-[calc(100vh-156px)] flex-col justify-between ">
            {/* slider  */}
            <div className="relative flex flex-1 gap-4 pt-10">
                <div className="absolute top-0 left-0 bottom-0 flex w-2 flex-col items-center justify-between">
                    <div className="h-[35%] w-1 rounded-full bg-slate-400"></div>
                    <div>
                        <SocialIcon
                            url="https://www.facebook.com/neihtben"
                            fgColor="#e0ccbb"
                            bgColor="transparent"
                            className="rounded-lg hover:bg-white/40"
                        />
                        <SocialIcon
                            url="https://twitter.com/neihtben"
                            fgColor="#e0ccbb"
                            bgColor="transparent"
                            className="rounded-lg hover:bg-white/40"
                        />
                        <SocialIcon
                            url="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox"
                            fgColor="#e0ccbb"
                            bgColor="transparent"
                            className="rounded-lg hover:bg-white/40"
                        />
                    </div>
                    <div className="h-2/5 w-1 rounded-full bg-slate-400"></div>
                </div>
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
                            className="bg-gradient-primary bg-clip-text text-right text-5xl font-bold tracking-widest text-transparent transition-all"
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
                            className="text-right indent-4 text-xl text-slate-100"
                            variants={variants}
                            transition={{ duration: 0.3, type: 'spring' }}
                        >
                            {isSlideProducts[currentSlide].description}
                        </motion.p>
                        <motion.button
                            className="relative !mt-14 text-xl  text-slate-800"
                            variants={variants}
                            transition={{ duration: 0.3, type: 'spring' }}
                        >
                            {/* 
                            <span className="block h-14 w-60 rounded-lg bg-gradient-to-r from-cyan-500 to-sky-500/80"></span>
                            <span className="absolute top-1/2 left-1/2 h-[60%] w-[120%] -translate-x-1/2 -translate-y-1/2 bg-transparent"></span>
                            <span className="absolute top-1/2 left-1/2 h-[calc(100%-6px)] w-[calc(100%-6px)] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-black"></span>
                            <span className="absolute top-1/2 left-1/2 flex h-[calc(100%-20px)] w-[calc(100%-20px)] -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-gradient-to-r from-cyan-500 to-sky-500/80"> */}
                            <Link
                                href={`/products/${isSlideProducts[currentSlide].slug}`}
                            >
                                <a className="bg-gradient-primary button-effect flex h-14 w-60 items-center justify-center  rounded-lg text-xl font-bold text-gray-900">
                                    Mua Ngay{' '}
                                </a>
                            </Link>
                            {/* </span> */}
                        </motion.button>
                    </motion.div>
                </AnimatePresence>
                <div className="relative flex w-[50%] items-center justify-center">
                    <AnimatePresence exitBeforeEnter>
                        <motion.div
                            key={currentSlide}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                opacity: 1,
                                scale: [1, 1.3, 1],
                            }}
                            exit={{ opacity: 0 }}
                            transition={{
                                scale: {
                                    repeat: Infinity,
                                    duration: 2,
                                    // delay: 1,
                                },
                            }}
                            className="absolute h-[300px] w-[300px] rounded-full bg-yellow-400/50 blur-[80px] lg:h-[400px] lg:w-[400px]"
                        ></motion.div>
                    </AnimatePresence>
                    <div className="absolute inset-0 flex justify-center overflow-hidden">
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
            </div>
            {/* slider control  */}
            <div className="">
                <div className="mx-auto mt-12 flex w-fit items-center justify-center gap-6 rounded-t-3xl bg-slate-400/10 px-6 py-4 shadow-md shadow-shop-orange/50">
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
                                className={`absolute bottom-0 left-0 h-1 rounded-xl bg-shop-orange transition-all duration-300 group-hover:w-full ${
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
