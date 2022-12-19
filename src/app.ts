import express from 'express'
import cors, { CorsOptions } from 'cors'
import cookieParser from 'cookie-parser'
import router from './routes/router'
import { verifyAccessToken } from './middlewares/auth'

const app = express()
const allowedOrigins: string[] = ['http://localhost:5173']
const options: CorsOptions = {
	origin: allowedOrigins
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(options))
app.use(cookieParser())
// app.use(verifyAccessToken)
app.use(router)

export default app
