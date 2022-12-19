import { Request, Response, NextFunction } from 'express'
import jwt, { VerifyErrors, TokenExpiredError, JwtPayload } from 'jsonwebtoken'

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env

export const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers['authorization']
	const accessToken = authHeader ? authHeader?.split(' ')[1] : null
	console.log('verifyAccessToken middleware - accessToken:', accessToken)

	if (accessToken === null) {
		console.log('Unauthorized - No Access Token found in Headers')
		return res.sendStatus(401)
	}

	const secretKey = ACCESS_TOKEN_SECRET || ''

	jwt.verify(accessToken, secretKey, (err, decoded) => {
		if (err) {
			if (err instanceof TokenExpiredError) {
				console.log('err instanceof TokenExpiredError :', err instanceof TokenExpiredError)
				console.log('Forbidden - Access Token expired:', err)
				return res.sendStatus(403)
			} else {
				console.log('Forbidden. Error:', err)
				return res.sendStatus(403)
			}
		}
		console.log('verifyAccessToken middleware - verify jwt success, user:', decoded)
		req.user = decoded
		next()
	})
}

export const verifyRefreshToken = (req: Request, res: Response, next: NextFunction) => {
	const refreshToken = req.cookies.refresh_token
	console.log('verifyRefreshToken middleware - refreshToken:', refreshToken)

	if (refreshToken === null) {
		console.log('Unauthorized - No Refresh Token found in Headers')
		return res.sendStatus(401)
	}

	const secretKey = REFRESH_TOKEN_SECRET || ''

	jwt.verify(refreshToken, secretKey, (err: any, decoded: any) => {
		if (err) {
			if (err instanceof TokenExpiredError) {
				console.log('err instanceof TokenExpiredError :', err instanceof TokenExpiredError)
				console.log('Forbidden - Refresh Token expired:', err)
				return res.sendStatus(403)
			} else {
				console.log('Forbidden. Error:', err)
				return res.sendStatus(403)
			}
		}
		console.log('verifyRefreshToken middleware - verify jwt success, user:', decoded)
		req.user = decoded
		next()
	})
}
