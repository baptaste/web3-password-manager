import { Link } from 'react-router-dom'

export function TabNav({ loggedIn }: any) {
	return (
		<div className='TabNav md:hidden w-screen h-16 bg-red-700 px-3 py-2 fixed bottom-0 left-0'>
			<nav className='w-full h-full flex items-center justify-evenly bg-black-100'>
				<Link to={'/'}>Home</Link>
				<Link to={'/login'}>Account</Link>
			</nav>
		</div>
	)
}
