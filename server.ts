import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors, { CorsOptions } from 'cors'
import router from './api/routes/router'
import { verifyContractDeployed } from './api/contract/interact'

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

async function start() {
	const verifiedContract = await verifyContractDeployed()
	console.log('Contract deployed:', verifiedContract.deployed)
}

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`)
	start()
})
