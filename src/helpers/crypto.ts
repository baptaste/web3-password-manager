import crypto from 'crypto'
import CryptoJS from 'crypto-js'

// generate a CSPRNG (cryptographically secure pseudo-random number generator)
export function generateCSPRNG(): string {
	return crypto.randomBytes(256).toString('hex')
}

export function encryptData(plainText: string, secretKey: string): string {
	return CryptoJS.AES.encrypt(plainText, secretKey).toString()
}

export function decryptData(encrypted: string, secretKey: string): string {
	const bytes = CryptoJS.AES.decrypt(encrypted, secretKey)
	return bytes.toString(CryptoJS.enc.Utf8)
}
