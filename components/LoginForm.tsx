import { signIn } from 'next-auth/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useAppDispatch } from '../redux/hooks'
import { setIsLoading } from '../redux/headerSlice'
const LoginForm = () => {
    const router = useRouter()
    const useDispatch = useAppDispatch()
    const [emailErr, setEmailErr] = useState('')
    const [passErr, setPassErr] = useState('')
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const [email, password] = watch(['username', 'password'])
    const onSubmit = async (data: any) => {
        useDispatch(setIsLoading(true))
        const res = await signIn('credentials', {
            redirect: false,
            ...data,
        })
        if (res?.['error'] === 'Email does not exist!!!') {
            setEmailErr('Email không tồn tại!')
            setTimeout(() => {
                setEmailErr('')
            }, 3000)
        } else if (res?.['error'] === 'Password incorrect!') {
            setPassErr('Mật khẩu không đúng!')
            setTimeout(() => {
                setPassErr('')
            }, 3000)
        } else {
            router.reload()
        }

        useDispatch(setIsLoading(false))
    }
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-4 py-6"
        >
            <div className="w-[300px]">
                <div className="relative flex justify-between">
                    <input
                        {...register('email', {
                            required: true,
                            maxLength: 40,
                            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                        })}
                        className={`peer w-full border-b-2 border-b-gray-400 bg-transparent p-2 text-sm placeholder-transparent focus:border-4 focus:border-b-slate-900 focus:outline-none`}
                        placeholder="Email or Phone"
                    />
                    <label
                        htmlFor="email"
                        className="pointer-events-none absolute left-0 -top-3.5 text-sm font-bold transition-all peer-placeholder-shown:top-3
                        peer-placeholder-shown:left-[11px] peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-400"
                    >
                        Email or Phone
                    </label>
                </div>
                {errors.email?.type === 'required' && (
                    <small className="text-red-600">
                        {' '}
                        Tên đăng nhập là bắt buộc!
                    </small>
                )}
                {errors.email?.type === 'pattern' && (
                    <small className="text-red-600"> Email không hợp lệ!</small>
                )}
                {emailErr && (
                    <small className="text-red-600"> {emailErr} </small>
                )}
            </div>
            <div className="w-[300px]">
                <div className="relative flex justify-between">
                    <input
                        {...register('password', {
                            required: true,
                            minLength: 6,
                            maxLength: 40,
                        })}
                        className={`peer w-full border-b-2 border-b-gray-400 bg-transparent p-2 text-sm placeholder-transparent focus:border-4 focus:border-b-slate-900 focus:outline-none`}
                        placeholder="Password"
                        type="password"
                    />
                    <label
                        htmlFor="password"
                        className="pointer-events-none absolute left-0 -top-3.5 text-sm font-bold transition-all peer-placeholder-shown:top-3
                        peer-placeholder-shown:left-[11px] peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-400"
                    >
                        Password
                    </label>
                </div>
                {errors.password?.type === 'required' && (
                    <small className="text-red-600">
                        {' '}
                        Mật khẩu là bắt buộc!
                    </small>
                )}
                {errors.password?.type === 'minLength' && (
                    <small className="text-red-600"> Mật khẩu quá ngắn!</small>
                )}
                {errors.password?.type === 'maxLength' && (
                    <small className="text-red-600"> Mật khẩu quá dài!</small>
                )}
                {passErr && <small className="text-red-600"> {passErr} </small>}
            </div>
            <button
                type="submit"
                className="h-14 w-40 rounded-xl bg-slate-600 text-slate-200"
            >
                {' '}
                Login{' '}
            </button>
        </form>
    )
}

export default LoginForm
