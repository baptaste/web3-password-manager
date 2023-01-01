import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../common/components/Button'
import { BASE_API_URL } from '../../../common/helpers/constants'

export default function Profile({ accessToken, setAccessToken }: any) {
	const [loading, setLoading] = useState<boolean>(false)
	const navigate = useNavigate()

	const handleLogout = async () => {
		setLoading(true)
		try {
			const res = await axios.get(`${BASE_API_URL}/auth/logout`, {
				withCredentials: true
			})

			if (res && res.data.success) {
				console.log('--------- Logout res:', res)
				setLoading(false)
				setAccessToken(null)
				navigate('/')
			}
		} catch (error) {
			console.error('Logout error:', error)
		}
	}

	return (
		<div className='Home w-full lg:w-1/3 h-full flex flex-col items-center'>
			<h1 className='text-5xl text-green-500'>Profile</h1>
			<h2 className='w-2/3 text-green-500 text-center'>accessToken:</h2>
			<h3 className='w-full text-center break-all'>{accessToken}</h3>

			<Button text='Log out' theme='quinary' onClick={handleLogout} />
		</div>
	)
}
