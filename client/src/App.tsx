import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

function App() {
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
	const [retreivedPassword, setRetreivedPassword] = useState<string>('')
	// const [hashId, setHashId] = useState<string>('')
	const [passwordName, setPasswordName] = useState<string>('')
	const [passwordCount, setPasswordCount] = useState<number>(0)

	const passwordNameRef = useRef()
	const passwordRef = useRef()
	const hashIdRef = useRef()

	async function handleCreatePasswordSubmit(e: any) {
		e.preventDefault()

		try {
			if (passwordRef.current && passwordNameRef.current) {
				const data = {
					passwordName: passwordNameRef.current.value,
					plainTextPassword: passwordRef.current.value
				}
				const res = await axios.post('http://localhost:3500/save-password', data)
				console.log('CLIENT - handleSubmit res:', res)
				// setHashId(res.data.hashId)
				passwordNameRef.current.value = ''
				passwordRef.current.value = ''

				// get updated datats
				await getPasswordsCount()
				await getAllPasswords()
			}
		} catch (error) {
			console.error(error)
		}
	}

	async function handleRetreivePassword(e: any) {
		e.preventDefault()

		try {
			if (hashIdRef.current) {
				const res = await axios.post('http://localhost:3500/retreive-password', { hashId: hashIdRef.current.value })
				console.log('CLIENT - handleGetHashIdSubmit res:', res)
				if (res.data.success) {
					setRetreivedPassword(res.data.plainTextPassword)
				}
				hashIdRef.current.value = ''
			}
		} catch (error) {
			console.error(error)
		}
	}

	async function getPasswordsCount() {
		const res = await axios.get('http://localhost:3500/password-count')
		console.log('CLIENT - getPasswordsCount res:', res)
		setPasswordCount(res.data.passwordCount)
	}

	async function getAllPasswords() {
		const res = await axios.get('http://localhost:3500/passwords')
		console.log('CLIENT - getAllPasswords res:', res.data.passwords)
	}

	useEffect(() => {
		getPasswordsCount()
		getAllPasswords()
	}, [])

	return (
		<div className='App w-full h-screen flex flex-col items-center justify-center bg-slate-900 text-slate-100'>
			<h2 className='text-2xl text-red-500'>Total stored passwords: {passwordCount}</h2>
			{retreivedPassword.length > 0 ? <h2 className='text-2xl text-red-500'>Stored decrypted password : {retreivedPassword}</h2> : null}

			<form onSubmit={handleRetreivePassword} className='HashIdForm w-2/3 h-auto m-6 flex flex items-center justify-between'>
				<div className='inputContainer w-1/2 flex flex-col items-center justify-between my-4 py-3'>
					<label htmlFor='hashId' className='w-full mb-3 text-left text-2xl'>
						Hash ID
					</label>
					<div className='w-full flex items-center justify-between'>
						<input ref={hashIdRef} name='hashId' type='text' placeholder='Enter ID' className='w-full h-full rounded-md p-4 text-slate-900' />
					</div>
				</div>
				<button
					type='submit'
					className='w-1/3  py-3 mt-12 rounded-md bg-green-700 text-slate-100 cursor-pointer'
					// disabled={!hashIdRef?.current?.value}
				>
					Get password hash
				</button>
			</form>

			<form onSubmit={handleCreatePasswordSubmit} className='CreatePasswordForm w-1/3 h-1/2 m-auto flex flex-col items-center'>
				<div className='inputContainer w-full flex flex-col items-center justify-between my-4 py-3'>
					<label htmlFor='name' className='w-full mb-3 text-left text-2xl'>
						Name
					</label>
					<div className='w-full flex items-center justify-between'>
						<input ref={passwordNameRef} name='name' type='text' placeholder='Enter a name' className='w-full h-full rounded-md p-4 text-slate-900' />
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
							<EyeSlashIcon className='h-6 w-6 text-blue-500 cursor-pointer absolute right-5' onClick={() => setIsPasswordVisible(false)} />
						) : (
							<EyeIcon className='h-6 w-6 text-blue-500 cursor-pointer absolute right-5' onClick={() => setIsPasswordVisible(true)} />
						)}
					</div>
				</div>

				<button type='submit' className='w-full p-3 mt-12 rounded-md bg-green-700 text-slate-100' disabled={!passwordRef?.current?.value || !passwordNameRef?.current?.value}>
					Create password
				</button>

				{passwordName.length > 0 ? <h2 className='text-2xl text-slate-300'>Password name : {passwordName}</h2> : null}
			</form>
		</div>
	)
}

export default App
