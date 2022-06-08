import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import { isAuth } from '../../../utils/auth'

const handler = nc()
handler.get(async (req, res: NextApiResponse) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

export default handler
