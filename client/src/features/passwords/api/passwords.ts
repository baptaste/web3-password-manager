import axios from 'axios'
import { BASE_API_URL } from '../../../config'

export const getUserPassords = async (
	userId: string
): Promise<{
	success: boolean
	passwords: any[]
	error?: any
}> => {
	return new Promise((resolve, reject) => {
		axios
			.get(`${BASE_API_URL}/passwords/${userId}`, {
				withCredentials: true
			})
			.then((res) => {
				if (res.data.success) {
					resolve({ success: true, passwords: res.data.passwords })
				}
			})
			.catch((err) => {
				console.log('api - getUserPassords, catch err:', err)
				return reject(err)
			})
	})
}
