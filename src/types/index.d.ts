export {}

// export interface IRefreshToken {
// 	token: string
// }

interface ICookieOptions {
	httpOnly: boolean
	secure: boolean
	sameSite: string
	maxAge: number
}

declare global {
	namespace Express {
		interface Request {
			body: any
			params: any
			query: any
			user: any
			cookies: any
		}
		interface Response {
			status: (code: number) => void | any
			json: (data: any) => void
			cookie: (key: string, value: string, options: ICookieOptions) => void
		}
	}
}
