import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema(
	{
		email: {
			type: String,
			unique: true,
			required: [true, 'Email is required.']
		},
		master_password: {
			type: String,
			unique: true,
			required: [true, 'Master password is required.']
		},
		encryption_key: {
			type: String,
			unique: true,
			required: [true, 'Encryption key is required.']
		},
		// not necessary during creation process (add it when first login to wallet provider)
		address: {
			type: String,
			unique: true
		},
		user_passwords: [{ type: Schema.Types.ObjectId, ref: 'Password' }],
		created_at: {
			type: Date,
			immutable: true,
			default: () => Date.now()
		}
	},
	{
		versionKey: false
	}
)

export default mongoose.models.User || mongoose.model('User', UserSchema)
