import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Spinner } from '../../../../components/Common'
import { useAuth } from '../../../../providers/auth'
import { logout } from '../../api'

export function Logout() {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [errorMsg, setErrorMsg] = useState<string>('')
	const navigate = useNavigate()
	const { setAccessToken } = useAuth()

	const handleLogout = async () => {
		setIsLoading(true)
		const { success, error } = await logout()

		if (success) {
			setIsLoading(false)
			setAccessToken(null)
			navigate('/')
		} else if (error) {
			setIsLoading(false)
			setErrorMsg('Sorry, an error occured while login you out, please try again')
		}
	}

	if (isLoading) return <Spinner />

	return (
		<>
			<Button text='Log out' theme='quinary' onClick={handleLogout} />
			{errorMsg.length ? (
				<p className='w-full text-center text-red-500 text-md my-4'>{errorMsg}</p>
			) : null}
		</>
	)
}
