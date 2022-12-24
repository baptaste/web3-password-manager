import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CreatePassword from '../passwords/CreatePassword'
import RetreivePassword from '../passwords/RetreivePassword'

export default function Home({ loggedIn, accessToken }: any) {
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
				const res = await axios.post('http://localhost:3500/retreive-password', {
					encryption_id: encryptionIdRef.current.value
				})
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

	// auth
	const navigate = useNavigate()

	// useEffect(() => {
	// 	if (!loggedIn) {
	// 		console.log('not logged in')
	// 		navigate('/login')
	// 	}
	// }, [loggedIn])

	return (
		<div className='Home w-full h-full flex flex-col items-center'>
			<h1 className='text-5xl text-green-500'>Dashboard</h1>

			{!loggedIn ? (
				<>
					<h2 className='w-2/3 text-center'>Welcome friend!</h2>
					<Link
						to={'/register'}
						className='w-full p-3 mt-12 rounded-md bg-sky-500 text-slate-100 cursor-pointer text-center'
					>
						Sign In
					</Link>
				</>
			) : (
				<>
					<h2 className='w-2/3 text-green-500 text-center'>Welcome back friend!</h2>
					<h2 className='w-2/3 text-green-500 text-center'>accessToken:</h2>
					<h3 className='w-full text-center break-all'>{accessToken}</h3>
				</>
			)}

			{/* <h2 className='text-2xl text-red-500'>Total stored passwords: {passwordCount}</h2>
			{retreivedPassword.length > 0 ? (
				<h2 className='text-2xl text-red-500'>
					Stored decrypted password : {retreivedPassword}
				</h2>
			) : null}

			<div className='w-full h-auto flex items-center justify-center'>
				<CreatePassword
					onSubmit={handleCreatePassword}
					passwordNameRef={passwordNameRef}
					passwordRef={passwordRef}
				/>
				<RetreivePassword
					onSubmit={handleRetreivePassword}
					encryptionIdRef={encryptionIdRef}
				/>
			</div> */}
		</div>
	)
}
