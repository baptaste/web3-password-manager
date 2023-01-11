import React, { useRef, useState } from 'react'
import { useNavigate, redirect, Link } from 'react-router-dom'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { Button } from '../../../../components/Common/Button'
import { Input } from '../../../../components/Form/Input'
import { InputPassword } from '../../../../components/Form/InputPassword'
import { login } from '../../api'
import { useAuth } from '../../../../providers/auth'
import { Spinner } from '../../../../components/Common'
import { VisiterLayout } from '../../../../components/Layout'

interface ILoginState {
	[key: string]: string | boolean
	email: string
	password: string
	loading: boolean
	error: boolean
	errorMsg: string
}

export function Login() {
	const { setAccessToken, setUser } = useAuth()
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

		const { success, user, token, error } = await login(state.email, state.password)

		console.log('Login - user:', user)

		if (success && token) {
			setState((state) => ({ ...state, loading: false }))
			setAccessToken(token)
			setUser(user)
			return navigate('/')
		}

		if (error) {
			console.log('Login - error:', error)

			return setState((state) => ({
				...state,
				loading: false,
				error: true,
				errorMsg: error
			}))
		}
	}

	return (
		<VisiterLayout title='Log in'>
			<h1 className='text-2xl font-bold'>Welcome back!</h1>
			<h1 className='text-2xl font-bold mb-5'>Log in</h1>

			{state.loading ? (
				<Spinner />
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
						className='w-full my-4 flex flex-col items-center justify-evenly'
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
							theme='secondary'
						/>
					</form>
				</>
			)}
		</VisiterLayout>
	)
}
