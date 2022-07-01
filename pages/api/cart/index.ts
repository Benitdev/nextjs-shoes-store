import nc from 'next-connect'
import type { NextApiRequest, NextApiResponse } from 'next'
import Product from '../../../models/Product'
import db from '../../../utils/db'

const handler = nc()

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    await db.connect()
    const { _id, size, quantity } = req.body
    const product = await Product.findById(_id)
    const existSize = product.countInStock.find(
        (item: any) => item.size == size
    )
    await db.disconnect
    if (existSize.count >= quantity) res.json({ message: 'Ok' })
    else res.json({ message: 'Out of stock' })
})

export default handler
