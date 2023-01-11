import axios from 'axios'
import { BASE_API_URL } from '../../../config'
import type { IPasswords } from '../types.d'

export const getUserPassords = async (
	userId: string
): Promise<{
	success: boolean
	passwords: IPasswords
	error?: any
}> => {
	return new Promise((resolve, reject) => {
		axios
			.get(`${BASE_API_URL}/passwords/${userId}`, {
				withCredentials: true
			})
			.then((res) => {
				const { success, passwords } = res.data
				if (success) {
					const userPasswords = passwords.map((password: any) => ({
						...password,
						plaintext: null,
						visible: false
					}))
					resolve({ success: true, passwords: userPasswords })
				}
			})
			.catch((err) => {
				console.log('api - getUserPassords, catch err:', err)
				return reject(err)
			})
	})
}
