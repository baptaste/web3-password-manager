import jwt from 'jsonwebtoken'
// import { IRefreshToken } from '../types'

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env

interface IGenerateTokenProps {
	type: 'access' | 'refresh'
	user: any
	expiration?: string | number
}

export function generateToken({ type = 'access', user, expiration = 60 }: IGenerateTokenProps): string {
	const secretKey: string = type === 'refresh' ? REFRESH_TOKEN_SECRET || '' : ACCESS_TOKEN_SECRET || ''
	const payload = { id: user._id, email: user.email }
	return jwt.sign(payload, secretKey, { expiresIn: expiration })
}
