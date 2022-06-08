import React from 'react'
import { useSession } from 'next-auth/react'

const UserInfoForm = () => {
    const { data: session } = useSession()
    return (
        <div className="mt-10 px-10">
            <form action="" className="space-y-8">
                <div className="flex justify-between">
                    <div>
                        <label
                            htmlFor=""
                            className="inline-block w-24 font-serif font-bold text-slate-200"
                        >
                            {' '}
                            Họ tên{' '}
                            <span className="text-xl text-red-500">
                                *
                            </span>:{' '}
                        </label>
                        <input
                            value={`${session?.user?.name}`}
                            type="text"
                            className="ml-4 border-b-2 border-slate-400 bg-transparent px-4 text-slate-400 outline-none"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor=""
                            className="font-serif font-bold text-slate-200"
                        >
                            {' '}
                            Ngày sinh{' '}
                            <span className="text-xl text-red-500">
                                *
                            </span>:{' '}
                        </label>
                        <input
                            type="text"
                            className="ml-4 border-b-2 border-slate-400 bg-transparent px-4 text-slate-400 outline-none"
                        />
                    </div>
                </div>
                <div className="flex justify-between">
                    <div>
                        <label
                            htmlFor=""
                            className="inline-block w-24 font-serif font-bold text-slate-200"
                        >
                            {' '}
                            Email{' '}
                            <span className="text-xl text-red-500">
                                *
                            </span>:{' '}
                        </label>
                        <input
                            value={`${session?.user?.email}`}
                            type="text"
                            className="ml-4 border-b-2 border-slate-400 bg-transparent px-4 text-slate-400 outline-none"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor=""
                            className="font-serif font-bold text-slate-200"
                        >
                            {' '}
                            Số điện thoại{' '}
                            <span className="text-xl text-red-500">
                                *
                            </span>:{' '}
                        </label>
                        <input
                            type="text"
                            className="ml-4 border-b-2  border-slate-400 bg-transparent text-slate-400 outline-none"
                        />
                    </div>
                </div>
                <div>
                    <label
                        htmlFor=""
                        className="inline-block w-24 font-serif font-bold text-slate-200"
                    >
                        {' '}
                        Giới tính{' '}
                        <span className="text-xl text-red-500">*</span>:{' '}
                    </label>
                    <input
                        type="text"
                        className="ml-4 border-b-2  border-slate-400 bg-transparent text-slate-400 outline-none"
                    />
                </div>
                <div>
                    <label
                        htmlFor=""
                        className="inline-block w-24 font-serif font-bold text-slate-200"
                    >
                        {' '}
                        Địa chỉ: <span className="text-xl text-red-500">*</span>
                        :{' '}
                    </label>
                    <input
                        type="text"
                        className="ml-4 border-b-2 border-slate-400 bg-transparent px-4 text-slate-400 outline-none"
                    />
                </div>
                <div className="flex justify-between px-4 text-slate-200">
                    <div>
                        <label htmlFor=""> Phường/xả: </label>
                        <select
                            name=""
                            id=""
                            className="ml-3 h-6 w-28"
                        ></select>
                    </div>
                    <div>
                        <label htmlFor=""> Quận/huyện: </label>
                        <select
                            name=""
                            id=""
                            className="ml-3 h-6 w-28"
                        ></select>
                    </div>
                    <div>
                        <label htmlFor=""> Tỉnh/thành: </label>
                        <select
                            name=""
                            id=""
                            className="ml-3 h-6 w-28"
                        ></select>
                    </div>
                </div>
                <button className="mx-auto !mt-14 block rounded-xl bg-sky-500 px-6 py-2 font-bold">
                    {' '}
                    Lưu Thay Đổi{' '}
                </button>
            </form>
        </div>
    )
}

export default UserInfoForm
