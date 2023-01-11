import { Link } from 'react-router-dom'
import { CustomLink } from '../../components/Common'
import { VisiterLayout } from '../../components/Layout'

export function Landing() {
	return (
		<VisiterLayout title='Web3 storage app'>
			<div className='Landing w-full h-full flex flex-col items-center justify-center'>
				<h1 className='text-zinc-900 dark:neon-blur w-full text-5xl font-bold mb-5'>
					Decentralized
					<br />
					storage
					<br />
					solution
				</h1>
				<p className='text-lg leading-relaxed text-zinc-400'>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
					incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
					nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
				</p>
				<CustomLink path='/auth/login' text='Store data now' theme={'secondary'} />
			</div>
		</VisiterLayout>
	)
}
