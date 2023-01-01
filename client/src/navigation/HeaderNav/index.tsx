import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'

export default function HeaderNav() {
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const goBack = () => navigate(-1)

	return (
		<div className='HeaderNav w-screen h-16 flex items-center justify-between p-4 bg-slate-50 border-b border-solid border-1 border-slate-300 fixed top-0 left-0'>
			{pathname !== '/' ? (
				<button className='GoBack justify-start' onClick={goBack}>
					<ArrowLeftIcon className='w-6 h-6 text-slate-500' />
				</button>
			) : null}
			<Link to='/'>Home</Link>
			<Link to='/'>
				<Cog6ToothIcon className='w-6 h-6 text-slate-500' />
			</Link>
		</div>
	)
}
