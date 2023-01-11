export interface IPassword {
	_id: string
	owner_id: string
	encryption_id: string
	title: string
	plaintext: string | null
	visible: boolean
	created_at: string
}

export type IPasswords = IPassword[]
