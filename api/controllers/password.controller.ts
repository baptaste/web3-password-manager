import { hashPassword } from '../helpers/hash'

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
		console.log('API - hash:', hash)
		res.json({ hash, name: passwordName })
	}
}
