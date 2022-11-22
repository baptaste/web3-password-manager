import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

function App() {
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
	const [hash, setHash] = useState<string>('')
	const [passwordName, setPasswordName] = useState<string>('')

	const passwordNameRef = useRef()
	const passwordRef = useRef()

	async function handleSubmit(e: any) {
		e.preventDefault()

		try {
			if (passwordRef.current && passwordNameRef.current) {
				const data = {
					passwordName: passwordNameRef.current.value,
					plainTextPassword: passwordRef.current.value
				}
				const res = await axios.post('http://localhost:3500/send-password', data)
				console.log('CLIENT - handleSubmit res:', res)
				// setHash(res.data.hash)
				// setPasswordName(res.data.name)

				passwordNameRef.current.value = ''
				passwordRef.current.value = ''
			}
		} catch (error) {
			console.error(error)
		}
	}

	async function getPasswordsCount() {
		const res = await axios.get('http://localhost:3500/password-count')
		console.log('CLIENT - getPasswordsCount res:', res)
	}

	// async function getPasswordHash() {
	// 	const res = await axios.post('http://localhost:3500/password-hash', )
	// 	console.log('CLIENT - getPasswordsCount res:', res)
	// }

	useEffect(() => {
		getPasswordsCount()
	}, [])

	return (
		<div className='App w-full h-screen flex flex-col items-center justify-center bg-slate-900 text-slate-100'>
			<form onSubmit={handleSubmit} className='w-1/3 h-1/2 m-auto flex flex-col items-center'>
				<div className='inputContainer w-full flex flex-col items-center justify-between my-4 py-3'>
					<label htmlFor='name' className='w-full mb-3 text-left text-2xl'>
						Name
					</label>
					<div className='w-full flex items-center justify-between'>
						<input
							ref={passwordNameRef}
							name='name'
							type='text'
							placeholder='Enter a name'
							className='w-full h-full rounded-md p-4 text-slate-900'
						/>
					</div>
				</div>

				<div className='inputContainer w-full flex flex-col items-center justify-between my-4 py-3'>
					<label htmlFor='password' className='w-full mb-3 text-left text-2xl'>
						Password
					</label>
					<div className='w-full flex items-center justify-between relative'>
						<input
							ref={passwordRef}
							type={isPasswordVisible ? 'text' : 'password'}
							name='password'
							placeholder='Enter a password'
							className='w-full h-full rounded-md p-4 text-slate-900'
						/>
						{isPasswordVisible ? (
							<EyeSlashIcon
								className='h-6 w-6 text-blue-500 cursor-pointer absolute right-5'
								onClick={() => setIsPasswordVisible(false)}
							/>
						) : (
							<EyeIcon className='h-6 w-6 text-blue-500 cursor-pointer absolute right-5' onClick={() => setIsPasswordVisible(true)} />
						)}
					</div>
				</div>

				<button
					type='submit'
					className='w-full p-3 mt-12 rounded-md bg-green-700 text-slate-100'
					disabled={!passwordRef?.current?.value || !passwordNameRef?.current?.value}
				>
					Create password
				</button>

				{passwordName.length > 0 ? <h2 className='text-2xl text-slate-300'>Password name : {passwordName}</h2> : null}
				{hash.length > 0 ? <h2 className='text-2xl text-red-500'>Hash : {hash}</h2> : null}
			</form>
		</div>
	)
}

export default App
