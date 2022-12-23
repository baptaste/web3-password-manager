import { useRef, useState } from 'react'
import { useNavigate, redirect, Link } from 'react-router-dom'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import axios from 'axios'

export default function Register() {
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
	const masterPasswordRef = useRef()
	const emailRef = useRef()
	const [loading, setLoading] = useState<boolean>(false)
	const navigate = useNavigate()

	async function handleRegisterAccount(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setLoading(true)

		try {
			if (masterPasswordRef.current && emailRef.current) {
				const res = await axios.post('http://localhost:3500/users/create', {
					email: emailRef.current.value,
					plaintext: masterPasswordRef.current.value
				})
				console.log('CLIENT - handleGetHashIdSubmit res:', res)
				if (res.data.success) {
					setLoading(false)
					masterPasswordRef.current.value = ''
					emailRef.current.value = ''
					navigate('/login')
				}
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className='Register lg:w-1/2 md:w-full h-full flex flex-col items-center justify-center'>
			<h1 className='text-2xl font-bold mb-5'>Hi, welcome to NAME</h1>

			{loading ? (
				<>
					<p className='text-xl'>Loading...</p>
					<p className='text-xl'>Creating account</p>
				</>
			) : (
				<>
					<div className='text-xl'>
						Already an account ?{' '}
						<Link to={'/login'} className='font-bold'>
							Sign in
						</Link>
					</div>
					<form
						onSubmit={handleRegisterAccount}
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
							<label htmlFor='password' className='w-full mb-3 text-left text-lg'>
								Master Password <br />
								<span className='text-slate-600 text-md'>
									(Never send this to anyone)
								</span>
							</label>
							<div className='w-full flex items-center justify-between relative'>
								{/* //TODO add password validation regex */}
								<input
									ref={masterPasswordRef}
									type={isPasswordVisible ? 'text' : 'password'}
									name='password'
									placeholder='Enter a password'
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

						<button
							type='submit'
							className='w-full p-3 mt-12 rounded-md bg-sky-500 text-slate-100 cursor-pointer'
							disabled={
								!masterPasswordRef?.current?.value || !emailRef?.current?.value
							}
						>
							Register my account
						</button>
					</form>
				</>
			)}
		</div>
	)
}
