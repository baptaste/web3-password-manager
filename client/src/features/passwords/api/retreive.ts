import axios from 'axios'
import { BASE_API_URL } from '../../../config'

export const retreivePassword = async (
	userId: string,
	encryptionId: string
): Promise<{
	success: boolean
	decrypted: string
	error?: any
}> => {
	console.log('retreivePassword called')
	return new Promise((resolve, reject) => {
		axios
			.post(
				`${BASE_API_URL}/passwords/retreive`,
				{ userId, encryptionId },
				{
					withCredentials: true
				}
			)
			.then((res) => {
				if (res.data.success) {
					resolve({ success: true, decrypted: res.data.plaintextPassword })
				}
			})
			.catch((err) => {
				console.log('api - getUserPassords, catch err:', err)
				return reject(err)
			})
	})
}
