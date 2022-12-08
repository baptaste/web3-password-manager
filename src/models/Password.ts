import mongoose from 'mongoose'

const Schema = mongoose.Schema

const PasswordSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Name is required.']
		},
		hash_id: {
			type: String,
			required: [true, 'Hash ID is required.']
		},
		owner_id: {
			type: Schema.Types.ObjectId,
			ref: 'Owner'
		},
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

export default mongoose.models.Password || mongoose.model('Password', PasswordSchema)
