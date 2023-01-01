import axios from 'axios'
import { BASE_API_URL } from '../constants'

export const register = async (
	email: string,
	password: string
): Promise<{ success: boolean; error: any }> => {
	let success: boolean = false
	let error: any = null

	try {
		const res = await axios.post(`${BASE_API_URL}/users/create`, {
			email,
			plaintext: password
		})
		if (res.data.success) {
			console.log('api - register success:', res.data.success)
			success = true
		}
	} catch (err) {
		console.error('api - register error:', err)
		error = err
	}

	return { success, error }
}
