import React, { ReactChild, useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import { AnimatePresence } from 'framer-motion'
import HomeHeader from './HomeHeader'
import SignIn from './SignIn'

import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { setIsLoading } from '../redux/headerSlice'

import Loading from './Loading'
import { PropagateLoader } from 'react-spinners'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'react-toastify/dist/ReactToastify.css'

type Props = {
    title: string
}

const override = css`
    display: block;
    margin: 0 auto;
`

const DefaultLayout: React.FC<Props> = ({ title, children }) => {
    const loading = useAppSelector((state) => state.headerState.isLoading)
    const toggleLogin = useAppSelector((state) => state.headerState.toggleLogin)
    const useDispatch = useAppDispatch()
    const router = useRouter()
    useEffect(() => {
        let oldPathname = router.asPath.split('?')[0]
        const handleRouterChangeStart = (url: any) => {
            if (oldPathname !== url.split('?')[0]) {
                oldPathname = url.split('?')[0]
                useDispatch(setIsLoading(true))
            }
        }
        const handleRouterComplete = () => {
            useDispatch(setIsLoading(false))
        }
        router.events.on('routeChangeStart', handleRouterChangeStart)
        router.events.on('routeChangeComplete', handleRouterComplete)

        return () => {
            router.events.off('routeChangeStart', handleRouterChangeStart)
            router.events.off('routeChangeComplete', handleRouterComplete)
        }
    }, [])
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-between bg-black">
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <HomeHeader />
            <main className="container z-10 min-h-screen space-y-28 pb-28">
                {children}
            </main>
            {/*        <main className="container z-10 min-h-screen">{children}</main>
            <main className="container z-10 min-h-screen">{children}</main>
            <main className="container z-10 min-h-screen">{children}</main> */}

            <footer className="z-10 w-full border-t bg-slate-900/20 p-4 py-8 pb-0 text-slate-200">
                <div className="container mx-auto grid grid-cols-10 px-4">
                    <div className="col-span-2">
                        <h1 className="font-bold"> FIND A STORE </h1>
                        <div className="mt-6 space-y-2 text-sm font-bold">
                            <p>BECOME A MEMBER</p>
                            <p>SIGN UP FOR EMAIL</p>
                            <p>SEND US FEEDBACK</p>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <h1 className="font-bold"> GET HELP </h1>
                        <div className="mt-6 space-y-2 text-sm text-slate-300">
                            <p>Order Status</p>
                            <p>Delivery</p>
                            <p>Returns</p>
                            <p>Payment Options</p>
                            <p>Contact us</p>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <h1 className="font-bold"> ABOUT BQ STORE </h1>
                        <div className="mt-6 space-y-2 text-sm text-slate-300">
                            <p>News</p>
                            <p>Men</p>
                            <p>Women</p>
                            <p>Kid</p>
                            <p>Sales</p>
                        </div>
                    </div>
                    <div className="col-span-4 flex justify-end gap-4">
                        <div className="h-6 w-6 text-slate-200">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                fill="currentColor"
                            >
                                <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                            </svg>
                        </div>
                        <div className="h-6 w-6 text-slate-200">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                fill="currentColor"
                            >
                                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                            </svg>
                        </div>
                        <div className="h-6 w-6 text-slate-200">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512"
                                fill="currentColor"
                            >
                                <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                            </svg>
                        </div>
                        <div className="h-6 w-6 text-slate-200">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                                fill="currentColor"
                            >
                                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="text-bold container py-2 text-center text-sm text-slate-400">
                    © 2022 Nike, Inc. All Rights Reserved
                </div>
            </footer>
            {/* <div className="fixed inset-0 bg-black"></div> */}
            <div className="fixed top-[15%] left-11 h-48 w-[50rem] -rotate-45 bg-sky-900/80 bg-gradient-to-tr blur-[200px]"></div>
            <div className="fixed top-[10%] right-[5%] h-[500px] w-[500px] bg-purple-400/30 blur-[100px]"></div>
            <div className="fixed bottom-[10%] left-[30%] h-80 w-80 bg-red-500/40 blur-[100px]"></div>
            <AnimatePresence>{toggleLogin && <SignIn />}</AnimatePresence>
            {loading && (
                <Loading>
                    <PropagateLoader
                        color={'#042E31'}
                        loading={loading}
                        css={override}
                        size={30}
                    />
                </Loading>
            )}
            <ToastContainer />
        </div>
    )
}

export default DefaultLayout
