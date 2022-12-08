import mongoose from 'mongoose'

const Schema = mongoose.Schema

const OwnerSchema = new Schema(
	{
		// not necessary during creation process
		address: {
			type: String,
			unique: true
		},
		// WIP - not required for development purpose
		master_password: {
			type: String,
			unique: true
			// required: [true, 'Master password is required.']
		},
		encryption_key: {
			type: String,
			unique: true
			// required: [true, 'Master password is required.']
		},
		owner_passwords: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Password'
			}
		],
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

export default mongoose.models.Owner || mongoose.model('Owner', OwnerSchema)
