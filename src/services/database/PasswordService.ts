import Password from '../../models/Password'

interface ICreateProps {
	title: string
	owner_id: string
	encryption_id: string
}

class PasswordService {
	static create(data: ICreateProps): Promise<any> {
		return new Promise((resolve, reject) => {
			console.log('PasswordService - create password with data:', data)
			Password.create(data)
				.then((password) => {
					console.log('PasswordService - create password success')
					resolve(password)
				})
				.catch((err) => {
					console.log('PasswordService - create password error:', err)
					reject(err)
				})
		})
	}

	static getPassword(id: string): Promise<any> {
		const ownerIdField: string = 'owner_id'

		return new Promise((resolve, reject) => {
			console.log('PasswordService - get password with id:', id)
			Password.find({ encryption_id: id })
				// populate password document with Users collection
				.populate(ownerIdField)
				.then((password) => {
					console.log('PasswordService - get password success')
					resolve(password[0])
				})
				.catch((err) => {
					console.log('PasswordService - get password error:', err)
					reject(err)
				})
		})
	}

	static getAll(): Promise<any> {
		return new Promise((resolve, reject) => {
			console.log('PasswordService - get all passwords')
			Password.find()
				.then((passwords) => {
					console.log('PasswordService - get all passwords success')
					resolve(passwords)
				})
				.catch((err) => {
					console.log('PasswordService - get all passwords error:', err)
					reject(err)
				})
		})
	}

	static count(): Promise<any> {
		return new Promise((resolve, reject) => {
			console.log('PasswordService - count')
			Password.count()
				.then((count) => {
					console.log('PasswordService - count success')
					resolve(count)
				})
				.catch((err) => {
					console.log('PasswordService - count error:', err)
					reject(err)
				})
		})
	}
}

export default PasswordService
