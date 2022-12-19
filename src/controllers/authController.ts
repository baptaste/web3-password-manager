import UserService from '../services/database/UserService'
import jwt from 'jsonwebtoken'
import { generateToken } from '../helpers/token'
import AuthService from '../services/database/AuthService'
import cookieParser from 'cookie-parser'

export const authController = {
	// Authenticate User with email / password and send refresh token in response
	verifyUser: async (req: Express.Request, res: Express.Response) => {
		const { email, plaintext } = req.body

		if (plaintext.length === 0) {
			res.status(400).json({ success: false, message: 'No password found' })
		}

		const user = await UserService.getByField('email', email, ['passwords']) // TODO remove ['password'] => just for populate test
		console.log('/auth/verify - user:', user)

		if (!user) {
			res.status(400).json({ success: false, message: `No user found with email ${email}` })
		} else {
			UserService.verifyMasterPassword(user.master_password, plaintext)
				.then((match) => {
					if (match) {
						const token = generateToken({ type: 'refresh', user, expiration: '1h' })

						AuthService.createRefreshToken(user._id, token)
							.then((refreshToken) => {
								console.log('/auth/verify - refresh token stored in db:', refreshToken)
								console.log('/auth/verify - set cookie with refresh token...')

								// SET COOKIE with refresh token
								res.cookie('refresh_token', refreshToken, {
									httpOnly: true,
									secure: process.env.NODE_ENV === 'production',
									sameSite: 'strict',
									maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year
								})

								res.status(200).json({ success: true, match })
							})
							.catch((err) => {
								console.error('authController - createRefreshToken error:', err)
								res.status(400).json({ success: false, message: err })
							})
					}
				})
				.catch((err) => {
					console.error('authController - verifyMasterPassword error:', err)
					res.status(400).json({ success: false, message: err })
				})
		}
	},

	// Authorize User with JWT (already authenticated with verifyUser method)
	loginUser: async (req: Express.Request, res: Express.Response) => {
		//TODO add Content-Type: application/json in client req headers

		if (req.body.email.length === 0) {
			return res.status(400).json({ success: false, message: 'No email found' })
		}

		const { refresh_token } = req.cookies
		console.log('/auth/login - req.cookies:', req.cookies)
		console.log('/auth/login - refresh_token:', refresh_token)

		if (!refresh_token) {
			return res.status(401).json({ success: false, message: 'No refresh token found in cookies' })
		}

		const user = await UserService.getByField('email', req.body.email)

		if (!user) {
			return res.status(400).json({ success: false, message: `No user found with email ${req.body.email}` })
		} else {
			const verifiedToken = await AuthService.verifyRefreshToken(user._id, refresh_token)
			console.log('/auth/login - verifiedToken:', verifiedToken)

			if (!verifiedToken) {
				return res.status(401).json({ success: false, message: 'No refresh token found in db' })
			}
			// TODO
			// add address in token payload if logged to MetaMask/Wallet Provider
			// add expiration when we have a refresh token later

			const accessToken = generateToken({ type: 'access', user, expiration: 15 })
			console.log('/auth/login - accessToken:', accessToken)

			res.json({ success: true, accessToken })
		}
	}
}
