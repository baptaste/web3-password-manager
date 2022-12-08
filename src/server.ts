import dotenv from 'dotenv'
dotenv.config()

import app from './app'
import mongoose from 'mongoose'
import { getContract, verifyContractDeployed } from './contract/config'

const PORT = process.env.PORT || 3500
const URI = process.env.MANGO_CLUSTER_URI || ''

async function start() {
	const contract = await getContract()
	// contract?.filters.on(['NewPassword(string,bool)'])
	console.log('contract address:', contract?.address)

	const verifiedContract = await verifyContractDeployed()
	console.log('Contract deployed:', verifiedContract.deployed)

	mongoose
		.connect(URI, { autoIndex: true })
		.then(() => console.log(`Connected to mongodb`))
		.catch((error) => console.error(error))
}

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`)
	start()
})
