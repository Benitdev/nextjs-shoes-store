import nc from 'next-connect'
import type { NextApiRequest, NextApiResponse } from 'next'

import { getProvinces } from 'sub-vn'

const handler = nc()

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    const provinces = getProvinces()
    res.status(200).json(provinces)
})

export default handler
