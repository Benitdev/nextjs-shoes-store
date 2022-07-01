import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, animate } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

import { getProviders, signIn } from 'next-auth/react'
import { setToggleLogin } from '../redux/headerSlice'
import { useAppDispatch } from '../redux/hooks'

import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const container = {
    hidden: {
        opacity: 0,
        transition: {
            afterChildren: 0.3,
        },
    },
    show: {
        opacity: 1,
        transition: {
            delayChildren: 0.3,
        },
    },
}

const children = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
}
const SignIn = () => {
    const [showLoginForm, setShowLoginForm] = useState<boolean>(true)

    const [providers, setProviders] = useState<any>()
    useEffect(() => {
        getProviders().then((providers) => setProviders(providers))
    }, [])

    const dispatch = useAppDispatch()
    return (
        <motion.div
            initial={'hidden'}
            animate={'show'}
            exit={'hidden'}
            variants={container}
            className="fixed inset-0 z-50 flex items-center bg-black/70"
        >
            <motion.div
                variants={children}
                className="relative mx-auto flex min-h-[500px] w-[400px] flex-col overflow-hidden rounded-xl bg-slate-200 shadow-xl md:w-[500px]"
            >
                <div className="flex items-center justify-center py-4">
                    <button
                        className="relative py-2 px-4 font-bold"
                        onClick={() => setShowLoginForm(true)}
                    >
                        {' '}
                        Đăng Nhập{' '}
                        <AnimatePresence>
                            {showLoginForm && (
                                <motion.span
                                    className="absolute bottom-0 right-0 h-2 rounded-full bg-slate-800"
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    exit={{ width: 0 }}
                                    transition={{
                                        ease: 'linear',
                                    }}
                                ></motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                    <hr className="h-8 w-[1px] bg-slate-800" />
                    <button
                        className="relative py-2 px-4 font-bold"
                        onClick={() => setShowLoginForm(false)}
                    >
                        {' '}
                        Đăng Ký
                        <AnimatePresence>
                            {!showLoginForm && (
                                <motion.span
                                    className="absolute bottom-0 left-0 h-2 rounded-full bg-slate-800"
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    exit={{ width: 0 }}
                                    transition={{
                                        ease: 'linear',
                                    }}
                                ></motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
                {/* main */}
                <div className="flex flex-1 flex-col justify-between pb-8">
                    {/* signin with credential */}
                    {showLoginForm ? (
                        <>
                            <LoginForm />
                            {/* signin with social */}
                            <div className="flex flex-col items-center gap-4">
                                <button
                                    className="h-14 w-40 rounded-xl bg-sky-600"
                                    onClick={(_) =>
                                        signIn(providers?.facebook.id)
                                    }
                                >
                                    {providers?.facebook.name}
                                </button>
                                <button
                                    className="h-14 w-40 rounded-xl bg-pink-600"
                                    onClick={(_) =>
                                        signIn(providers?.google.id)
                                    }
                                >
                                    {providers?.google.name}
                                </button>
                            </div>
                        </>
                    ) : (
                        <RegisterForm />
                    )}
                </div>
                {/* end main  */}
                <button
                    className="absolute top-0 right-0 p-1"
                    onClick={() => dispatch(setToggleLogin(false))}
                >
                    <FontAwesomeIcon icon={faClose} className="h-8 w-8" />
                </button>
            </motion.div>
        </motion.div>
    )
}

export default SignIn
