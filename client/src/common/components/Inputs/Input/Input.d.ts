type InputType =
	| 'button'
	| 'checkbox'
	| 'color'
	| 'date'
	| 'datetime-local'
	| 'email'
	| 'file'
	| 'hidden'
	| 'image'
	| 'month'
	| 'number'
	| 'password'
	| 'radio'
	| 'range'
	| 'reset'
	| 'search'
	| 'submit'
	| 'tel'
	| 'text'
	| 'time'
	| 'url'
	| 'week'

export declare interface IInputProps {
	type?: InputType
	placeholder: string

	value?: string

	label?: string | null
	name?: string

	error?: boolean
	validated?: boolean

	disabled?: boolean
	required?: boolean

	onClick?: ((e: MouseEventHandler<Element>) => void) | undefined
	onChange?: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined
}
