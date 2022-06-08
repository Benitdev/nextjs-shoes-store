import Head from 'next/head'
import axios from 'axios'
import type { GetServerSideProps, NextPage } from 'next'
import { useEffect } from 'react'

import Nav from '../../components/admin/Nav'

const Admin: NextPage = () => {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-between bg-black/90">
            <Head>
                <title>{'BQ STORE DASHBOARD'}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Nav></Nav>
            <main className="z-10 min-h-screen w-full space-y-28 pb-28">
                <div className="ml-[300px] flex min-h-screen flex-col justify-between px-10">
                    <div className="h-1"></div>
                    <div className="h-[500px] w-[700px]">
                        <h1 className="text-xl font-bold text-slate-300">
                            {' '}
                            Orders{' '}
                        </h1>
                        <div className="h-full rounded-2xl bg-slate-400/30 p-4">
                            <div>
                                <span> ID</span>
                                <span> Name </span>
                                <span> </span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {/*        <main className="container z-10 min-h-screen">{children}</main>
            <main className="container z-10 min-h-screen">{children}</main>
            <main className="container z-10 min-h-screen">{children}</main> */}
        </div>
    )
}
/* export async function getServerSideProps() {

    return {
        props: {
            products: data,
        },
    }
} */

export default Admin
