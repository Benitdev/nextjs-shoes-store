// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import db from '../../utils/db'
type Data = {
    name: any
}
const secret = process.env.NEXTAUTH_SECRET
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    await db.connect()
    const cc = await getToken({ req, secret })
    await db.disconnect()
    res.status(200).json({ name: cc })
}
