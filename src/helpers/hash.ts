
import CryptoJS from 'crypto-js'
import * as argon2 from 'argon2'

const { ENCRYPTION_SECRET_KEY } = process.env

export async function hashPassword(plaintext: string): Promise<string | null> {
	try {
		const hash: string = await argon2.hash(plaintext, { type: argon2.argon2id })
		if (hash.length) {
			return hash
		}
	} catch (error) {
		console.error(error)
	}
	return null
}

export async function verifyPassword(hash: string, plaintext: string): Promise<boolean> {
	try {
		const match: boolean = await argon2.verify(hash, plaintext);
		if (match === false) {
			return false
		}
		return true
	} catch (error) {
		console.error(error)
	}
	return false
}

export function encryptData(plainText: string): string {
	return CryptoJS.AES.encrypt(plainText, ENCRYPTION_SECRET_KEY as string).toString()
}

export function decryptData(encrypted: string): string {
	const bytes = CryptoJS.AES.decrypt(encrypted, ENCRYPTION_SECRET_KEY as string)
	return bytes.toString(CryptoJS.enc.Utf8)
}
