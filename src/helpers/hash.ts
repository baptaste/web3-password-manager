import bcrypt from 'bcrypt'
import CryptoJS from 'crypto-js'

const { ENCRYPTION_SECRET_KEY } = process.env

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

export function encryptData(plainText: string): string {
	return CryptoJS.AES.encrypt(plainText, ENCRYPTION_SECRET_KEY as string).toString()
}

export function decryptData(encrypted: string): string {
	const bytes = CryptoJS.AES.decrypt(encrypted, ENCRYPTION_SECRET_KEY as string)
	return bytes.toString(CryptoJS.enc.Utf8)
}
