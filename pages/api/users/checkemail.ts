import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import User from '../../../models/User'
import db from '../../../utils/db'

const handler = nc()

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    await db.connect()
    const { email } = req.body
    const user = await User.findOne({ email })

    await db.disconnect()

    if (user) res.send(true)
    else res.send(false)
})

export default handler
