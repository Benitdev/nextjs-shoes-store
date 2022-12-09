import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        orderItems: [
            {
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                slug: { type: String, required: true },
                name: { type: String, required: true },
                size: { type: Number, required: true },
                quantity: { type: Number, required: true },
                image: { type: String, required: true },
                price: { type: Number, required: true },
                commented: { type: Boolean, required: true, default: false },
            },
        ],
        shippingAddress: { type: String, required: true },
        paymentMethod: { type: String, required: true },
        paymentResult: { id: String, status: String, email_address: String },
        itemsPrice: { type: Number, required: true },
        shippingPrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        isPaid: { type: Boolean, required: true, default: false },
        orderState: { type: Number, required: true, default: 0 },
        paidAt: { type: Date },
        deliveredAt: { type: Date },
    },
    {
        timestamps: true,
    }
)

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema)
export default Order
