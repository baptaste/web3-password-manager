import { useRef, useState } from 'react'
import { useNavigate, redirect, Link } from 'react-router-dom'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { BASE_API_URL } from '../../../common/helpers/constants'
import Button from '../../../common/components/Button'

export default function Login({ setAccessToken }: any) {
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
	const masterPasswordRef = useRef()
	const emailRef = useRef()
	const [loading, setLoading] = useState<boolean>(false)
	const navigate = useNavigate()

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setLoading(true)
		let email: string = ''

		try {
			if (masterPasswordRef.current && emailRef.current) {
				email = emailRef.current.value
				const verifyRes = await axios.post(
					`${BASE_API_URL}/auth/verify`,
					{
						email: emailRef.current.value,
						plaintext: masterPasswordRef.current.value
					},
					{ withCredentials: true }
				)
				console.log('1 - verify email & password, res:', verifyRes)

				if (verifyRes.data.success) {
					try {
						console.log('Login - authenticated, requesting refresh token...')

						const loginRes: any = await axios.post(
							`${BASE_API_URL}/auth/login`,
							{ email },
							{ withCredentials: true }
						)
						console.log('2 - login, res:', loginRes)

						if (loginRes.data.success) {
							setLoading(false)
							const { accessToken } = loginRes.data
							console.log('2- after login, accessToken:', accessToken)
							setAccessToken((prev: any) => (prev = accessToken))
							navigate('/')
						}
					} catch (error) {
						console.error(error)
					}
				}
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className='Login lg:w-1/2 md:w-full h-full flex flex-col items-center justify-center'>
			<h1 className='text-2xl font-bold mb-5'>Log in to NAME</h1>

			{loading ? (
				<>
					<p className='text-xl'>Loading...</p>
					<p className='text-xl'>Verifying account</p>
				</>
			) : (
				<>
					<div className='text-lg'>
						Not yet registered ?{' '}
						<Link to={'/register'} className='font-bold'>
							Sign up
						</Link>
					</div>

					<form
						onSubmit={handleSubmit}
						className='CreatePasswordForm w-full h-2/3 flex flex-col items-center justify-evenly'
					>
						<div className='inputContainer w-full flex flex-col items-center justify-between my-4 py-3'>
							<label htmlFor='email' className='w-full mb-3 text-left text-lg'>
								Email
							</label>
							<div className='w-full flex items-center justify-between'>
								{/* //TODO add email validation regex */}
								<input
									ref={emailRef}
									name='email'
									type='text'
									placeholder='Enter an email'
									className='w-full h-full rounded-md p-4 text-slate-900 bg-slate-200'
								/>
							</div>
						</div>

						<div className='inputContainer w-full flex flex-col items-center justify-between my-4 py-3'>
							<label
								htmlFor='password'
								className='w-full flex flex-col mb-3 text-left text-lg	'
							>
								Master Password (Never send it to anyone)
							</label>
							<div className='w-full flex items-center justify-between relative'>
								{/* //TODO add password validation regex */}
								<input
									ref={masterPasswordRef}
									type={isPasswordVisible ? 'text' : 'password'}
									name='password'
									placeholder='Enter your password'
									className='w-full h-full rounded-md p-4 text-slate-900 bg-slate-200'
								/>
								{isPasswordVisible ? (
									<EyeSlashIcon
										className='h-6 w-6 text-blue-500 cursor-pointer absolute right-5'
										onClick={() => setIsPasswordVisible(false)}
									/>
								) : (
									<EyeIcon
										className='h-6 w-6 text-blue-500 cursor-pointer absolute right-5'
										onClick={() => setIsPasswordVisible(true)}
									/>
								)}
							</div>
						</div>

						<Button
							text='Log in'
							type='submit'
							disabled={
								!masterPasswordRef?.current?.value || !emailRef?.current?.value
							}
						/>
					</form>
				</>
			)}
		</div>
	)
}
