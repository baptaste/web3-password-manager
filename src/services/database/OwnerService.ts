import { hashPassword, verifyPassword } from '../../helpers/hash'
import Owner from '../../models/Owner'

class OwnerService {
	static createMasterPassword(plaintext: string): Promise<string> {
		return new Promise(async (resolve, reject) => {
			console.log('OwnerService - create master password with plaintext:', plaintext)
			const hash = await hashPassword(plaintext)
			if (hash != null) {
				Owner.create({ master_password: hash })
					.then(() => {
						console.log('OwnerService - create master password success, hash:', hash)
						resolve(hash)
					})
					.catch((err) => {
						console.log('OwnerService - create master password error:', err)
						reject(err)
					})
			} else {
				reject()
			}
		})
	}
	static verifyMasterPassword(hash: string, plaintext: string): Promise<boolean> {
		return new Promise(async (resolve, reject) => {
			console.log('OwnerService - verify master password with plaintext:', plaintext)
			await verifyPassword(hash, plaintext)
				.then((match) => {
					if (match) {
						console.log('OwnerService - verify master password success:', match)
						resolve(true)
					} else {
						resolve(false)
					}
				})
				.catch((err) => {
					console.log('OwnerService - verify master password error:', err)
					reject(err)
				})
		})
	}
}

export default OwnerService
