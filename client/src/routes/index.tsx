import { lazy, useEffect } from 'react'
import { Navigate, useNavigate, useRoutes } from 'react-router-dom'
import { MainLayout } from '../components/Layout'
import { useAuth } from '../providers/auth'
import { protectedRoutes } from './protected'
import { publicRoutes } from './public'

const HomePage = lazy(() => import('../features/home'))

export function AppRoutes() {
	const navigate = useNavigate()

	const { loggedIn, error } = useAuth()

	const commonRoutes = [
		{ path: '/', element: <HomePage /> },
		{ path: '*', element: <Navigate to='/' replace /> }
	]

	const routes = loggedIn ? protectedRoutes : publicRoutes

	const elements = useRoutes([...routes, ...commonRoutes])

	useEffect(() => {
		if (error && (error.response.status === 401 || error.response.status === 403)) {
			const { message } = error.response.data
			console.log('AppRoutes - error:', error)
			if (message === 'Forbidden - Token expired') {
				navigate('/auth/login') // user has invalid token and needs to login again
			} else if (message === 'Forbidden - JsonWebTokenError: jwt must be provided') {
				navigate('/auth/register') // user doesnt have a token yet, needs to sign up
			}
		}
	}, [error])

	return <MainLayout>{elements}</MainLayout>
}
