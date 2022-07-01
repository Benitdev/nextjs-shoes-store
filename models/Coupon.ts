import mongoose from 'mongoose'

const couponSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        code: { type: String, required: true },
        // 0 amount, 1 percent
        type: { type: Number, required: true, default: 0 },
        value: { type: Number },
        expires: { type: Date },
    },
    {
        timestamps: true,
    }
)

const Coupon = mongoose.models.Coupon || mongoose.model('Coupon', couponSchema)
export default Coupon
