import React, { useRef, useState } from 'react'
import { useNavigate, redirect, Link } from 'react-router-dom'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import Button from '../../../components/common/buttons/Button'
import Input from '../../../components/common/inputs/Input'
import InputPassword from '../../../components/common/inputs/InputPassword'
import { register } from '../../../api/register'

interface IRegisterState {
	[key: string]: string | boolean
	email: string
	password: string
	loading: boolean
	error: boolean
	errorMsg: string
}

export default function Register({ setAccessToken }: any) {
	const navigate = useNavigate()

	const [state, setState] = useState<IRegisterState>({
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

		const { success, error } = await register(state.email, state.password)

		if (success) {
			setState((state) => ({ ...state, loading: false }))
			navigate('/login')
		} else if (error) {
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
		<div className='Register w-full lg:w-1/3 h-full flex flex-col items-center justify-evenly'>
			<h1 className='text-2xl font-bold mb-5'>Welcome friend!</h1>

			{state.loading ? (
				<>
					<p className='text-xl'>Loading...</p>
					<p className='text-xl'>Creating account</p>
				</>
			) : (
				<>
					<div className='text-lg'>
						Already an account ?{' '}
						<Link to={'/login'} className='font-bold'>
							Log in
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
							text='Register'
							type='submit'
							disabled={!state.email.length || !state.password.length || state.error}
						/>
					</form>
				</>
			)}
		</div>
	)
}
