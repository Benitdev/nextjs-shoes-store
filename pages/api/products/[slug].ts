import nc from 'next-connect'
import type { NextApiRequest, NextApiResponse } from 'next'
import Product from '../../../models/Product'
import db from '../../../utils/db'
const handler = nc()

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    await db.connect()
    const { slug } = req.query
    const product = await Product.findOne({ slug }).lean()
    await db.disconnect()
    res.status(200).json(product)
})

export default handler
