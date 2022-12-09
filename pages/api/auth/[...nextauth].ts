import NextAuth from 'next-auth'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

import bcrypt from 'bcryptjs'
import clientPromise from '../../../lib/mongodb'
import db from '../../../utils/db'
import User from '../../../models/User'

export default NextAuth({
    // Configure one or more authentication providers
    session: {
        strategy: 'jwt',
    },

    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                    placeholder: 'email',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                await db.connect()
                const user = await User.findOne({
                    email: credentials?.email,
                })
                await db.disconnect()
                if (!user) {
                    throw new Error('Email does not exist!!!')
                } else {
                    if (
                        bcrypt.compareSync(
                            `${credentials?.password}`,
                            `${user.password}`
                        )
                    ) {
                        return user
                    }
                }
                // If no error and we have user data, return it

                // Return null if user data could not be retrieved
                throw new Error('Password incorrect!')
            },
        }),
        FacebookProvider({
            clientId: `${process.env.FACEBOOK_CLIENT_ID}`,
            clientSecret: `${process.env.FACEBOOK_CLIENT_SECRET}`,
        }),
        GoogleProvider({
            clientId: `${process.env.GOOGLE_CLIENT_ID}`,
            clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
        }),
        // ...add more providers here
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (user) user.isAdmin = false
            return true
        },
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith('/')) return `${baseUrl}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
        async jwt({ token, account, user }) {
            if (account || user) {
                token.accessToken = account?.access_token
                token.isAdmin = user?.isAdmin
                user!.isAdmin = false
            }
            return token
        },
        async session({ session, user, token }) {
            session.accessToken = token.accessToken
            return {
                ...session,
                user: {
                    ...session.user,
                    _id: token.sub,
                    isAdmin: token.isAdmin,
                },
            }
        },
    },
    pages: {
        signIn: '/',
        error: '/404',
    },
    secret: process.env.NEXTAUTH_SECRET,
    adapter: MongoDBAdapter(clientPromise),
})
