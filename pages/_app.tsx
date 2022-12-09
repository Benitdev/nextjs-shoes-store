import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'
import { io } from 'socket.io-client'

import { css } from '@emotion/react'
import PropagateLoader from 'react-spinners/PropagateLoader'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

import { store } from '../redux/store'
import '../styles/globals.css'

export const socket = io('http://localhost:5000')

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <SessionProvider session={session}>
            <Provider store={store}>
                <PayPalScriptProvider
                    options={{
                        'client-id': `test`,
                        currency: 'VND',
                    }}
                >
                    <Component {...pageProps} />
                </PayPalScriptProvider>
            </Provider>
        </SessionProvider>
    )
}

export default MyApp
