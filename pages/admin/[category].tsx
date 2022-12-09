import React from 'react'
import AdminLayout from '../../components/layouts/AdminLayout'
import Orders from '../../components/admin/Orders'

type Props = any

const AdminCategory = ({ category }: Props) => {
    return (
        <AdminLayout title={`BQ Store | ${category}`}>
            {category == 'orders' ? <Orders /> : null}
        </AdminLayout>
    )
}

export async function getServerSideProps(context: any) {
    const { category } = context.query
    return {
        props: {
            category,
        },
    }
}
export default AdminCategory
