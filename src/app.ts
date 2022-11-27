import express from 'express'
import cors, { CorsOptions } from 'cors'
import router from './routes/router'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const allowedOrigins = ['http://localhost:5173']

const options: CorsOptions = {
	origin: allowedOrigins
}

app.use(cors(options))
app.use(router)

export default app
