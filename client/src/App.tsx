import { useEffect, useRef, useState } from 'react'
import Register from './features/account/Register'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Home from './components/Home'
import Login from './features/account/Login'
import axios from 'axios'
import { TabNav } from './navigation/TabNav'

function App() {
	const [accessToken, setAccessToken] = useState<string | null>(null)
	const [loggedIn, setLoggedIn] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(false)
	const navigate = useNavigate()

	const getAccessToken = async () => {
		setLoading(true)
		try {
			const res = await axios.get('http://localhost:3500/api/auth/refresh', {
				withCredentials: true
			})

			if (res && res.data.success) {
				console.log('--------- getAccessToken res:', res)
				setLoading(false)
				setAccessToken(res.data.accessToken)
			}
		} catch (err: any) {
			setLoading(false)
			console.log('refresh token expired, redirect to /login')
			navigate('/login')
		}
	}

	useEffect(() => {
		console.log('call getAccessToken...')
		getAccessToken()
	}, [])

	useEffect(() => {
		if (accessToken) {
			setLoggedIn(true)
		} else {
			setLoggedIn(false)
		}
	}, [accessToken])

	useEffect(() => {
		console.log('App - logged in change:', loggedIn)
		if (loggedIn) navigate('/')
	}, [loggedIn])

	return (
		<div className='App w-full h-screen p-4 bg-slate-900 text-slate-100'>
			<div className='Layout bg-slate-800 lg:h-full sm:h-2/3'>
				<Routes>
					<Route
						path='/'
						element={<Home loggedIn={loggedIn} accessToken={accessToken} />}
					/>

					<Route path='/login' element={<Login setAccessToken={setAccessToken} />} />
					<Route path='/register' element={<Register />} />

					{/* catch all route */}
					<Route path='*' element={<Navigate to='/' replace />} />
				</Routes>
			</div>

			<TabNav />
		</div>
	)
}

export default App
