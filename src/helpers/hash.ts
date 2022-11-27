import bcrypt from 'bcrypt'

export async function hashPassword(plainTextPassword: string): Promise<string | any> {
	let hash: string = ''
	const salt: number = 10

	try {
		hash = await bcrypt.hash(plainTextPassword, salt)
	} catch (error) {
		console.error(error)
	}

	return hash
}

export async function comparePasswords(plainTextPassword: string, storedHash: string): Promise<boolean | any> {
	let match: boolean = false

	try {
		match = await bcrypt.compare(plainTextPassword, storedHash)
	} catch (error) {
		console.error(error)
	}

	return match
}
