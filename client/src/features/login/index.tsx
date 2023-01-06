import React, { useRef, useState } from 'react'
import { useNavigate, redirect, Link } from 'react-router-dom'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { Button } from '../../components/Common/Button'
import { Input } from '../../components/Form/Input'
import { InputPassword } from '../../components/Form/InputPassword'
import { login } from '../../api/login'
import { useAuth } from '../../providers/auth'

interface ILoginState {
	[key: string]: string | boolean
	email: string
	password: string
	loading: boolean
	error: boolean
	errorMsg: string
}

export default function LoginPage() {
	const { setAccessToken } = useAuth()
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

		const { success, token, error } = await login(state.email, state.password)

		if (success && token) {
			setState((state) => ({ ...state, loading: false }))
			setAccessToken(token)
			return navigate('/')
		}

		if (error) {
			return setState((state) => ({
				...state,
				loading: false,
				error: true,
				errorMsg: error
			}))
		}
	}

	return (
		<div className='Login w-full lg:w-1/3 h-full flex flex-col items-center justify-evenly'>
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
						<Link to={'/auth/register'} className='font-bold'>
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
