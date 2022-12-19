import Password from '../../models/Password'

class PasswordService {
	static async create(title: string, userId: string, randomId: string): Promise<any> {
		const foundPassword = await Password.find().where('encryption_id').equals(randomId)

		if (foundPassword[0]) {
			console.log('PasswordService - create, foundPassword:', foundPassword[0])
			throw `Password already exists with randomId ${randomId}`
		}

		return new Promise((resolve, reject) => {
			console.log('PasswordService - create password with title:', title, ' userId:', userId, ' randomId:', randomId)
			Password.create({ title, owner_id: userId, encryption_id: randomId })
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
		// const ownerIdField: string = 'owner_id'

		return new Promise((resolve, reject) => {
			console.log('PasswordService - get password with id:', id)
			Password.find()
				.where('encryption_id')
				.equals(id)
				// // populate password document with Users collection
				// .populate(ownerIdField)
				.then((passwords) => {
					console.log('PasswordService - get password success')
					resolve(passwords[0])
				})
				.catch((err) => {
					console.log('PasswordService - get password error:', err)
					reject(err)
				})
		})
	}

	static getAll(userId: string): Promise<any> {
		return new Promise((resolve, reject) => {
			console.log('PasswordService - get all passwords')
			Password.find()
				.where('owner_id')
				.equals(userId)
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
