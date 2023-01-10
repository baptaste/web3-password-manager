import type { IButtonProps } from './Button.d'

// enum ButtonThemes {
// 	primary = 'bg-sky-500 text-slate-50 border-sky-500',
// 	secondary = 'bg-orange-500 text-slate-50 border-orange-500',
// 	tertiary = 'bg-slate-50 text-orange-500 border-orange-500',
// 	quaternary = 'bg-slate-50 text-sky-500 border-sky-500',
// 	quinary = 'bg-slate-50 text-slate-500 border-slate-500',
// 	disabled = 'bg-slate-200 text-slate-900/10 border-slate-200'
// }

enum ButtonThemes {
	primary = 'bg-zinc-900 text-zinc-50 border-zinc-900',
	secondary = 'bg-zinc-50 text-zinc-900 border-zinc-50',
	tertiary = 'bg-zinc-900 text-zinc-50 border-zinc-50',
	disabled = 'bg-zinc-200 text-zinc-900/10 border-zinc-200'
}

export function Button(props: IButtonProps) {
	const {
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
	} = props
	const getTheme = () => ButtonThemes[disabled ? 'disabled' : theme]
	const buttonTheme = getTheme()

	return (
		<button
			type={type}
			name={name}
			disabled={disabled}
			className={`w-full text-center p-3 mt-12 font-bold text-lg rounded-md drop-shadow-md cursor-pointer border-solid border-2 ${buttonTheme}`}
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
