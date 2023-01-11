import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import { RocketLaunchIcon } from '@heroicons/react/24/solid'

interface IHeaderNavProps {
	title: string
	showSettings?: boolean
}

export function HeaderNav({ title, showSettings = false }: IHeaderNavProps) {
	const navigate = useNavigate()
	const location = useLocation()
	const goBack = () => navigate(-1)

	return (
		<div className='HeaderNav fixed top-0 left-0 w-screen h-16 flex items-center justify-between p-4 border-b border-solid border-1 border-zinc-300 dark:border-zinc-800'>
			{location.pathname !== '/' ? (
				<button className='GoBack justify-start' onClick={goBack}>
					<ArrowLeftIcon className='w-6 h-6 text-slate-500' />
				</button>
			) : (
				<button className='GoBack justify-start' onClick={goBack}>
					<RocketLaunchIcon className='w-8 h-8 text-zinc-900 dark:text-zinc-50' />
				</button>
			)}
			<p className='text-xl font-bold'>{title}</p>
			{showSettings ? (
				<Link to='/'>
					<Cog6ToothIcon className='w-6 h-6 text-slate-500' />
				</Link>
			) : null}
		</div>
	)
}
