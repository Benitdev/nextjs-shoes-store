import nc from 'next-connect'
import type { NextApiRequest, NextApiResponse } from 'next'
import Coupon from '../../../models/Coupon'
import db from '../../../utils/db'

const handler = nc()

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    await db.connect()
    const { code } = req.body
    const coupon = await Coupon.findOne({ code }).lean()
    console.log(coupon)
    await db.disconnect()
    if (coupon) res.json(coupon)
    else res.status(404).send({ message: 'Code is not valid' })
})

export default handler
