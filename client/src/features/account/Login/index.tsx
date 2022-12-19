import { useRef, useState } from 'react'
import { useNavigate, redirect, Link } from 'react-router-dom'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { BASE_API_URL } from '../../../helpers/constants'

export default function Login({ setLoggedIn }: any) {
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
	const masterPasswordRef = useRef()
	const emailRef = useRef()
	const [loading, setLoading] = useState<boolean>(false)
	const navigate = useNavigate()

	async function handleLoginAccount(e: any) {
		e.preventDefault()
		setLoading(true)

		try {
			if (masterPasswordRef.current && emailRef.current) {
				const res = await axios.post(`${BASE_API_URL}/auth/verify`, { email: emailRef.current.value, plaintext: masterPasswordRef.current.value })
				console.log('CLIENT - handleGetHashIdSubmit verify res:', res)
				if (res.data.success && res.data.match) {
					setLoading(false)

					try {
						const loginRes: any = await axios.post(`${BASE_API_URL}/auth/login`, { email: emailRef.current.value })
						console.log('CLIENT - handleGetHashIdSubmit login loginRes:', loginRes)

						if (loginRes.data.success) {
							const token = loginRes.data.accessToken;
							// TEST get user with token bearer
							const getUserRes: any = await axios.get(`${BASE_API_URL}/users/639878749179d3bf8bfd088c`, {
								headers: { 'Authorization': `Bearer ${token as string}` }
							 })
							 console.log('getUserRes:', getUserRes);

						}
					} catch (error) {
						console.error(error)
					}
					// setLoggedIn(true)
					// navigate('/')
				}
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className='Login w-1/2 h-full flex flex-col items-center justify-center'>
			<h1 className='text-5xl mb-5'>Login</h1>

			{loading ? (
				<>
					<p className='text-2xl'>Loading...</p>
					<p className='text-2xl'>Verifying account</p>
				</>
			) : (
				<>
					<div className='text-2xl'>
						Not yet registered ?{' '}
						<Link to={'/register'} className='font-bold'>
							Sign up
						</Link>
					</div>

					<form onSubmit={handleLoginAccount} className='CreatePasswordForm w-full h-2/3 flex flex-col items-center justify-evenly'>
						<div className='inputContainer w-full flex flex-col items-center justify-between my-4 py-3'>
							<label htmlFor='email' className='w-full mb-3 text-left text-2xl'>
								Email
							</label>
							<div className='w-full flex items-center justify-between'>
								{/* //TODO add email validation regex */}
								<input ref={emailRef} name='email' type='text' placeholder='Enter an email' className='w-full h-full rounded-md p-4 text-slate-900' />
							</div>
						</div>

						<div className='inputContainer w-full flex flex-col items-center justify-between my-4 py-3'>
							<label htmlFor='password' className='w-full mb-3 text-left text-2xl'>
								Master Password (Never send it to anyone)
							</label>
							<div className='w-full flex items-center justify-between relative'>
								{/* //TODO add password validation regex */}
								<input
									ref={masterPasswordRef}
									type={isPasswordVisible ? 'text' : 'password'}
									name='password'
									placeholder='Enter your password'
									className='w-full h-full rounded-md p-4 text-slate-900'
								/>
								{isPasswordVisible ? (
									<EyeSlashIcon className='h-6 w-6 text-blue-500 cursor-pointer absolute right-5' onClick={() => setIsPasswordVisible(false)} />
								) : (
									<EyeIcon className='h-6 w-6 text-blue-500 cursor-pointer absolute right-5' onClick={() => setIsPasswordVisible(true)} />
								)}
							</div>
						</div>

						<button
							type='submit'
							className='w-full p-3 mt-12 rounded-md bg-green-700 text-slate-100 cursor-pointer'
							disabled={!masterPasswordRef?.current?.value || !emailRef?.current?.value}
						>
							Login
						</button>
					</form>
				</>
			)}
		</div>
	)
}
