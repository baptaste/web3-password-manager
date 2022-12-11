import { encryptData, generateCSPRNG } from '../helpers/crypto'
import { hash } from '../helpers/hash'
import Owner from '../models/User'
import UserService from '../services/database/UserService'

export const userController = {
	createUser: async (req: Express.Request, res: Express.Response) => {
		const { email, plaintextPassword } = req.body
		console.log('userController - createUser, email: ', email, 'plaintextPassword: ', plaintextPassword)

		if (email.length === 0) {
			return res.status(400).json({ error: 'No email found' })
		}

		if (plaintextPassword.length === 0) {
			return res.status(400).json({ error: 'No password found' })
		}

		const randomNumber = generateCSPRNG()
		// create user master password as a derived key, used to encrypt data encryption key
		const masterPasswordHash = await hash(plaintextPassword)

		if (masterPasswordHash) {
			console.log('userController - createUser, masterPasswordHash: ', masterPasswordHash)
			// create user data encryption key
			const encryptionKey = encryptData(randomNumber, masterPasswordHash)
			console.log('userController - createUser, encryptionKey: ', encryptionKey)

			await UserService.create(email, masterPasswordHash, encryptionKey)
				.then((user) => {
					res.status(200).json({ success: true, user })
				})
				.catch((err) => {
					res.status(400).json({ success: false, message: err })
				})
		} else {
			res.status(400).json({ success: false, message: 'Could not generate master password' })
		}
	},

	verifyMasterPassword: async (req: Express.Request, res: Express.Response) => {
		const { plaintext, hash } = req.body

		if (plaintext.length === 0) {
			return res.status(400).json({ error: 'No password found' })
		}

		await UserService.verifyMasterPassword(hash, plaintext)
			.then((match) => {
				res.status(200).json({ success: true, match })
			})
			.catch((err) => {
				res.status(400).json({ success: false, message: err })
			})
	},

	getUser: async (req: Express.Request, res: Express.Response) => {
		const { id } = req.params

		if (id.length === 0) {
			return res.status(400).json({ error: 'No password found' })
		}

		await UserService.get(id)
			.then((user) => {
				res.status(200).json({ success: true, user })
			})
			.catch((err) => {
				res.status(400).json({ success: false, message: err })
			})
	},

	getAll: async (req: Express.Request, res: Express.Response) => {
		const users = await UserService.getAll()
		console.log('userController - getAll, users:', users)
		res.status(200).json({ success: true, users })
	}
}
