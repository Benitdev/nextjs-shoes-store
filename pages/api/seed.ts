import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import Product from '../../models/Product'
import Coupon from '../../models/Coupon'
import data from '../../utils/data'
import db from '../../utils/db'

const handler = nc()

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    await db.connect()
    await Product.deleteMany()
    await Coupon.deleteMany()
    await Product.insertMany(data.products)
    await Coupon.insertMany(data.coupons)
    await db.disconnect()
    return res.send({ massage: 'already seeded' })
})

export default handler
