import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../../api/logout'
import Button from '../../../components/common/buttons/Button'

export default function Profile({ accessToken, setAccessToken }: any) {
	const [loading, setLoading] = useState<boolean>(false)
	const [errorMsg, setErrorMsg] = useState<string>('')
	const navigate = useNavigate()

	const handleLogout = async () => {
		setLoading(true)
		const { success, error } = await logout()

		if (success) {
			setLoading(false)
			setAccessToken(null)
			navigate('/')
		} else if (error) {
			setLoading(false)
			setErrorMsg('Sorry, an error occured while login you out, please try again')
		}
	}

	return (
		<div className='Home w-full lg:w-1/3 h-full flex flex-col items-center'>
			<h1 className='text-5xl text-green-500'>Profile</h1>

			{loading ? (
				<>
					<p className='text-xl'>Loading...</p>
					<p className='text-xl'>Log out to your account</p>
				</>
			) : (
				<>
					<h2 className='w-2/3 text-green-500 text-center'>accessToken:</h2>
					<h3 className='w-full text-center break-all'>{accessToken}</h3>

					<Button text='Log out' theme='quinary' onClick={handleLogout} />

					{errorMsg.length ? (
						<p className='w-full text-center text-red-500 text-md my-4'>{errorMsg}</p>
					) : null}
				</>
			)}
		</div>
	)
}
