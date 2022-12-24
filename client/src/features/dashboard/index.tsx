import { Link } from 'react-router-dom'
import EmptyScreen from '../empty'

export default function Dashboard({ loggedIn }: { loggedIn: boolean }) {
	if (!loggedIn) return <EmptyScreen />

	return (
		<div className='Dashboard w-full h-full flex flex-col items-center'>
			Dashboard logged in
		</div>
	)
}
