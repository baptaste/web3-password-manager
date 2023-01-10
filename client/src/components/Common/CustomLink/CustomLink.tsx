import { Link } from 'react-router-dom'
import type { ICustomLinkProps } from './CustomLink.d'

// enum LinkThemes {
// 	primary = 'bg-sky-500 text-slate-50 border-sky-500',
// 	secondary = 'bg-orange-500 text-slate-50 border-orange-500',
// 	tertiary = 'bg-slate-50 text-orange-500 border-orange-500',
// 	quaternary = 'bg-slate-50 text-sky-500 border-sky-500',
// 	quinary = 'bg-slate-50 text-slate-500 border-slate-500'
// }

enum LinkThemes {
	primary = 'bg-zinc-50 text-zinc-900 border-zinc-50 dark:bg-zinc-900 dark:text-zinc-50 dark:border-zinc-900',
	secondary = 'bg-zinc-900 text-zinc-50 border-zinc-900 dark:bg-zinc-50 dark:text-zinc-900 dark:border-zinc-50',
	tertiary = 'bg-zinc-50 text-zinc-900 border-zinc-900 dark:bg-zinc-900 dark:text-zinc-50 dark:border-zinc-50'
}

export function CustomLink({ path, text, theme = 'primary', classes = '' }: ICustomLinkProps) {
	const getTheme = () => LinkThemes[theme]
	const linkTheme = getTheme()
	const defaultClasses = `w-full text-center p-3 mt-12 font-bold text-lg rounded-md drop-shadow-md cursor-pointer border-solid border-2 ${linkTheme}`
	const className = classes.length ? `${classes} ${linkTheme}` : defaultClasses

	return (
		<Link to={path} className={className}>
			{text}
		</Link>
	)
}
