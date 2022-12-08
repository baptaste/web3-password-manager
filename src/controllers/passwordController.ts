import { decryptData, encryptData } from '../helpers/hash'
import { v4 as uuid } from 'uuid'
import ContractService from '../services/contract/ContractService'
import PasswordService from '../services/database/PasswordService'

export const passwordController = {
	savePassword: async (req: Express.Request, res: Express.Response) => {
		const { passwordName, plainTextPassword } = req.body
		console.log('API - plainTextPassword:', plainTextPassword)

		if (passwordName.length === 0) {
			return res.status(400).json({ error: 'Associated name for password is missing' })
		}

		if (plainTextPassword.length === 0) {
			return res.status(400).json({ error: 'No password found' })
		}

		// create encrypted
		const encrypted = encryptData(plainTextPassword)
		console.log('CryptoJS password encrypted:', encrypted)

		// create uuid
		const randomId = uuid()
		console.log('RANDOM UUID:', randomId, 'FOR PASSWORD:', passwordName)

		// store encrypted password and its id in contract and in db
		await ContractService.store(encrypted, randomId)
			.then(async ({ stored }) => {
				console.log('API - on est passé dans le .then du contract store')
				if (stored === true) {
					console.log('passwordController - contract storage success:', stored)
					// store password name and hash id in database
					await PasswordService.create({ name: passwordName, hash_id: randomId })
						.then(() => {
							console.log('passwordController - db create password success')
							res.status(200).json({ success: true, name: passwordName, hash_id: randomId })
						})
						.catch((err) => {
							console.error('passwordController - db create password error:', err)
							res.status(400).json({ success: false })
						})
				}
			})
			.catch((err) => {
				console.error('passwordController - contract storage error:', err)
				res.status(400).json({ success: false })
			})
	},
	retreivePassword: async (req: Express.Request, res: Express.Response) => {
		const { hashId } = req.body
		console.log('passwordController - retreivePassword req hashId:', hashId)

		if (hashId.length === 0) {
			res.status(400).json({ success: false, message: 'No hashId found in request body' })
		}

		const foundPassword = await PasswordService.get(hashId)
		console.log('passwordController - db password found:', foundPassword)

		if (!foundPassword) {
			res.status(400).json({ success: false, message: `No password found in collection with hash id ${hashId}` })
		}

		const contractPassword = await ContractService.retreive(foundPassword.hash_id)
		console.log('passwordController - retreivePassword, contractPassword:', contractPassword)

		if (!contractPassword) {
			res.status(400).json({ success: false, message: `No encrypted password found in contract with hash id ${hashId}` })
		}

		const plainTextPassword = decryptData(contractPassword.encrypted)
		console.log('passwordController - retreivePassword, plainTextPassword:', plainTextPassword)

		res.status(200).json({ success: true, plainTextPassword })
	},
	getCount: async (req: Express.Request, res: Express.Response) => {
		const count = await PasswordService.count()
		console.log('passwordController - getCount, count:', count)
		res.status(200).json({ success: true, passwordCount: count })
	},
	getAll: async (req: Express.Request, res: Express.Response) => {
		const passwords = await PasswordService.getAll()
		console.log('passwordController - getAll, passwords:', passwords)
		res.status(200).json({ success: true, passwords })
	}
}
