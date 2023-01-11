import { Request, Response } from 'express'
import UserService from '../services/database/UserService'
import jwt from 'jsonwebtoken'
import { generateToken } from '../helpers/token'
import AuthService from '../services/database/AuthService'
import cookieParser from 'cookie-parser'
import { cookieOptions } from '../helpers/cookie'

export const authController = {
	// Begin - Authenticate User with email / password and send refresh token in response
	verify: async (req: Request, res: Response) => {
		const { email, plaintext } = req.body

		if (email.length === 0) {
			return res
				.status(401)
				.json({ success: false, message: 'No email found in request paylaod' })
		}

		if (plaintext.length === 0) {
			return res
				.status(401)
				.json({ success: false, message: 'No password found in request paylaod' })
		}

		const user = await UserService.getByField('email', email, ['passwords']) // TODO remove ['password'] => just for populate test
		console.log('/auth/verify - user:', user)

		if (!user) {
			return res
				.status(401)
				.json({ success: false, message: 'No user found in db with these credentials' })
		}

		// delete previous refresh token if exists
		console.log('/auth/verify - deleting previous refresh token in db...')
		await AuthService.deleteRefreshToken(user._id)
		console.log('/auth/verify - deleting previous refresh token cookie...')
		res.clearCookie('refresh_token')

		if (!user) {
			res.status(400).json({ success: false, message: `No user found with email ${email}` })
		} else {
			UserService.verifyMasterPassword(user.master_password, plaintext)
				.then((verified) => {
					if (verified) {
						const token = generateToken({ type: 'refresh', user, expiration: '7d' })

						AuthService.createRefreshToken(user._id, token)
							.then((refreshToken) => {
								console.log(
									'/auth/verify - refresh token stored in db:',
									refreshToken
								)
								console.log('/auth/verify - set cookie with refresh token...')

								// set refresh token in cookies
								// if it expires, user should have to login/authenticate again
								res.cookie('refresh_token', refreshToken, cookieOptions)

								res.status(200).json({ success: true, verified })
							})
							.catch((err) => {
								console.error('authController - createRefreshToken error:', err)
								res.status(400).json({ success: false, verified, message: err })
							})
					} else {
						res.status(200).json({
							success: false,
							verified: false,
							message: 'Invalid credentials'
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
	login: async (req: Request, res: Response) => {
		//TODO add Content-Type: application/json in client req headers

		if (req.body.email.length === 0) {
			return res.status(401).json({ success: false, message: 'Email is missing in payload' })
		}

		const { refresh_token } = req.cookies
		console.log('/auth/login - req.cookies:', req.cookies)
		console.log('/auth/login - refresh_token:', refresh_token)

		if (!refresh_token) {
			return res
				.status(401)
				.json({ success: false, message: 'Refresh token is missing in cookies' })
		}

		const user = await UserService.getByField('email', req.body.email)

		if (!user) {
			return res
				.status(401)
				.json({ success: false, message: `No user found with email ${req.body.email}` })
		} else {
			const verifiedToken = await AuthService.verifyRefreshToken(user._id, refresh_token)
			console.log('/auth/login - verifiedToken:', verifiedToken)

			if (!verifiedToken) {
				return res
					.status(401)
					.json({ success: false, message: 'No refresh token found in db' })
			}
			// TODO
			// add address in token payload if logged to MetaMask/Wallet Provider

			const accessToken = generateToken({ type: 'access', user, expiration: '15m' })
			console.log('/auth/login - accessToken:', accessToken)

			res.json({ success: true, user: { id: user._id, email: user.email }, accessToken })
		}
	},

	// Refresh user ressources access by login in him again with new access token
	refresh: async (req: Request, res: Response) => {
		// get token from cookies
		const token = req.cookies.refresh_token
		const { user } = req
		console.log('/auth/refresh - refresh_token:', token)

		console.log('/auth/refresh - req.user:', user)

		if (!token) {
			return res.status(401).json({ success: false, message: 'No refresh token in cookies' })
		}

		// verify token in db with user id from jwt verify payload
		const verifiedToken = await AuthService.verifyRefreshToken(user.id, token)
		console.log('/auth/refresh - verifiedToken:', verifiedToken)

		if (!verifiedToken) {
			return res.status(401).json({ success: false, message: 'No refresh token found in db' })
		}

		const newAccessToken = generateToken({ type: 'access', user, expiration: '15m' })
		console.log('/auth/refresh - newAccessToken:', newAccessToken)

		res.json({ success: true, user, accessToken: newAccessToken })

		// TODO add refresh token rotation method
	},

	// Delete user refresh token in db and cookie, access token set to null in client
	logout: async (req: Request, res: Response) => {
		const { refresh_token } = req.cookies
		const { user } = req

		if (!refresh_token || !user) {
			return res
				.status(401)
				.json({ success: false, message: 'Cannot logout user since he is not logged in' })
		}

		console.log('/auth/logout - deleting previous refresh token in db...')
		await AuthService.deleteRefreshToken(user._id)
		console.log('/auth/logout - deleting previous refresh token cookie...')
		res.clearCookie('refresh_token')

		res.json({ success: true })
	}
}
