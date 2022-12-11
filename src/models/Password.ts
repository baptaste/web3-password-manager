import mongoose from 'mongoose'

const Schema = mongoose.Schema

const PasswordSchema = new Schema(
	{
		owner_id: { type: Schema.Types.ObjectId, ref: 'User' },
		title: {
			type: String,
			required: [true, 'Title is required.']
		},
		encryption_id: {
			type: String,
			required: [true, 'Encryption ID is required.']
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
