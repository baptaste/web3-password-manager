import OwnerService from '../services/database/OwnerService'

export const authController = {
	createMasterPassword: async (req: Express.Request, res: Express.Response) => {
		const { plaintext } = req.body

		if (plaintext.length === 0) {
			return res.status(400).json({ error: 'No password found' })
		}

		await OwnerService.createMasterPassword(plaintext)
			.then((hash) => {
				res.status(200).json({ success: true, hash })
			})
			.catch((err) => {
				res.status(400).json({ success: false, message: err })
			})
	},
	verifyMasterPassword: async (req: Express.Request, res: Express.Response) => {
		const { plaintext, hash } = req.body

		if (plaintext.length === 0) {
			return res.status(400).json({ error: 'No password found' })
		}

		await OwnerService.verifyMasterPassword(hash, plaintext)
			.then((match) => {
				res.status(200).json({ success: true, match })
			})
			.catch((err) => {
				res.status(400).json({ success: false, message: err })
			})
	}
}
