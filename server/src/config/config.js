import dotenv from 'dotenv'
dotenv.config()

const config = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    IK_ENDPOINT: process.env.IK_ENDPOINT,
    IK_PUBLIC_KEY: process.env.IK_PUBLIC_KEY,
    IK_PRIVATE_KEY: process.env.IK_PRIVATE_KEY
}

export default config