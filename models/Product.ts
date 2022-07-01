import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        name: { type: String, required: true },
        rating: { type: Number, default: 5 },
        comment: { type: String, required: true, default: '' },
    },
    {
        timestamps: true,
    }
)

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        category: { type: String, required: true },
        childrenCategory: { type: String },
        imageDefault: { type: String },
        images: { type: Array, required: true },
        price: { type: Number, required: true },
        rating: { type: Number, required: true, default: 0 },
        numReviews: { type: Number, required: true, default: 0 },
        countInStock: [
            {
                size: { type: Number, required: true, default: 0 },
                count: { type: Number, required: true, default: 0 },
            },
        ],
        description: { type: String, required: true },
        reviews: [reviewSchema],
        isFeatured: { type: Boolean, required: true, default: false },
        isSlide: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
)

const Product =
    mongoose.models.Product || mongoose.model('Product', productSchema)

export default Product
