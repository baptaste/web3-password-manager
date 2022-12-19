import { useEffect, useRef, useState } from 'react'
import Register from './features/account/Register'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Home from './components/Home'
import Login from './features/account/Login'

function App() {
	const [loggedIn, setLoggedIn] = useState<boolean>(false)
	// const navigate = useNavigate()

	// async function getPasswordsCount() {
	// 	const res = await axios.get('http://localhost:3500/password-count')
	// 	console.log('CLIENT - getPasswordsCount res:', res)
	// 	setPasswordCount(res.data.passwordCount)
	// }

	// async function getAllPasswords() {
	// 	const res = await axios.get('http://localhost:3500/passwords')
	// 	console.log('CLIENT - getAllPasswords res:', res.data.passwords)
	// }

	// useEffect(() => {
	// 	// getPasswordsCount()
	// 	// getAllPasswords()

	// 	if (!loggedIn) {
	// 		navigate('/auth/login')
	// 	}
	// }, [loggedIn])

	return (
		<div className='App w-full h-screen flex flex-col items-center px-4 bg-slate-900 text-slate-100'>
			<Router>
				<Routes>
					<Route path='/' element={loggedIn ? <Home /> : <Login />} />
					<Route path='/login' element={loggedIn ? <Navigate to='/' replace /> : <Login setLoggedIn={setLoggedIn} />} />
					<Route path='/register' element={loggedIn ? <Navigate to='/' replace /> : <Register />} />

					{/* catch all route */}
					<Route path='*' element={<Navigate to='/' replace />} />
				</Routes>
			</Router>
		</div>
	)
}

export default App
