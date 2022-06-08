import type { GetServerSideProps, NextPage } from 'next'
import axios from 'axios'

import Product from '../../models/Product'

import DefaultLayout from '../../components/DefaultLayout'
import { getSession, useSession } from 'next-auth/react'
import WallHeader from '../../components/WallHeader'
import CheckoutStage from '../../components/CheckoutStage'

const Checkout: NextPage = ({}: any) => {
    const { data: session } = useSession()
    return (
        <DefaultLayout title="BQ Store">
            <div>
                <WallHeader category="Trang Thanh Toán" />
                <CheckoutStage session={session} />
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

export default Checkout
