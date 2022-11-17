import express from 'express'
import dotenv from 'dotenv'
import cors, { CorsOptions } from 'cors'
import router from './api/routes/router'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3500

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const allowedOrigins = ['http://localhost:5173']

const options: CorsOptions = {
	origin: allowedOrigins
}

app.use(cors(options))
app.use(router)

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`)
})
