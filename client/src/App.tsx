import { useEffect, useRef, useState } from 'react'
import axios from 'axios'

import CreatePassword from './features/contract/CreatePassword'
import RetreivePassword from './features/contract/RetreivePassword'

function App() {
	const [retreivedPassword, setRetreivedPassword] = useState<string>('')
	const [passwordCount, setPasswordCount] = useState<number>(0)
	const passwordNameRef = useRef()
	const passwordRef = useRef()
	const hashIdRef = useRef()

	async function handleCreatePassword(e: any) {
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
		<div className='App w-full h-screen flex flex-col items-center px-4 bg-slate-900 text-slate-100'>
			<h2 className='text-2xl text-red-500'>Total stored passwords: {passwordCount}</h2>
			{retreivedPassword.length > 0 ? <h2 className='text-2xl text-red-500'>Stored decrypted password : {retreivedPassword}</h2> : null}

			<div className='w-full h-auto flex items-center justify-center'>
				<CreatePassword onSubmit={handleCreatePassword} passwordNameRef={passwordNameRef} passwordRef={passwordRef} />
				<RetreivePassword onSubmit={handleRetreivePassword} hashIdRef={hashIdRef} />
			</div>
		</div>
	)
}

export default App
