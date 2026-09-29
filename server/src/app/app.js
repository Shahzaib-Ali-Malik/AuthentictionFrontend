import express from 'express'
import authRouter from '../routes/auth.route.js'
import productsRouter from '../routes/products.route.js'
import cookieParser from 'cookie-parser'
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authRouter)
app.use('/api/products',productsRouter)

export default app