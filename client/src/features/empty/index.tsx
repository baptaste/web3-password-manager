import { Link } from 'react-router-dom'

import SleepingKoalaImg from '../../assets/img/sleeping-koala.jpg'

export default function EmptyScreen() {
	return (
		<div className='EmptyScreen w-full h-full flex flex-col items-center justify-between'>
			<h1 className='text-xl font-bold mb-5'>Wow, it's empty here</h1>

			<img
				loading='lazy'
				src={SleepingKoalaImg}
				width={250}
				height={250}
				className='rounded-full'
			/>

			<p className='font-bold text-md'>Sign up to start storing data</p>

			<div className='w-full flex items-center justify-between'>
				<Link
					to='/login'
					className='w-full mr-2 p-3 mt-12 rounded-3xl bg-sky-500 text-slate-100 cursor-pointer text-center'
				>
					Log in
				</Link>
				<Link
					to='/register'
					className='w-full ml-2 p-3 mt-12 rounded-3xl bg-sky-500 text-slate-100 cursor-pointer text-center'
				>
					Sign up
				</Link>
			</div>
		</div>
	)
}
