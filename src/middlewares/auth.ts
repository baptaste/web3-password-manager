import { Request, Response, NextFunction } from 'express'
import jwt, { TokenExpiredError } from 'jsonwebtoken'

const { ACCESS_TOKEN_SECRET } = process.env

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
	const authHeader = req.headers['authorization']
	const accessToken = authHeader ? authHeader?.split(' ')[1] : null
	console.log('verifyToken middleware - accessToken:', accessToken)

	if (accessToken === null) {
		console.error('Unauthorized - No Access Token found in Headers')
		return res.sendStatus(401)
	}

	const secretKey = ACCESS_TOKEN_SECRET || ''

	jwt.verify(accessToken, secretKey, (err, user) => {
		if (err) {
			if (err instanceof TokenExpiredError) {
				console.log('err instanceof TokenExpiredError :', err instanceof TokenExpiredError)
				console.error('Forbidden - Access Token expired:', err)
				return res.sendStatus(403)
			} else {
				console.error('Forbidden. Error:', err)
				return res.sendStatus(403)
			}
		}
		console.log('verifyToken middleware - verify jwt success, user:', user)
		req.user = user
		next()
	})
}
