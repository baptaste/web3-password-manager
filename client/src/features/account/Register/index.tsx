import React, { useRef, useState } from 'react'
import { useNavigate, redirect, Link } from 'react-router-dom'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { BASE_API_URL } from '../../../common/helpers/constants'
import Button from '../../../common/components/Button'
import Input from '../../../common/components/Inputs/Input'
import InputPassword from '../../../common/components/Inputs/InputPassword'

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

		try {
			const res = await axios.post(`${BASE_API_URL}/users/create`, {
				email: state.email,
				plaintext: state.password
			})
			console.log('Register res:', res)

			if (res.data.success) {
				console.log('Register - success, user:', res.data.user)
				setState((state) => ({ ...state, loading: false }))
				navigate('/login')
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
		<div className='Register lg:w-1/2 md:w-full h-full flex flex-col items-center justify-evenly'>
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
