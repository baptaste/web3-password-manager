import type { IButtonProps } from './Button.d'

enum ButtonThemes {
	primary = 'bg-sky-500 text-slate-50 border-sky-500',
	secondary = 'bg-orange-500 text-slate-50 border-orange-500',
	tertiary = 'bg-slate-50 text-orange-500 border-orange-500',
	quaternary = 'bg-slate-50 text-sky-500 border-sky-500',
	disabled = 'bg-slate-200 text-slate-900/10 border-slate-200'
}

export default function Button({
	text,
	type = 'button',
	name = type,
	theme = 'primary',
	disabled = false,
	icon = null,
	onClick,
	onSubmit,
	onMouseEnter,
	onMouseLeave
}: IButtonProps) {
	const getTheme = () => ButtonThemes[disabled ? 'disabled' : theme]
	const buttonTheme = getTheme()

	return (
		<button
			type={type}
			name={name}
			disabled={disabled}
			className={`w-full p-3 mt-12 font-bold text-lg rounded-md drop-shadow-md cursor-pointer border-solid border-2 ${buttonTheme}`}
			onClick={onClick}
			onSubmit={onSubmit}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			{icon ? icon : null}
			{text}
		</button>
	)
}
