import React, { useRef, useState } from 'react'
import { useNavigate, redirect, Link } from 'react-router-dom'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { BASE_API_URL } from '../../../common/helpers/constants'
import Button from '../../../common/components/Button'
import Input from '../../../common/components/Inputs/Input'
import InputPassword from '../../../common/components/Inputs/InputPassword'

interface ILoginState {
	[key: string]: string | boolean
	email: string
	password: string
	loading: boolean
	error: boolean
	errorMsg: string
}

export default function Login({ setAccessToken }: any) {
	const navigate = useNavigate()

	const [state, setState] = useState<ILoginState>({
		email: '',
		password: '',
		loading: false,
		error: false,
		errorMsg: ''
	})

	const handleChange = (input: string, event: React.ChangeEvent<HTMLInputElement>) => {
		setState((state) => ({ ...state, error: false, errorMsg: '', [input]: event.target.value }))
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
		} catch (error: any) {
			console.error(error)
			if (error.response.status === 401) {
				setState((state) => ({
					...state,
					loading: false,
					error: true,
					errorMsg: error.response.data.message
				}))
			}
		}
	}

	return (
		<div className='Login lg:w-1/2 md:w-full h-full flex flex-col items-center justify-evenly'>
			<h1 className='text-2xl font-bold mb-5'>Log in to APP</h1>

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
						{state.errorMsg?.length ? (
							<p className='w-full text-center text-red-500 text-md my-4'>
								{state.errorMsg}
							</p>
						) : null}

						<Input
							type='email'
							name='Email'
							placeholder='Email'
							value={state.email}
							error={state.error}
							onChange={(e) => handleChange('email', e)}
						/>

						<InputPassword
							name='Password'
							value={state.password}
							error={state.error}
							placeholder='Password'
							onChange={(e) => handleChange('password', e)}
						/>

						<Button
							text='Log in'
							type='submit'
							disabled={!state.email.length || !state.password.length || state.error}
						/>
					</form>
				</>
			)}
		</div>
	)
}
