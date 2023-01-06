import axios from 'axios'
import { BASE_API_URL } from '../config'

export const getAccessToken = async (): Promise<{
	success: boolean
	token: null | string
	error?: any
}> => {
	return new Promise((resolve, reject) => {
		axios
			.get(`${BASE_API_URL}/auth/refresh`, {
				withCredentials: true
			})
			.then((res) => {
				if (res.data.success) {
					resolve({ success: true, token: res.data.accessToken })
				}
			})
			.catch((err) => {
				console.log('api - refresh, catch err:', err)
				return reject(err)
			})
	})
}
