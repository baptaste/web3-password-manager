import { lazy, Suspense, useEffect, useRef, useState } from 'react'

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import axios from 'axios'
import TabNav from './navigation/TabNav'
import PrivateRoute from './routes/PrivateRoute'
import type { IRoute } from './routes/routes.d'

const Home = lazy(() => import('./features/home'))
const Login = lazy(() => import('./features/account/Login'))
const Register = lazy(() => import('./features/account/Register'))
const Dashboard = lazy(() => import('./features/dashboard'))

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
			console.log(err.response.status, err.response.data.message)

			// user doesnt have refresh token in cookie or has one expired
			// redirect to login so he can have new one if he already have an account
			if (err.response.status === 401 || err.response.status === 403) {
				navigate('/login')
			}
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
		<div className='App w-full h-screen p-4 bg-slate-50 text-slate-900'>
			<div className='Layout lg:h-full sm:h-2/3'>
				<Suspense fallback={<div>loading...</div>}>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/login' element={<Login setAccessToken={setAccessToken} />} />
						<Route path='/register' element={<Register />} />
						<Route path='/dashboard' element={<Dashboard />} />
						<Route
							path='/protected'
							element={
								<PrivateRoute redirectTo='/login' isAuthenticated={loggedIn}>
									<div>Todo</div>
								</PrivateRoute>
							}
						/>
						<Route path='*' element={<Navigate to='/' replace />} />
					</Routes>
				</Suspense>
			</div>
			<TabNav />
		</div>
	)
}

export default App
