import { hashPassword } from '../helpers/hash'
import { v4 as uuid } from 'uuid'
import { getPasswordCount, getPasswordHashFromContract, sendPasswordToContract } from '../contract/methods'

export const passwordController = {
	hash: async (req: Express.Request, res: Express.Response) => {
		const { passwordName, plainTextPassword } = req.body
		console.log('API - plainTextPassword:', plainTextPassword)

		if (passwordName.length === 0) {
			return res.status(400).json({ error: 'Associated name for password is missing' })
		} else if (plainTextPassword.length === 0) {
			return res.status(400).json({ error: 'No password found' })
		}

		const hash = await hashPassword(plainTextPassword)
		const randomId = uuid()
		console.log('RANDOM UUID:', randomId, 'FOR PASSWORD:', passwordName)

		await sendPasswordToContract(hash, randomId)

		console.log('API - hash:', hash)
		res.json({ name: passwordName, hashId: randomId })
	},
	getPasswordHash: async (req: Express.Request, res: Express.Response) => {
		const { hashId } = req.body
		console.log('API - getPasswordHash req.body hashId:', hashId)
		const passwordHash = await getPasswordHashFromContract(hashId)
		console.log('API - getPasswordHash returned hash from contract:', passwordHash)
		res.json({ passwordHash })
	},
	getCount: async (req: Express.Request, res: Express.Response) => {
		const count = await getPasswordCount()
		console.log('API - getPasswordCount:', count)

		res.json({ passwordCount: count })
	}
}
