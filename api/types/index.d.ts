export {}

declare global {
	namespace Express {
		interface Request {
			body: any
			params: any
			query: any
		}
		interface Response {
			status: (code: number) => void | any
			json: (data: any) => void
		}
	}
}
