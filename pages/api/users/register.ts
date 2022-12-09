import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import bcrypt from 'bcryptjs'

import User from '../../../models/User'
import db from '../../../utils/db'

const handler = nc()

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    await db.connect()
    const { firstName, lastName, email, phoneNumber, password } = req.body
    const newUser = new User({
        name: firstName + ' ' + lastName,
        email,
        image: null,
        phoneNumber,
        password: bcrypt.hashSync(req.body.password),
    })
    const user = await newUser.save()
    await db.disconnect()
    return res.send({ user })
})

export default handler
