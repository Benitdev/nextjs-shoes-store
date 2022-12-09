import mongoose from 'mongoose'

const accountSchema = new mongoose.Schema(
    {
        provider: { type: String, required: true },
        type: String,
        providerAccountId: String,
        access_token: String,
        expires_at: Number,
        scope: String,
        token_type: { type: String, default: 'Bearer' },
        id_token: String,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

const Account =
    mongoose.models.Account || mongoose.model('Account', accountSchema)
export default Account
