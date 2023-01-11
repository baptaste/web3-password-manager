import axios from 'axios'
import { BASE_API_URL } from '../../../config'

export const login = async (
	email: string,
	password: string
): Promise<{ success: boolean; user?: any; token: null | string; error?: any }> => {
	return new Promise((resolve, reject) => {
		axios
			.post(
				`${BASE_API_URL}/auth/verify`,
				{
					email,
					plaintext: password
				},
				{ withCredentials: true }
			)
			.then((res) => {
				if (res.data.success) {
					console.log('api - verify success:', res.data.success)
					axios
						.post(`${BASE_API_URL}/auth/login`, { email }, { withCredentials: true })
						.then((res) => {
							if (res.data.success) {
								console.log('api - login success:', res.data.success)
								resolve({
									success: true,
									user: res.data.user,
									token: res.data.accessToken
								})
							} else {
								console.log('api - login failed:', res.data.message)
								resolve({ success: false, token: null })
							}
						})
						.catch((err) => {
							console.error('api - login error:', err)
							reject({ error: err })
						})
				} else {
					console.log('api - verify failed:', res.data.message)
					return resolve({ success: false, token: null, error: res.data.message })
				}
			})
			.catch((err) => {
				console.error('api - verify error:', err)
				reject({ error: err })
			})
	})
}
