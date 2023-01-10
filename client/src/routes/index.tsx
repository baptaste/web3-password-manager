import { useEffect } from 'react'
import { Navigate, useNavigate, useRoutes } from 'react-router-dom'
// import { Layout } from '../components/Layout'
import { useAuth } from '../providers/auth'
import { lazyImport } from '../utils/imports'
import { protectedRoutes } from './protected'
import { publicRoutes } from './public'

const Landing = lazyImport('../features/landing', 'Landing')

export function AppRoutes() {
	const navigate = useNavigate()

	const { loggedIn, error } = useAuth()

	const commonRoutes = [
		{ path: '/', element: <Landing /> },
		{ path: '*', element: <Navigate to='/' replace /> }
	]

	const routes = loggedIn ? protectedRoutes : publicRoutes

	const elements = useRoutes([...routes, ...commonRoutes])

	// useEffect(() => {
	// 	if (error && (error.response.status === 401 || error.response.status === 403)) {
	// 		const { message } = error.response.data
	// 		console.log('AppRoutes - error:', error)
	// 		if (message === 'Forbidden - Token expired') {
	// 			navigate('/auth/login') // user has invalid token and needs to login again
	// 		} else if (message === 'Forbidden - JsonWebTokenError: jwt must be provided') {
	// 			navigate('/auth/register') // user doesnt have a token yet, needs to sign up
	// 		}
	// 	}
	// }, [error])

	useEffect(() => {
		// if (!loggedIn) {
		// 	navigate('/auth/login')
		// } else {
		// 	navigate('/dashboard')
		// }
		if (loggedIn) navigate('/dashboard')
	}, [loggedIn])

	return <>{elements}</>
}
