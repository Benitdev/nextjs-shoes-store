import { getToken } from 'next-auth/jwt'
import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import Order from '../../../models/Orders'

import db from '../../../utils/db'
import User from '../../../models/User'

const handler = nc()
const secret = process.env.NEXTAUTH_SECRET

/* handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await getToken({ req, secret })
    await db.connect()
    const newOrder = new Order({
        ...req.body,
        user: user?.sub,
    })
    console.log(req.body, user?.sub)
    const order = await newOrder.save()
    await db.disconnect()
    res.status(201).send(order)
})
 */
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    await db.connect()
    const orders = await Order.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'userInfo',
            },
        },
    ]).sort({ createdAt: -1 })

    console.log(orders)
    await db.disconnect()
    res.status(201).send(orders)
})

/* handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
    await db.connect()
    const order = await Order.findById(req.body.id)
    console.log(order)
    if (order) {
        order.orderState = 4
        await order.save()
        await db.disconnect()
        res.send({ message: 'order Updated Successfully' })
    } else {
        await db.disconnect()
        res.status(404).send({ message: 'order Not Found' })
    }
}) */

export default handler
