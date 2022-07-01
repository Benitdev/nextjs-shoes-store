import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

const signToken = (user: any) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        },

        `${process.env.NEXTAUTH_SECRET}`,
        {
            expiresIn: '30d',
        }
    )
}
const isAuth = async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { authorization } = req.headers
    if (authorization) {
        // Bearer xxx => xxx
        const token = authorization.slice(7, authorization.length)
        jwt.verify(
            token,
            `${process.env.NEXTAUTH_SECRET}`,
            (err: any, decode: any) => {
                if (err) {
                    res.status(401).send({ message: 'Token is not valid' })
                } else {
                    req.body = decode
                    next()
                }
            }
        )
    } else {
        res.status(401).send({ message: 'Token is not suppiled' })
    }
}
const isAdmin = async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: any
) => {
    if (req.body.isAdmin) {
        next()
    } else {
        res.status(401).send({ message: 'User is not admin' })
    }
}

export { signToken, isAuth, isAdmin }
