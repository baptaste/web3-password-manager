import { verify } from '../../helpers/hash'
import User from '../../models/User'

class UserService {
	static async create(
		email: string,
		hash: string,
		passwordKey: string,
		encryptionKey: string
	): Promise<void> {
		const foundUser = await User.find().where('email').equals(email)

		if (foundUser[0]) {
			console.log('UserService - create, foundUser:', foundUser[0])
			throw `User already exists with email ${email}`
		}

		return new Promise((resolve, reject) => {
			console.log(
				'UserService - create user with email:',
				email,
				'and master password hash:',
				hash
			)

			User.create({
				email,
				master_password: hash,
				password_key: passwordKey,
				encryption_key: encryptionKey
			})
				.then((user) => {
					console.log('UserService - create user success')
					resolve(user)
				})
				.catch((err) => {
					console.log('UserService - create user error:', err)
					reject(err)
				})
		})
	}

	static verifyMasterPassword(hash: string, plaintext: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			console.log('UserService - verify master password with plaintext:', plaintext)
			verify(hash, plaintext)
				.then((match) => {
					if (match === true) {
						console.log('UserService - verify master password success:', match)
						resolve(true)
					} else {
						resolve(false)
					}
				})
				.catch((err) => {
					console.log('UserService - verify master password error:', err)
					reject(err)
				})
		})
	}

	static getEncryptionKey(userId: string): Promise<string> {
		return new Promise((resolve, reject) => {
			console.log('UserService - getEncryptionKey with user id:', userId)
			User.findById(userId)
				.then((user) => {
					if (user) {
						console.log(
							'UserService - getEncryptionKey success, key:',
							user.encryption_key
						)
						resolve(user.encryption_key)
					} else {
						reject('No user found with id ' + userId)
					}
				})
				.catch((err) => {
					console.log('UserService - getEncryptionKey error:', err)
					reject(err)
				})
		})
	}

	static getById(userId: string): Promise<string> {
		const userPasswordsField: string = 'user_passwords'

		return new Promise((resolve, reject) => {
			// console.log('UserService - getUser with user id:', userId)
			User.findById(userId)
				// populate user document with Passwords collection
				.populate(userPasswordsField)
				.then((user) => {
					if (user) {
						// console.log('UserService - getUser success, user:', user)
						resolve(user)
					} else {
						reject('No user found with id ' + userId)
					}
				})
				.catch((err) => {
					console.log('UserService - getUser error:', err)
					reject(err)
				})
		})
	}

	static getByField(field: string, value: string, populate: string[] = []): Promise<any> {
		const schemaPrefix: string = 'user_'

		if (populate.length) {
			for (let i = 0; i < populate.length; i++) {
				populate[i] = schemaPrefix.concat(populate[i])
			}
		}

		return new Promise((resolve, reject) => {
			console.log('UserService - getByFieldKeyValue, field:', field, ' value:', value)
			User.find()
				.where(field)
				.equals(value)
				.populate(populate)
				.then((users) => {
					//console.log('UserService - getByFieldKeyValue success, user:', users[0])
					resolve(users[0])
				})
				.catch((err) => {
					console.log('UserService - getByFieldKeyValue error:', err)
					reject(err)
				})
		})
	}

	static getAll(): Promise<any> {
		return new Promise((resolve, reject) => {
			console.log('UserService - get all users')
			User.find()
				.then((users) => {
					console.log('UserService - get all users success')
					resolve(users)
				})
				.catch((err) => {
					console.log('UserService - get all users error:', err)
					reject(err)
				})
		})
	}

	static async addPassword(userId: string, password: any): Promise<boolean> {
		const foundUser = await User.find({ userId })

		if (!foundUser[0]) {
			throw 'No user found with id ' + userId
		}

		return new Promise((resolve, reject) => {
			console.log(
				'UserService - adding new password item to user passwords with user id:',
				userId,
				'and password:',
				password
			)

			User.updateOne(
				{ _id: userId },
				{
					$push: {
						user_passwords: password
					}
				}
			)
				.then(() => {
					console.log('UserService - adding new password success')
					resolve(true)
				})
				.catch((err) => {
					console.log('UserService - adding new password error:', err)
					reject(err)
				})
		})
	}
}

export default UserService
