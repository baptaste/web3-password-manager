export declare interface ICustomLinkProps {
	path: string
	text: string

	classes?: string

	theme?: 'primary' | 'secondary' | 'tertiary'
	disabled?: boolean
	icon?: JSX.Element | null

	onClick?: ((e?: React.MouseEvent) => void) | undefined
	onMouseEnter?: (e: React.MouseEvent) => void
	onMouseLeave?: (e: React.MouseEvent) => void
}
