import { lazy, Suspense, useEffect, useRef, useState } from 'react'

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import axios from 'axios'
import TabNav from './navigation/TabNav'
import PrivateRoute from './routes/PrivateRoute'
import type { IRoute } from './routes/routes.d'
import { BASE_API_URL } from './common/helpers/constants'
import HeaderNav from './navigation/HeaderNav'
import Profile from './features/account/Profile'

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
			const res = await axios.get(`${BASE_API_URL}/auth/refresh`, {
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
		<div className='App w-full h-screen flex bg-slate-50 text-slate-900'>
			<HeaderNav />
			<div className='Layout flex flex-col flex-1 items-center px-4 py-20 overflow-y-scroll bg-slate-50'>
				<Suspense fallback={<div>loading...</div>}>
					<Routes>
						<Route
							path='/'
							element={<Home loggedIn={loggedIn} accessToken={accessToken} />}
						/>
						<Route path='/login' element={<Login setAccessToken={setAccessToken} />} />
						<Route path='/register' element={<Register />} />
						<Route path='/dashboard' element={<Dashboard loggedIn={loggedIn} />} />
						<Route
							path='/profile'
							element={
								<PrivateRoute redirectTo='/login' isAuthenticated={loggedIn}>
									<Profile
										accessToken={accessToken}
										setAccessToken={setAccessToken}
									/>
								</PrivateRoute>
							}
						/>
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
			<TabNav loggedIn={loggedIn} />
		</div>
	)
}

export default App
