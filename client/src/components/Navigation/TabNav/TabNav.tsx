import { Link } from 'react-router-dom'
import { HomeIcon, PlusSmallIcon, UserIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../../../providers/auth'

export function TabNav() {
	const { loggedIn } = useAuth()

	const links = [
		{
			path: '/dashboard',
			name: 'Dashboard',
			icon: <HomeIcon className='w-8 h-8 text-sky-500' />,
			containerClass: 'w-14 h-14 flex justify-center items-center'
		},
		// {
		// 	path: loggedIn ? '/dashboard' : '/auth/login',
		// 	name: loggedIn ? 'Dashboard' : 'Login',
		// 	icon: <PlusSmallIcon className='w-8 h-8 text-orange-500' />,
		// 	containerClass: `w-12 h-12 flex justify-center items-center bg-slate-50 rounded-full border-solid border-2 border-sky-500 drop-shadow-[0_10px_16px_rgba(0,0,0,0.2)] absolute bottom-10 left-[${
		// 		window.innerWidth / 2
		// 	}]`
		// },
		{
			// path: loggedIn ? '/profile' : '/auth/login',
			path: null,
			// name: loggedIn ? 'ProfilePage' : 'Login',
			name: null,
			// icon: <UserIcon className='w-8 h-8 text-sky-500' />,
			icon: null,
			containerClass: 'w-14 h-14 flex justify-center items-center'
		}
	]

	return (
		<div className='TabNav md:hidden fixed bottom-0 left-0 w-screen h-16 border-t border-solid border-1 border-zinc-300 dark:border-zinc-800'>
			<nav className='w-full h-full flex items-center justify-around bg-black-100'>
				{links.map(({ path, name, icon, containerClass }: any) => (
					<div key={name} className={containerClass}>
						<Link key={name} to={path} className='flex justify-center items-center'>
							{icon}
						</Link>
					</div>
				))}
			</nav>
		</div>
	)
}
