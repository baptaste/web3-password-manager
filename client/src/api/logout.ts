import axios from 'axios'
import { BASE_API_URL } from '../config'

export const logout = async (): Promise<{ success: boolean; error: any }> => {
	let success: boolean = false
	let error: any = null

	try {
		const res = await axios.get(`${BASE_API_URL}/auth/logout`, {
			withCredentials: true
		})
		if (res.data.success) {
			console.log('api - logout success:', res.data.success)
			success = true
		}
	} catch (err) {
		console.error('api - logout error:', err)
		error = err
	}

	return { success, error }
}
