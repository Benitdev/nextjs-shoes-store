import nc from 'next-connect'
import type { NextApiRequest, NextApiResponse } from 'next'

import { getDistrictsByProvinceCode } from 'sub-vn'

const handler = nc()

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { provinceCode } = req.body
    const district = getDistrictsByProvinceCode(provinceCode)
    res.status(200).json(district)
})

export default handler
