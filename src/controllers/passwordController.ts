import { decryptData, encryptData } from '../helpers/crypto'
import { v4 as uuid } from 'uuid'
import ContractService from '../services/contract/ContractService'
import PasswordService from '../services/database/PasswordService'
import UserService from '../services/database/UserService'

export const passwordController = {
	// password creation (total time duration for process: 14.5 seconds)
	createPassword: async (req: Express.Request, res: Express.Response) => {
		const { userId, title, plainTextPassword } = req.body
		console.log('API - plainTextPassword:', plainTextPassword)

		if (title.length === 0) {
			return res.status(400).json({ error: 'Associated name for password is missing' })
		}

		if (plainTextPassword.length === 0) {
			return res.status(400).json({ error: 'No password found' })
		}

		const userEncryptionKey = await UserService.getEncryptionKey(userId)

		if (userEncryptionKey.length) {
			console.log('passwordController - userEncryptionKey:', userEncryptionKey)
			// encrypts new password with user encryption key
			const encrypted = encryptData(plainTextPassword, userEncryptionKey)
			console.log('CryptoJS password encrypted:', encrypted)

			// create random uuid for the new password
			const randomId = uuid()
			console.log('RANDOM UUID:', randomId, 'FOR PASSWORD:', title)

			// 1 - store encrypted password and its id in both contract and database
			ContractService.store(encrypted, randomId)
				.then(({ stored }) => {
					console.log('API - on est passé dans le .then du contract store')
					if (stored === true) {
						console.log('passwordController - contract storage success:', stored)
						// 2 - store password title, owner id and encryption id in database
						PasswordService.create({ title, owner_id: userId, encryption_id: randomId })
							.then((password) => {
								console.log('passwordController - db create password success:', password)
								// 3 - update users passwords with newly created password
								UserService.addPassword(userId, password)
									.then((added: boolean) => {
										if (added === true) {
											res.status(200).json({ success: true, title, owner_id: userId, encryption_id: randomId })
										}
									})
									.catch((err) => {
										console.error('passwordController - adding new password to user passwords error:', err)
										res.status(400).json({ success: false, message: err })
									})
							})
							.catch((err) => {
								console.error('passwordController - db create password error:', err)
								res.status(400).json({ success: false, message: err })
							})
					}
				})
				.catch((err) => {
					console.error('passwordController - contract storage error:', err)
					res.status(400).json({ success: false })
				})
		}
	},

	// retreive password (total time duration for process: 2.10 seconds)
	retreivePassword: async (req: Express.Request, res: Express.Response) => {
		const { userId, encryptionId } = req.body
		console.log('passwordController - retreivePassword req encryptionId:', encryptionId)

		if (encryptionId.length === 0) {
			res.status(400).json({ success: false, message: 'No encryptionId found in request body' })
		}

		const foundPassword = await PasswordService.getPassword(encryptionId)
		console.log('passwordController - db password found:', foundPassword)

		if (!foundPassword) {
			res.status(400).json({ success: false, message: `No password found in collection with hash id ${encryptionId}` })
		}

		const contractPassword = await ContractService.retreive(foundPassword.encryption_id)
		console.log('passwordController - retreivePassword, contractPassword:', contractPassword)

		if (!contractPassword) {
			res.status(400).json({ success: false, message: `No encrypted password found in contract with hash id ${encryptionId}` })
		}

		const userEncryptionKey = await UserService.getEncryptionKey(userId)

		if (userEncryptionKey.length) {
			const plaintextPassword = decryptData(contractPassword.password, userEncryptionKey)
			console.log('passwordController - retreivePassword, plaintextPassword:', plaintextPassword)

			res.status(200).json({ success: true, plaintextPassword })
		}
	},

	getCount: async (_: any, res: Express.Response) => {
		const count = await PasswordService.count()
		console.log('passwordController - getCount, count:', count)
		res.status(200).json({ success: true, passwordCount: count })
	},

	getAll: async (_: any, res: Express.Response) => {
		const passwords = await PasswordService.getAll()
		console.log('passwordController - getAll, passwords:', passwords)
		res.status(200).json({ success: true, passwords })
	}
}
