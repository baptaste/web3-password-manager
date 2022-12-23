import { encryptData, generateCSPRNG } from '../helpers/crypto'
import { hash } from '../helpers/hash'
import Owner from '../models/User'
import UserService from '../services/database/UserService'

export const userController = {
	createUser: async (req: Express.Request, res: Express.Response) => {
		const { email, plaintextPassword } = req.body
		console.log(
			'userController - createUser, email: ',
			email,
			'plaintextPassword: ',
			plaintextPassword
		)

		if (email.length === 0) {
			return res.status(400).json({ error: 'No email found' })
		}

		if (plaintextPassword.length === 0) {
			return res.status(400).json({ error: 'No password found' })
		}

		// create cryptographically secure pseudo-random number used to create encryption key
		const randomStr: string = generateCSPRNG(256)

		// create user master password as a derived key, used to encrypt data encryption key
		const masterPasswordHash = await hash(plaintextPassword)

		if (masterPasswordHash) {
			// create user password key, used to encrypt users data encryption key
			// TODO persist this key in session
			const passwordKey = await hash(masterPasswordHash)
			console.log('userController - createUser, passwordKey: ', passwordKey)

			if (passwordKey) {
				// create user data encryption key
				const encryptionKey = encryptData(randomStr, passwordKey)
				console.log('userController - createUser, encryptionKey: ', encryptionKey)

				UserService.create(email, masterPasswordHash, passwordKey, encryptionKey)
					.then((user) => {
						res.status(200).json({ success: true, user })
					})
					.catch((err) => {
						res.status(400).json({ success: false, message: err })
					})
			} else {
				res.status(400).json({ success: false, message: 'Could not generate password key' })
			}
		} else {
			res.status(400).json({ success: false, message: 'Could not generate master password' })
		}
	},

	getUser: async (req: Express.Request, res: Express.Response) => {
		const { id } = req.params

		if (id.length === 0) {
			return res.status(400).json({ error: 'No password found' })
		}

		console.log('GET User - req.user :', req.user)
		//TODO user req.user.id instead of sending it from params

		await UserService.getById(id)
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
