import Head from 'next/head'
import axios from 'axios'
import type { GetServerSideProps, NextPage } from 'next'
import { useEffect } from 'react'

import Nav from '../../components/admin/Nav'
import AdminLayout from '../../components/layouts/AdminLayout'

const Admin: NextPage = () => {
    return <AdminLayout title="BQ Store | Dashboard"></AdminLayout>
}
/* export async function getServerSideProps() {

    return {
        props: {
            products: data,
        },
    }
} */

export default Admin
