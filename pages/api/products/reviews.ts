import { getToken } from 'next-auth/jwt'
import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose'
import nc from 'next-connect'
import db from '../../../utils/db'
import Product from '../../../models/Product'
import Order from '../../../models/Orders'

const handler = nc()
const secret = process.env.NEXTAUTH_SECRET

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    db.connect()
    const product = await Product.findById(req.query.id)
    db.disconnect()
    if (product) {
        res.send(product.reviews)
    } else {
        res.status(404).send({ message: 'Product not found' })
    }
})

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await getToken({ req, secret })
    await db.connect()
    const product = await Product.findById(req.body.id)
    if (product) {
        const review = {
            user: new mongoose.Types.ObjectId(user?.sub),
            name: user?.name,
            rating: Number(req.body.rating),
            comment: req.body.comment,
        }
        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating =
            product.reviews.reduce((a: any, c: any) => c.rating + a, 0) /
            product.reviews.length

        const order = await Order.findById(req.body.orderId)
        const cartItem = order.orderItems.find(
            (item: any) => item._id == req.body.id && item.size == req.body.size
        )
        cartItem.commented = true

        await order.save()
        await product.save()
        await db.disconnect()
        res.status(201).send({
            message: 'Review submitted',
        })
    } else {
        await db.disconnect()
        res.status(404).send({ message: 'Product Not Found' })
    }
})

export default handler
