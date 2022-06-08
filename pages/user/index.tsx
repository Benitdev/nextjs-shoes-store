import type { NextPage } from 'next'
import { getSession, useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

import DefaultLayout from '../../components/DefaultLayout'
import WallHeader from '../../components/WallHeader'
import AccountInfo from '../../components/AccountInfo'
import { useRouter } from 'next/router'

const User: NextPage = () => {
    const { data: session } = useSession()
    const router = useRouter()
    if (!session)
        return (
            <DefaultLayout title={'Thông tin tài khoản'}>
                <WallHeader category="Thông tin tài khoản" />

                <h1 className="text-center text-xl font-bold text-slate-200">
                    {' '}
                    Vui lòng đăng nhập tài khoản !!!
                </h1>
            </DefaultLayout>
        )
    return (
        <DefaultLayout title={'Thông tin tài khoản'}>
            {/* <FilterBar></FilterBar> */}
            <div>
                <WallHeader category="Thông tin tài khoản" />
                <div className="mt-10 flex flex-col justify-between gap-20 lg:flex-row xl:px-20">
                    <div className="mx-auto mt-10 w-[250px] ">
                        <div className="relative h-[250px] cursor-pointer border-[1px] border-slate-400 hover:after:absolute hover:after:inset-0 hover:after:bg-slate-400/20">
                            <Image
                                src={`${session?.user?.image}`}
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>
                        <button className="mx-auto mt-6 block rounded-xl bg-cyan-600 py-3 px-4 font-bold capitalize">
                            {' '}
                            thay đổi ảnh đại diện
                        </button>
                    </div>
                    <AccountInfo />
                </div>
            </div>
        </DefaultLayout>
    )
}

export async function getServerSideProps(context: any) {
    const session = await getSession(context)

    return {
        props: {
            session,
        },
    }
}
export default User
