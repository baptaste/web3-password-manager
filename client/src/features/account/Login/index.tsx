import React, { useRef, useState } from 'react'
import { useNavigate, redirect, Link } from 'react-router-dom'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { BASE_API_URL } from '../../../common/helpers/constants'
import Button from '../../../common/components/Button'
import Input from '../../../common/components/Inputs/Input'

interface ILoginState {
	[key: string]: string | boolean
	email: string
	password: string
	passwordShown: boolean
	loading: boolean
}

export default function Login({ setAccessToken }: any) {
	const navigate = useNavigate()

	const [state, setState] = useState<ILoginState>({
		email: '',
		password: '',
		passwordShown: false,
		loading: false
	})

	const handleChange = (input: string, event: React.ChangeEvent<HTMLInputElement>) => {
		setState((state) => ({ ...state, [input]: event.target.value }))
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		setState((state) => ({ ...state, loading: true }))

		try {
			const verifyRes = await axios.post(
				`${BASE_API_URL}/auth/verify`,
				{
					email: state.email,
					plaintext: state.password
				},
				{ withCredentials: true }
			)
			console.log('1 - verify email & password, res:', verifyRes)

			if (verifyRes.data.success) {
				try {
					console.log('Login - authenticated, requesting refresh token...')

					const loginRes: any = await axios.post(
						`${BASE_API_URL}/auth/login`,
						{ email: state.email },
						{ withCredentials: true }
					)
					console.log('2 - login, res:', loginRes)

					if (loginRes.data.success) {
						setState((state) => ({ ...state, loading: false }))
						const { accessToken } = loginRes.data
						console.log('2- after login, accessToken:', accessToken)
						setAccessToken((prev: any) => (prev = accessToken))
						navigate('/')
					}
				} catch (error) {
					console.error(error)
				}
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className='Login lg:w-1/2 md:w-full h-full flex flex-col items-center justify-center'>
			<h1 className='text-2xl font-bold mb-5'>Log in to NAME</h1>

			{state.loading ? (
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
						className='CreatePasswordForm w-full my-4 flex flex-col items-center justify-evenly'
					>
						<Input
							type='email'
							name='Email'
							placeholder='Email'
							value={state.email}
							onChange={(e) => handleChange('email', e)}
						/>

						{/* <div className='inputContainer w-full flex flex-col items-center justify-between my-4 py-3'>
							<label
								htmlFor='password'
								className='w-full flex flex-col mb-3 text-left text-lg	'
							>
								Master Password (Never send it to anyone)
							</label>
							<div className='w-full flex items-center justify-between relative'>

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
						</div> */}

						<Button
							text='Log in'
							type='submit'
							disabled={!state.email.length || !state.password.length}
						/>
					</form>
				</>
			)}
		</div>
	)
}
