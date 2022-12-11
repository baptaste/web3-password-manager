import { verify } from '../../helpers/hash'
import User from '../../models/User'

class UserService {
	static async create(email: string, hash: string, encryptionKey: string): Promise<void> {
		const foundUser = await User.find({ email })

		return new Promise((resolve, reject) => {
			console.log('UserService - create user with email:', email, 'and master password hash:', hash)

			if (foundUser) {
				reject('User already exists with this email')
			}

			User.create({ email, master_password: hash, encryption_key: encryptionKey })
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
					if (match) {
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
						console.log('UserService - getEncryptionKey success, key:', user.encryption_key)
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

	static get(userId: string): Promise<string> {
		const userPasswordsField: string = 'user_passwords'

		return new Promise((resolve, reject) => {
			console.log('UserService - getUser with user id:', userId)
			User.findById(userId)
				// populate user document with Passwords collection
				.populate(userPasswordsField)
				.then((user) => {
					if (user) {
						console.log('UserService - getUser success, user:', user)
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

		return new Promise((resolve, reject) => {
			console.log('UserService - adding new password item to user passwords with user id:', userId, 'and password:', password)

			if (!foundUser) {
				reject('No user found with id ' + userId)
			}

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
