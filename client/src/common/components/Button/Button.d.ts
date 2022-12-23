export declare interface IButtonProps {
	text: string

	type?: 'button' | 'reset' | 'submit'
	name?: string
	theme?: 'primary' | 'secondary' | 'tertiary' | 'quaternary'
	disabled?: boolean
	icon?: JSX.Element | null

	onClick?: ((e: MouseEventHandler<Element>) => void) | undefined
	onSubmit?: ((e: MouseEventHandler<Element>) => void) | undefined
	onMouseEnter?: (e: React.MouseEvent) => void
	onMouseLeave?: (e: React.MouseEvent) => void
}
