import { Request, Response, NextFunction } from 'express'
import jwt, { VerifyErrors, TokenExpiredError, JwtPayload, JsonWebTokenError } from 'jsonwebtoken'

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env

type VerifyTokenResult = VerifyErrors | JwtPayload | string | undefined

const verifyToken = (token: string, secret: string): VerifyTokenResult => {
	let result: VerifyTokenResult = undefined

	jwt.verify(token, secret, (err, decoded) => {
		err ? (result = err) : (result = decoded)
	})

	return result
}

const sendAuthResult = (
	result: VerifyTokenResult,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (
		process.env.NODE_ENV === 'production' &&
		(result instanceof TokenExpiredError || result instanceof JsonWebTokenError)
	) {
		return res.sendStatus(403)
	}

	if (result instanceof TokenExpiredError) {
		return res.status(403).json({ success: false, message: 'Forbidden - Token expired' })
	} else if (result instanceof JsonWebTokenError) {
		return res.status(403).json({ success: false, message: `Forbidden - ${result}` })
	}

	req.user = result
	next()
}

export const handleAuth = (req: Request, res: Response, next: NextFunction) => {
	let secretKey: string = ''
	let token: string | null = null

	const accessTokenRoutes: string[] = ['/api/users/:id', '/api/users/create']

	const needAccess: boolean = accessTokenRoutes.includes(req.route.path)
	const needRefresh: boolean = req.route.path === '/api/auth/refresh'

	if (needAccess) {
		const authHeader = req.headers['authorization']
		token = authHeader ? authHeader?.split(' ')[1] : null
	} else if (needRefresh) {
		token = req.cookies.refresh_token
	}

	if (token === null) {
		if (process.env.NODE_ENV === 'production') return res.sendStatus(401)
		return res.status(401).json({
			success: false,
			message: `Unauthorized - No ${needAccess ? 'access' : 'refresh'} token found in headers`
		})
	}

	secretKey = needAccess ? (ACCESS_TOKEN_SECRET as string) : (REFRESH_TOKEN_SECRET as string)
	const result = verifyToken(token, secretKey)
	sendAuthResult(result, req, res, next)
}
