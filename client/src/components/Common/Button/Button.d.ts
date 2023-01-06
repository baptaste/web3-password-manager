import { FormEventHandler, MouseEventHandler } from 'react'

export declare interface IButtonProps {
	text: string

	type?: 'button' | 'reset' | 'submit'
	name?: string
	theme?: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'quinary'
	disabled?: boolean
	icon?: JSX.Element | null

	onClick?: ((e?: React.MouseEvent) => void) | undefined
	onSubmit?: ((e: FormEvent<HTMLFormElement>) => void) | undefined
	onMouseEnter?: (e: React.MouseEvent) => void
	onMouseLeave?: (e: React.MouseEvent) => void
}
