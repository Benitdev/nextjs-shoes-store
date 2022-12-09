import nc from 'next-connect'
import type { NextApiRequest, NextApiResponse } from 'next'
import Product from '../../../models/Product'
import db from '../../../utils/db'
const handler = nc()

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    await db.connect()
    const { category, cate, gender, size, search } = req.query
    console.log(req.query)
    if (!category) {
        console.log(category)
        const featuredProductsDocs = await Product.find(
            { isFeatured: true },
            '-reviews'
        )
            .lean()
            .limit(3)
        const topRatedProductsDocs = await Product.find({}, '-reviews')
            .lean()
            .sort({
                rating: -1,
            })
            .limit(6)
        const slideProductsDocs = await Product.find({ isSlide: true })
            .lean()
            .limit(3)
        const products = await Product.find().lean()
        await db.disconnect()
        res.status(200).json({
            featuredProductsDocs,
            topRatedProductsDocs,
            slideProductsDocs,
            products,
        })
    } else {
        console.log(category)
        let criteria = []
        let query = {}
        const cateRegex = new RegExp(`${cate || ''}`, 'g')
        if (category && category != 'products') criteria.push({ category })
        if (cate) criteria.push({ childrenCategory: cateRegex })
        if (gender && (category == 'product' || category == 'sales'))
            criteria.push({ category: gender })
        if (search) criteria.push({ name: new RegExp(`${search}`, 'i') })

        query = criteria.length > 0 ? { $and: criteria } : {}
        console.log(criteria)
        const products = await Product.find(query).lean()

        await db.disconnect()

        res.status(200).json(products)
    }
})

export default handler
