import nc from 'next-connect'
import type { NextApiRequest, NextApiResponse } from 'next'

import { getWardsByDistrictCode } from 'sub-vn'

const handler = nc()

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { districtCode } = req.body
    const ward = getWardsByDistrictCode(districtCode)
    res.status(200).json(ward)
})

export default handler
