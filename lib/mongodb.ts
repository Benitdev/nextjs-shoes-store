// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient } from 'mongodb'
import { ConnectOptions } from 'mongoose'

const uri = `${process.env.MONGODB_URI}`
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}

let client
let clientPromise: any

if (!uri) {
    throw new Error('Please add Mongo URI to .env')
}

if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options as ConnectOptions)
        global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
} else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options as ConnectOptions)
    clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise
