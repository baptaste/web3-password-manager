import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import CreatePassword from '../../features/contract/CreatePassword'
import RetreivePassword from '../../features/contract/RetreivePassword'

export default function Home({ loggedIn }: any) {
	const [retreivedPassword, setRetreivedPassword] = useState<string>('')
	const [passwordCount, setPasswordCount] = useState<number>(0)
	const passwordNameRef = useRef()
	const passwordRef = useRef()
	const encryptionIdRef = useRef()

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
				// await getPasswordsCount()
				// await getAllPasswords()
			}
		} catch (error) {
			console.error(error)
		}
	}

	async function handleRetreivePassword(e: any) {
		e.preventDefault()

		try {
			if (encryptionIdRef.current) {
				const res = await axios.post('http://localhost:3500/retreive-password', { encryption_id: encryptionIdRef.current.value })
				console.log('CLIENT - handleGetHashIdSubmit res:', res)
				if (res.data.success) {
					setRetreivedPassword(res.data.plainTextPassword)
				}
				encryptionIdRef.current.value = ''
			}
		} catch (error) {
			console.error(error)
		}
	}

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		if (loggedIn === false) {
	// 			console.log('loggedIn is false:', loggedIn, 'redirect to login...')

	// 			// redirect('/login')
	// 			navigate('/auth/login')
	// 		}
	// 	}, 3000)
	// }, [loggedIn])

	return (
		<>
			<h1 className='text-5xl text-green-500'>Logged in - Dashboard</h1>
			<h2 className='text-2xl text-red-500'>Total stored passwords: {passwordCount}</h2>
			{retreivedPassword.length > 0 ? <h2 className='text-2xl text-red-500'>Stored decrypted password : {retreivedPassword}</h2> : null}

			<div className='w-full h-auto flex items-center justify-center'>
				<CreatePassword onSubmit={handleCreatePassword} passwordNameRef={passwordNameRef} passwordRef={passwordRef} />
				<RetreivePassword onSubmit={handleRetreivePassword} encryptionIdRef={encryptionIdRef} />
			</div>
		</>
	)
}
