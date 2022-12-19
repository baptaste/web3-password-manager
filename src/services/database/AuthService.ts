import Token from '../../models/Token'
// import { IRefreshToken } from '../../types'

class AuthService {
	static createRefreshToken(userId: string, token: string): Promise<string> {
		return new Promise((resolve, reject) => {
			console.log('AuthService - create refresh token with userId:', userId, ' token:', token)

			Token.create({ user_id: userId, value: token })
				.then((token) => {
					console.log('AuthService - create refresh token success, token:', token)
					resolve(token.value)
				})
				.catch((err) => {
					console.log('AuthService - create refresh token error:', err)
					reject(err)
				})
		})
	}

	static verifyRefreshToken(userId: string, token: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			console.log('AuthService - verify refresh token with userId:', userId, ' token:', token)

			Token.find({ user_id: userId, value: token })
				.then((token) => {
					if (token) {
						console.log('AuthService - verify refresh token success, token:', token)
						resolve(true)
					} else {
						console.log('AuthService - verify refresh token failed, not found')
						resolve(false)
					}
				})
				.catch((err) => {
					console.log('AuthService - verify refresh token error:', err)
					reject(err)
				})
		})
	}
}

export default AuthService
