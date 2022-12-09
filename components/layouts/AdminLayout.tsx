import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import { AnimatePresence } from 'framer-motion'
import HomeHeader from '../HomeHeader'
import SignIn from '../auth/SignIn'

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import {
    setIsLoading,
    setToggleLogin,
    setToggleChatBox,
} from '../../redux/headerSlice'

import Loading from '../common/Loading'
import { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import ChatBox from '../ChatBox'
import Nav from '../admin/Nav'
import AdminHeader from '../admin/AdminHeader'

type Props = {
    title: string
}

const AdminLayout: React.FC<Props> = ({ title, children }) => {
    const loading = useAppSelector((state) => state.headerState.isLoading)
    const toggleLogin = useAppSelector((state) => state.headerState.toggleLogin)
    const toggleChatBox = useAppSelector(
        (state) => state.headerState.toggleChatBox
    )
    const dispatch = useAppDispatch()
    const router = useRouter()
    const { error, pathname, query } = router.query
    console.log({ toggleChatBox })
    useEffect(() => {
        if (error) {
            dispatch(setToggleLogin(true))
        }
        console.log({ error })
    }, [])

    if (error) {
        console.log(error)
        router.query.something = []
        // dispatch(setToggleLogin(true))
        console.log(toggleLogin)
    }
    useEffect(() => {
        let oldPathname = router.asPath.split('?')[0]
        const handleRouterChangeStart = (url: any) => {
            if (oldPathname !== url.split('?')[0]) {
                oldPathname = url.split('?')[0]
                dispatch(setIsLoading(true))
            }
        }
        const handleRouterComplete = () => {
            dispatch(setIsLoading(false))
        }
        router.events.on('routeChangeStart', handleRouterChangeStart)
        router.events.on('routeChangeComplete', handleRouterComplete)

        return () => {
            router.events.off('routeChangeStart', handleRouterChangeStart)
            router.events.off('routeChangeComplete', handleRouterComplete)
        }
    }, [])
    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-between  bg-shop-accents">
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="z-10 flex min-h-screen w-full">
                <Nav />
                <div className="flex-1">
                    <AdminHeader />
                    {children}
                </div>
            </main>
            {/*        <main className="container z-10 min-h-screen">{children}</main>
            <main className="container z-10 min-h-screen">{children}</main>
            <main className="container z-10 min-h-screen">{children}</main> */}

            {/* <div className="fixed inset-0 bg-black"></div> */}
            {/*  <div className="fixed top-[15%] left-11 h-48 w-[50rem] -rotate-45 bg-sky-900/80 bg-gradient-to-tr blur-[60px]"></div>
            <div className="fixed top-[10%] right-[5%] h-[500px] w-[500px] bg-purple-400/30 blur-[100px]"></div>
            <div className="fixed bottom-[10%] left-[30%] h-80 w-80 bg-red-500/40 blur-[100px]"></div> */}
            <div className="fixed top-[15%] left-11 h-48 w-[50rem] -rotate-45 bg-shop-orange/20 bg-gradient-to-tr blur-[150px]"></div>
            {loading && <Loading />}
            <ToastContainer />
            {/*  <div
                className={`fixed bottom-8 right-8 z-[99] transition-all ${
                    !toggleChatBox
                        ? 'h-12 w-12 cursor-pointer rounded-full bg-sky-500/60 '
                        : 'h-[400px] w-[300px] overflow-hidden rounded-2xl'
                }`}
                onClick={() => dispatch(setToggleChatBox(true))}
            >
                {toggleChatBox && <ChatBox />}
            </div> */}
        </div>
    )
}

export default AdminLayout
